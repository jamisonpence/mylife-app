import crypto from "crypto";
import { promisify } from "util";
import { Express, RequestHandler } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Pool } from "pg";
import { storage } from "./storage";

const scrypt = promisify(crypto.scrypt);

export async function hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString("hex");
    const buf = (await scrypt(password, salt, 64)) as Buffer;
    return `${buf.toString("hex")}.${salt}`;
}

export async function verifyPassword(supplied: string, stored: string): Promise<boolean> {
    const [hash, salt] = stored.split(".");
    const buf = (await scrypt(supplied, salt, 64)) as Buffer;
    return crypto.timingSafeEqual(Buffer.from(hash, "hex"), buf);
}

export function setupAuth(app: Express) {
    const PgSession = connectPgSimple(session);
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  app.use(
        session({
                store: new PgSession({ pool, createTableIfMissing: true }),
                secret: process.env.SESSION_SECRET || "dev-secret-change-in-production",
                resave: false,
                saveUninitialized: false,
                cookie: {
                          maxAge: 30 * 24 * 60 * 60 * 1000,
                          httpOnly: true,
                          secure: process.env.NODE_ENV === "production",
                },
        })
      );

  app.use(passport.initialize());
    app.use(passport.session());

  passport.use(
        new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
                try {
                          const user = await storage.getUserByEmail(email);
                          if (!user) return done(null, false, { message: "Invalid email or password" });
                          const valid = await verifyPassword(password, user.passwordHash);
                          if (!valid) return done(null, false, { message: "Invalid email or password" });
                          return done(null, user);
                } catch (err) {
                          return done(err);
                }
        })
      );

  passport.serializeUser((user: any, done) => done(null, user.id));
    passport.deserializeUser(async (id: number, done) => {
          try {
                  const user = await storage.getUserById(id);
                  done(null, user || false);
          } catch (err) {
                  done(err);
          }
    });
}

export const requireAuth: RequestHandler = (req, res, next) => {
    if (!req.isAuthenticated()) {
          return res.status(401).json({ error: "Unauthorized" });
    }
    next();
};
