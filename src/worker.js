export default {
  async fetch(request) {
    const url = new URL(request.url);

    // CORS
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    // OPTIONS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    // ==========================
    // GET /
    // ==========================

    if (request.method === "GET") {
      return Response.json(
        {
          success: true,
          version: "2.0.0",
          name: "Ask YO",
          status: "online",
          time: new Date().toISOString()
        },
        {
          headers: corsHeaders
        }
      );
    }

    // ==========================
    // POST /chat
    // ==========================

    if (request.method === "POST" && url.pathname === "/chat") {

      const body = await request.json();

      const message = body.message || "";

      let reply = "";

      if (message.trim() === "") {

        reply = "Xin hãy nhập câu hỏi 😊";

      } else {

        reply =
`👋 Xin chào!

Mình là Ask YO.

Bạn vừa hỏi:

"${message}"

Hiện tại đây là Worker V2.

Ở bước tiếp theo mình sẽ kết nối GPT để trả lời thông minh hơn.`;

      }

      return Response.json(
        {
          success: true,
          reply
        },
        {
          headers: corsHeaders
        }
      );

    }

    // ==========================

    return Response.json(
      {
        success: false,
        error: "Not Found"
      },
      {
        status: 404,
        headers: corsHeaders
      }
    );
  }
};