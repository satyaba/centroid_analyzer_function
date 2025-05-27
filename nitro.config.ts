//https://nitro.unjs.io/config

export default defineNitroConfig({
  srcDir: "server",
  routeRules: {
    '/api/**': {
      cors: true,
      headers: { 'access-control-allow-origin': '*' }
    }
  },
  compatibilityDate: '2025-05-27'
});
