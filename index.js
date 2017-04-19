const http = require('http');
const fs=require("fs");
const xlsx = require("node-xlsx");

const list = xlsx.parse("./test.xlsx");

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => { 
	fs.readFile('./index.html','utf-8',function(err,data){  
	      if(err){  
	          console.error(err);  
	      }  
	      else{  
						res.statusCode = 200;
					  res.setHeader('Content-Type', 'text/html');
					  var t = JSON.stringify(list[0].data);
						data = data.replace(/{{(.*)}}/g,function(){
							console.log('excel'.indexOf(arguments[0]));
							if(arguments[0].indexOf('excel') != -1){
								return t;
							}
						})
					  res.write(data);
					  res.end(); 
	      }  
	});  

});

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});
