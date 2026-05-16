declare module "cloudflare:workers" {
  export function getRequestContext<Env = Record<string, unknown>>(): {
    request: Request;
    env: Env;
    ctx: ExecutionContext;
  };
}
