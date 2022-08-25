module.exports = {
  apps: [
    {
      name: "@WAAPI:http",
      script: "node ./dist/infra/http/server.js",
      max_memory_restart: "450M",
    },
    {
      name: "@WAAPI:worker",
      script: "node ./dist/infra/queue/worker.js",
      max_memory_restart: "450M",
    },
  ],
};
