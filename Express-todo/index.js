const express=require('express');
const port=7000;
const app=express();
app.use(express.urlencoded());
app.set("view engine","ejs");

let studentdata=[
  {
    id:1,
    name:"vivek"
  },
  {
    id:2,
    name:"pratik"
  }
]
app.get("/",(req,resp)=>{
    resp.render("index",{studentdata});
});

app.post('/showdata',(req,resp)=>{
  const {id,name}=req.body;
  let student_obj={
    id:id,
    name:name
  }
  studentdata.push(student_obj);
  resp.redirect("/")  
})

app.get("/deletedata",(req,resp)=>{
    const id = req.query.userid;

    const data=studentdata.filter((el,i)=>{
     return el.id !=id;
    })
    studentdata=data;
    resp.redirect("back")
})

app.get("/editdata",(req,resp)=>{
   
  const id=req.query.editid;

  const data=studentdata.find(el=>el.id==id)
  
   
   resp.render("edit",{
    data
   })
  
   
});




app.post("/updatedata",(req,resp)=>{
   const {id,name}=req.body;

   const student_id=parseInt(id);

   const student=studentdata.find(el=>el.id===student_id);

   if(student){
    student.name=name;
   }
   resp.redirect("/");
})

app.listen(port, console.log(`Server Started by port ${port} .....`));