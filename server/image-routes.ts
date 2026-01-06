import type { Express, Request, Response } from "express";
import path from "node:path";
import fs from "node:fs";
import sharp from "sharp";

function safeResolvePublic(filePath: string): string | null {
  if (!filePath || !filePath.startsWith("/")) return null;
  const publicDir = path.resolve(import.meta.dirname, "public");
  const resolved = path.resolve(publicDir, "." + filePath);
  if (!resolved.startsWith(publicDir)) return null;
  if (!fs.existsSync(resolved)) return null;
  return resolved;
}

export function createImageRoutes(app: Express) {
  app.get("/api/image/local", async (req: Request, res: Response) => {
    try {
      const src = typeof req.query.path === "string" ? String(req.query.path) : "";
      const format = typeof req.query.format === "string" ? String(req.query.format) : "webp";
      const width = Math.min(2000, Math.max(100, parseInt(String(req.query.width || "0"), 10) || 0));
      const file = safeResolvePublic(src);
      if (!file) return res.status(400).send("Invalid path");
      const img = sharp(file);
      if (width) img.resize({ width, withoutEnlargement: true });
      if (format === "avif") {
        img.avif({ quality: 60 });
        res.set("Content-Type", "image/avif");
      } else {
        img.webp({ quality: 70 });
        res.set("Content-Type", "image/webp");
      }
      res.set("Cache-Control", "public, max-age=2592000");
      const buf = await img.toBuffer();
      res.send(buf);
    } catch {
      res.status(500).end();
    }
  });
}
