const http=require('http');
const fs=require('fs/promises');


const server=http.createServer(async(req,resp)=>{
  
   const path=req.url;
   const method=req.method;

   console.log(new Date(),path,method)
  

   if(path.includes("file") && method==="GET")
   {
      const filename=path.split("/").pop();
      console.log(filename)
      
      const data= await fs.readFile("./"+filename)
      resp.end(data)
   
   }
      else{
         resp.end("404 error");
      }
 

   
});

server.listen(6030,()=>console.log("Server running"))




  