// Configuración de PM2 para el VPS: usa todos los núcleos del CPU (modo cluster)
// y reinicia automáticamente si el proceso se cae.
module.exports = {
  apps: [
    {
      name: "electrind",
      script: ".next/standalone/server.js",
      instances: "max",
      exec_mode: "cluster",
      max_memory_restart: "512M",
      env: { NODE_ENV: "production", PORT: 3000, HOSTNAME: "127.0.0.1" },
    },
  ],
};
