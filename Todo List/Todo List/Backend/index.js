const express=require('express');
const port=2025;

const app=express();
const db=require('./Config/db')
const cors=require('cors');


app.use(cors({ origin : 'http://localhost:5173' }));
app.use(express.json());

app.use(express.urlencoded());


app.use("/",require('./Routes/index'));

app.listen(port,console.log(`Server Started on port : ${port}`));
