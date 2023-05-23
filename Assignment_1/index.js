const http = require("http");
const fs = require("fs")
const querystring= require("querystring")
const url = require("url")
http.createServer((req,res)=>{
    if(req.url=="/file/download"){
        const data=fs.readFileSync("./db.json","utf-8")
       let jsonadata=JSON.parse(data)
       
       const parseUrl = url.parse(req.url)
       const queryParams=querystring.parse(parseUrl.query)
      
       const param1 = queryParams.param1;
  const param2 = queryParams.param2;
  console.log(param1, param2);

    //    if(req.query.id){
    //     for(let i=0;i<=jsonadata.length-1;i++){
    //         if(jsonadata[i].id==req.query.id){
    //             res.end(JSON.stringify(jsonadata[i]))
    //         }
    //        }
    //    }
      
        res.end(JSON.stringify(jsonadata))
    }
}).listen(7000,()=>{
    console.log("Listening on port 7000")
})