const http = require("http");
const render = require("./src/page");
const host = 'localhost';
const port = 8080;


const requestListener = function (req, res) {
    const postCode = req.url.substring(req.url.indexOf("=")+1);
    console.log("Receive PostCode: "+postCode);
    //res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    render(postCode).then(data => {
        res.end(data);
    })
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});