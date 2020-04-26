const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api", {
      target: "https://192.168.1.178",
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api": "/"
      }
    })
  );
};
