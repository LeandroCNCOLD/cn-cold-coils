interface Env {
  ASSETS: { fetch(req: Request): Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;
    // SPA fallback: serve index.html for all client-side routes
    return env.ASSETS.fetch(new Request(new URL("/index.html", request.url).toString()));
  },
};
