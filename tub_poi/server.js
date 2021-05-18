const http = require("http");
const { compileFunction } = require("vm");
const render = require("./src/page");
const host = '0.0.0.0';
const port = 8000;


const requestListener = function (req, res) {
    const postCode = req.url.substring(req.url.indexOf("=") + 1);
    console.log("Receive PostCode: " + postCode);
    //res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.writeHead(200);
    try {
        render(postCode).then(data => {
            res.end(data);
        }).catch(console.log);
    } catch {
        console.log("Something went wrong!");
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});