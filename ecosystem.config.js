module.exports = {
  apps: [
    {
      name: "vv_identity",
      script: "npm",
      args: "start",
      cwd: __dirname, // Uses the current directory dynamically
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
