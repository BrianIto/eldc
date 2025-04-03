To run this project do:

```
docker compose up -d
```

This initialize the MySQL DB, and then you can use the Node server and Angular project directly and locally. The Node Server is using v22 (Latest LTS at Apr. 2025) and Angular is using v.18 (same date LTS).

**IMPORTANT** For environment purposes, please add:

```
DATABASE_URL="mysql://root:root@localhost:3306/mydb" #Using root only for this project testing purposes.
API_PORT=8080 #Or any other port
```

**REMEMBER**: at the frontend please change `utils/const.ts` to look at the right url/port to the API.

To run frontend:

```
 -- any node/bun package manager can be used:

cd frontend/

npm i

npm run dev

yarn dev

bun dev

...etc
```


To run Backend Server:

```
 -- any node/bun package manager can be used:

cd node-server/

npm i

npm run dev

yarn dev

bun dev

...etc
```
