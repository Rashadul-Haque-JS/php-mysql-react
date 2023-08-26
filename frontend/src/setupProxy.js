const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Specify the API path you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:8000', // Your PHP server's URL
      changeOrigin: true,
    })
  );
};
