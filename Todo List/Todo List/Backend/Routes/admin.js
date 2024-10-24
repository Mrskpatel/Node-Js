const express=require('express')

const routes=express.Router();
const AdminCtl=require('../Controller/AdminCtl');



routes.post("/registration",AdminCtl.Registration);
routes.post("/loginadmin",AdminCtl.loginadmin)
routes.get("/viewadmin",AdminCtl.viewAdmin)
routes.post("/insertadmin",AdminCtl.insertadmin)
routes.delete("/deleteadmin",AdminCtl.deleteadmin)

module.exports=routes;