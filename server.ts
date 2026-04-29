// Simple HTTP server to serve game assets
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const port = 8000;
console.log(`Server running on http://localhost:${port}`);

serve(async (req: Request) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // Serve index.html for root path
  if (pathname === "/") {
    const indexHtml = await Deno.readTextFile("./index.html");
    return new Response(indexHtml, {
      headers: { "Content-Type": "text/html" },
    });
  }

  // Map URL path to file in src directory
  // e.g., /src/main.js -> ./src/main.js, /src/game_state.js -> ./src/game_state.js
  const filePath = `.${pathname}`;

  try {
    // Try to read the file
    const content = await Deno.readTextFile(filePath);

    // Determine content type based on extension
    const ext = pathname.split(".").pop();
    let contentType = "application/octet-stream";

    if (ext === "html") contentType = "text/html";
    else if (ext === "js") contentType = "application/javascript";
    else if (ext === "css") contentType = "text/css";
    else if (ext === "json") contentType = "application/json";
    else if (ext === "ts") contentType = "application/javascript"; // Serve .ts as JS

    return new Response(content, { headers: { "Content-Type": contentType } });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
});
