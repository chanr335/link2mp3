import { Response, Router } from "express";
import { kindeClient, sessionManager, getUser } from "../auth/KindeClient";
import { Request } from "../types";

const authRouter = Router();

authRouter.get("/login", async (req: Request, res: Response) => {
  const loginUrl = await kindeClient.login(sessionManager);
  return res.redirect(loginUrl.toString());
});

authRouter.get("/register", async (req: Request, res: Response) => {
  const registerUrl = await kindeClient.register(sessionManager);
  return res.redirect(registerUrl.toString());
});

authRouter.get("/callback", async (req: Request, res: Response) => {
  const url = new URL(`${req.protocol}://${req.get("host")}${req.url}`);
  await kindeClient.handleRedirectToApp(sessionManager, url);
  return res.redirect("/");
});

authRouter.get("/profile", getUser, async (req: Request, res: Response) => {
  const user = req.user;
  res.json({ user });
});

export default authRouter;
