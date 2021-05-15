const http = require("http");

const host = 'localhost';
const port = 8000;


const requestListener = function (req, res) {
    const postCode = req.url.substring(req.url.indexOf("=")+1);
    console.log("Receive PostCode: "+postCode);
    //res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end("My first server!");
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});