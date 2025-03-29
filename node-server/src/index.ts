import app from "./app";

app.listen(process.env.API_PORT);
console.log("API Running at port " + process.env.API_PORT);
