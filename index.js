const http = require('http');
const fs = require('fs');
let fsp = fs.promises;
const port = 3000;


async function handleFileRequest(req, res) {
    let url = req.url;
    let filePath = 'static' + url;

    if (fs.existsSync(filePath)) {
        let ext = filePath.split('.')[1];
        console.log(filePath);

        switch (ext) {
            case 'css':
                serveFile(filePath, res, { 'Content-Type': 'text/css' });
                break;
            case 'html':
                serveFile(filePath, res, { 'Content-Type': 'text/html' });
                break;
            case 'png':
                serveFile(filePath, res, { 'Content-Type': 'image/png' });
                break;
            case 'js':
                serveFile(filePath, res, { 'Content-Type': 'text/javascript' });
                break;
            case 'jpg':
                serveFile(filePath, res, { 'Content-Type': 'image/jpg' });
                break;
            case 'mp4':
                serveFile(filePath, res, { 'Content-Type': 'video/mp4' });
                break;
            case 'svg':
                serveFile(filePath, res, { 'Content-Type': 'image/svg+xml' });
                break;

        }

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 NOT FOUND');
        res.end();
    }
}


async function serveFile(filePath, res, contentType) {

    let fileContents = await fsp.readFile(filePath);

    res.writeHead(200, contentType)
    res.write(fileContents);
    res.end();
}


const app = http.createServer(handleFileRequest);
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});