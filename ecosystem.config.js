module.exports = {
  apps: [
    {
      name: "tcc_identity",
      script: "npm",
      args: "start",
      cwd: __dirname, // Uses the current directory dynamically
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
