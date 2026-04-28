// Simple HTTP server to serve game assets

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const port = 8001;
console.log(`Server running on http://localhost:${port}`);

serve(async (req: Request) => {
  const url = new URL(req.url);
  if (url.pathname === "/") {
    // Serve index.html
    const indexHtml = await Deno.readTextFile("./index.html");
    return new Response(indexHtml, {
      headers: { "Content-Type": "text/html" },
    });
  } else if (url.pathname === "/ui.js") {
    // Serve ui.js
    const uiJs = await Deno.readTextFile("./ui.js");
    return new Response(uiJs, {
      headers: { "Content-Type": "application/javascript" },
    });
  } else {
    return new Response("Not Found", { status: 404 });
  }
});
