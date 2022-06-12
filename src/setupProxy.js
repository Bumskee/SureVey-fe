
const { createProxyMiddleware } = require("http-proxy-middleware");


const nodeflux_auth = {
    target: 'https://backend.cloud.nodeflux.io',
    changeOrigin: true
}

const nodeflux_face_match = {
  target: "https://api.cloud.nodeflux.io",
  changeOrigin: true
}


module.exports = function(app) {
  app.use(
    "/auth/signatures", createProxyMiddleware(nodeflux_auth)
  );
  
  app.use(
    "/v1/analytics/face-match", createProxyMiddleware(nodeflux_face_match)
  );  
}
