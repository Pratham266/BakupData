import http from "http";
import app from "./app.js";

const port = "8000";

http.createServer(app.callback()).listen(port, (err) => {
  if (err) {
    console.log("Error occured on starting the server");
    console.log(err);
    return;
  }
  console.log(`Server running successfully on port: ${port}`);
});
