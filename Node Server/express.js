const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.write("<h1>Welcome Backend</h1>");
  res.end();
});
server.listen(5000, (req, res) => {
  console.log("====================================");
  console.log("Server Is Running");
  console.log("====================================");
});