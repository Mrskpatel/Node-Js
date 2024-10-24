import React, { useEffect, useState } from 'react';
import axios from 'axios';


function ViewTodo() {
  const [viewadmin, setViewAdmin] = useState([]);

  useEffect(()=>{

    const fetchdata=async()=>{
     
          await axios.get("http://localhost:2025/admin/viewadmin")
          .then((res)=>{
             console.log(res)
             setViewAdmin(res.data)
          })
          .catch((err)=>{
            console.log(err);
            
          })
         
    }
    fetchdata();

  },[])

  const deletedata=async(id)=>{
      await axios.delete(`http://localhost:2025/admin/deleteadmin?id=${id}`)
      .then((res)=>{
        console.log(res);
        setViewAdmin(viewadmin.filter((admin)=>admin._id!==id));
      })
      .catch((err)=>{
        console.log(err);
        
      })
  }
  

  return (
    <div style={{ textAlign: "center"}}>
      <h2>View Form</h2>

      <table className="table table-bordered border-light" style={{ color: "white", width: "650px" }}>
        <thead style={{ background: "black" }}>
          <tr>
            <th scope="col">#No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            {/* <th scope="col">Password</th> */}
            <th scope="col">Phone no.</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody style={{color : "black"}}>
          {viewadmin.length > 0 ? (
            viewadmin.map((el, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.password}</td> 
                <td>{el.phoneno}</td>
                <td >
                  <i
                    className="ri-delete-bin-line"
                    style={{ color: "red" }}
                    onClick={()=>deletedata(el._id)}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTodo;
