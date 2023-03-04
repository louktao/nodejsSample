const http = require("http");
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const encode_utf8 = "utf8";

var index_page = "nodeDemo/index.ejs";
var other_page = "nodeDemo/other.ejs";
var css_path = "nodeDemo/style.css"

const index_ejs = fs.readFileSync(index_page, encode_utf8);
const other_ejs = fs.readFileSync(other_page, encode_utf8);
const style_css = fs.readFileSync(css_path, encode_utf8);

var server = http.createServer(getFromClient);

server.listen(3000);
console.log("Server start is sucessed!");

// create serverの処理
function getFromClient(request, response){

    var url_parts = url.parse(request.url, true);

    switch (url_parts.pathname) {
        case '/':
            index_render(url_parts, request, response);
            break;
        case '/other':
            other_ender(request, response);
            break;
        case '/style.css':
            css_render(request, response);
            break;
        default:
            default_render(request, response);
            break;
    }
}

//  黙然のレンダー
function default_render(request, response){
    response.writeHead(200, { 'Content-Type' : 'text/plain' });
    response.write('no page...');
    response.end(); 
}

// cssファイルのレンダー
function css_render(request, response){

    response.writeHead(200, { 'Content-Type' : 'text/css' });
    response.write(style_css);
    response.end(); 

}

// ejsテンプレートのレンダー
function index_render(url_parts, request, response){

    var display_content = "これはIndexページです。";

    // ejsのテンプレートで画面を展示
    var content = ejs.render(index_ejs, {
        title: "Index",
        content: display_content
    });

    response.writeHead(200, { 'Content-Type' : 'text/html' });
    response.write(content);
    response.end();
}

// otherページのレンダー
function other_ender(request, response){

    var body = '';
    var msg = 'これはOtherページです。';

    if(request.method == 'POST'){

        request.on('data', function(data) {
            body += data;
        })

        request.on('end', function(){
            var post_data = qs.parse(body);
            // Otherのページに遷移
            var content = ejs.render(other_ejs,{
                title: "Other",
                name_eng: post_data.name_eng,
                name_ktkn: post_data.name_ktkn
            });
            response.writeHead(200, { 'Content-Type' : 'text/html' });
            response.write(content);
            response.end(); 
        })

    // GETでアクセスの処理
    }else{

        msg = 'ページがありません。';
        // Otherのページに遷移
        var content = ejs.render(other_ejs,{
            title: "Other",
            content: msg
        });

        response.writeHead(200, { 'Content-Type' : 'text/html' });
        response.write(content);
        response.end(); 
    }

    
    
}
