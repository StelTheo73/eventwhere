from http.server import BaseHTTPRequestHandler, HTTPServer
import ssl
from base64 import b64decode

# openssl req -new -x509 -keyout server.key -out server.pem -days 365 -nodes
# curl --cacert server.pem --cert server.pem --key server.key --user your_username:your_password https://localhost:8000/protected

# Define username and password
USERNAME = "your_username"
PASSWORD = "your_password"

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.authenticate()

    def authenticate(self):
        auth_header = self.headers.get('Authorization')
        if auth_header:
            _, encoded = auth_header.split(' ', 1)
            username, password = b64decode(encoded).decode().split(':', 1)
            if username == USERNAME and password == PASSWORD:
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"Authentication successful")
                return
        self.send_response(401)
        self.send_header('WWW-Authenticate', 'Basic realm="Secure Area"')
        self.end_headers()
        self.wfile.write(b"Authentication required")

def run(server_class=HTTPServer, handler_class=RequestHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)

    # Configure SSL context
    context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
    context.load_cert_chain(certfile="server.pem", keyfile="server.key")

    # Wrap the socket with SSL/TLS encryption
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

    print(f'Starting server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()