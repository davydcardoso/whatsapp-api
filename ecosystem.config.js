module.exports = {
  apps: [
    {
      name: "RocketApps:WAAPI-HTTPS",
      script: "node ./dist/infra/http/server.ts",
      max_memory_restart: "450M",
    },
    {
      name: "RocketApps:WAAPI-WORKERS",
      script: "node ./dist/infra/queue/worker.ts",
      max_memory_restart: "450M",
    },
  ],
};
