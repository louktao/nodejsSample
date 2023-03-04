const http = require("http");
const fs = require('fs');
const ejs = require('ejs');

var filePath = "nodeDemo/index.ejs";

var server = http.createServer(getFromClient);

server.listen(3100);
console.log("Server start is sucessed!");

// create serverの処理
function getFromClient(request, response){

    if(error){
        console.log(error);
        throw error;
    }

    //ejsのテンプレートで画面を展示
    var content = ejs.render(fs.readFileSync(filePath, "utf8"));

    response.writeHead(200, { 'Content-Type' : 'text/html' });
    response.write(content);
    response.end();

}
