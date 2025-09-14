import Router from "koa-router";
import { userAuth } from "../controller/auth.js";

const router = new Router({
  prefix: "/auth",
});

router.post("/oauth-token", userAuth);

export default router;
