import Koa from "koa";
import bodyParser from "koa-bodyparser";
import setUpAPIs from "./routes/setUpAPIs/index.js";
import cors from "@koa/cors";

const app = new Koa();
app.proxy = true;

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  bodyParser({
    enableTypes: ["text", "json", "form", "raw"],
    onerror(err, ctx) {
      ctx.throw("Invalid Body", 422);
    },
  })
);

setUpAPIs(app);
export default app;
