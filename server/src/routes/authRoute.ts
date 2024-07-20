import { Request, Response, Router } from "express";

const router = Router();

router.get("/login", (req: Request, res: Response) => {
  return res.redirect("/");
});

router.get("/register", kindeClient.register, (req: Request, res: Response) => {
  return res.redirect("/");
});

router.get("/callout", (req: Request, res: Response) => {
  return res.redirect("/");
});

export default router;
