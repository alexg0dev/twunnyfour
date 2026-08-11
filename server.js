const http = require("http");
const fs = require("fs");
const path = require("path");
const { pipeline } = require("stream");

const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".map": "application/json",
  ".txt": "text/plain; charset=utf-8",
};

function safeJoin(root, reqPath) {
  const decoded = decodeURIComponent((reqPath || "/").split("?")[0]);
  const cleaned = path.normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  const full = path.join(root, cleaned);
  if (!full.startsWith(root)) return null;
  return full;
}

const server = http.createServer((req, res) => {
  let filePath = safeJoin(ROOT, req.url === "/" ? "/index.html" : req.url);
  if (!filePath) {
    res.writeHead(400);
    return res.end("Bad request");
  }

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isDirectory()) filePath = path.join(filePath, "index.html");
    fs.stat(filePath, (err2, st2) => {
      if (err2 || !st2.isFile()) {
        const fallback = path.join(ROOT, "index.html");
        return fs.createReadStream(fallback).on("open", () => {
          res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
        }).pipe(res);
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream" });
      pipeline(fs.createReadStream(filePath), res, () => {});
    });
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`TwunnyFour listening on ${PORT}`);
});
