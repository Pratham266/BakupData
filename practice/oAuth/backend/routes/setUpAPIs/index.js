import userAuth from "../../features/auth.js";

const routers = [userAuth];

export default (app) => {
  routers.forEach((router) => {
    app.use(router.routes()).use(router.allowedMethods());
  });
};
