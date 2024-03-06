# Eventwhere App

## Authors

[Arachovitis George](https://www.linkedin.com/in/georgios-arachovitis/)<br>
[Giannakis Myron](https://www.linkedin.com/in/myron-giannakis/)<br>
[Theofilou Stylianos](https://www.linkedin.com/in/stylianos-theofilou-976ab923b/)<br>

## Local Deployment
Start react development server and api-server in development mode:<br>

1. In "./backend" run `npm install` (if doesn't work try `npm install express`).

2. In "./frontend" run `npm install`.

3. Start react server and api-server in the same terminal:<br>
&nbsp;&nbsp;```./start-local.sh``` (linux/mac)
&nbsp;&nbsp;```.\start-local.bat``` (windows)

4. Start react server and api-server in different terminals:<br>
&nbsp;&nbsp;Terminal 1 (react server): ```cd backend/ && npm run start-frontend```<br>
&nbsp;&nbsp;Terminal 2 (api-server): ```cd backend/ && npm run start-backend```<br>

## Production
Build react and start api-server in production mode:<br>
&nbsp;&nbsp;```./start-production.sh``` (linux/mac)
&nbsp;&nbsp;```.\start-production.bat``` (windows)