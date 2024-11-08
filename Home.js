import axios from "axios"
import { useContext, useEffect, useState } from "react"
import './home.css'
import Gc from "./Gc"
import { useNavigate } from "react-router-dom"

let Home=()=>{
    let [data,setData]=useState([])
    let obj=useContext(Gc)
    let navigate=useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:5000/getprod").then((res)=>{
            setData(res.data)
        })

    },[])
    let addcart=(item)=>{
        if(obj.usercon.islogin)
        {
            item={...item}
            let pid=item._id
            delete item._id
            delete item.comm
            data={"pid":pid,"uid":obj.usercon._id,...item}
axios.post("http://localhost:5000/addcart",data,{headers:{"Authorization":obj.usercon.token}}).then((res)=>{

})
        }
        else{
            navigate("/login")
        }
    }

let upd=(item)=>{
    obj.updateusercon({"item":item})
    navigate("/update")
}
let del=(_id)=>{
    axios.delete(`http://localhost:5000/delprod/${_id}`,{headers:{"Authorization":obj.usercon.token,"_id":obj.usercon._id}}).then(()=>{
        axios.get("http://localhost:5000/getprod").then((res)=>{
            setData(res.data)
        })
    })
}
    return(
        <div className="prodcon"> 
        {
            data.map((item,index)=>{
                return(
                    <div className="card">
                        <div className="img"><img src={`http://localhost:5000/imgs/${item.img}`}/></div>
                        <h1>Name:{item.name}</h1>
                        <p>Desc:{item.desc}</p>
                        <p>Cat:{item.cat}</p>
                        <h1>Price:{item.price}</h1>
                        <button onClick={()=>addcart(item)}>addcart</button>
                    {  obj.usercon.isadmin &&  <button onClick={()=>{upd(item)}}>update</button>}
                     { obj.usercon.isadmin &&  <button onClick={()=>del(item._id)}>delprod</button>}
                    </div>
                )
            })
        }

        
        </div>
    )
}
export default Home