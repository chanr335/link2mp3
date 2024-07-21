import {
  SessionManager,
  createKindeServerClient,
  GrantType,
} from "@kinde-oss/kinde-typescript-sdk";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";

// Client for authorization code flow
export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: process.env.KINDE_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET!,
    redirectURL: process.env.KINDE_REDIRECT_URI!,
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI!,
  }
);

let store: Record<string, unknown> = {};
export const sessionManager: SessionManager = {
  async getSessionItem(key: string) {
    return store[key];
  },
  async setSessionItem(key: string, value: unknown) {
    store[key] = value;
  },
  async removeSessionItem(key: string) {
    delete store[key];
  },
  async destroySession() {
    store = {};
  },
};

export async function getUser(req: Request, res: Response, next: NextFunction) {
  try {
    const isAuthenticated = await kindeClient.isAuthenticated(sessionManager); // Boolean: true or false
    if (!isAuthenticated) {
      return res.status(401).json({ error: "Not Authorized" });
    }
    const user = await kindeClient.getUserProfile(sessionManager);
    console.log(user);
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ error: "Not Authorized" });
  }
}
