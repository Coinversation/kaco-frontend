import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app: any) {
  app.use(
    '/bind',
    createProxyMiddleware({
      target: process.env.REACT_APP_API_PROFILE,
      changeOrigin: true,
    }),
  );
};
