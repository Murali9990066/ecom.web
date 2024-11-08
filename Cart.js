import axios from "axios"
import { useContext, useEffect, useState } from "react"
import Gc from "./Gc"

let Cart=()=>{
    let [data,setData]=useState([])
    let [err,setErr]=useState("")
    let [total,setTotal]=useState(0)
    let obj=useContext(Gc)
    let getcart=()=>{
        axios.get(`http://localhost:5000/getcart/${obj.usercon._id}`,{headers:{"Authorization":obj.usercon.token}}).then((res)=>{
        if(res.data.msg==undefined) 
        {   
        setData(res.data)
        let y=res.data
        let x=0
        for(let i=0;i<y.length;i++)
        {
            x=x+y[i].qty*y[i].price
        }
        setTotal(x)
        }
        else{
            setErr(res.data.msg)
        }
        })
    }
    useEffect(()=>{
        if(obj.usercon._id=="")
        {
            setErr("plz login")
        }
        else{
            getcart()
        
    }

    },[])
    let del=(_id)=>{
        axios.delete(`http://localhost:5000/delitem/${_id}`,{headers:{"Authorization":obj.usercon.token}}).then((res)=>{
           
            getcart()

        })

    }
    let inc=(id)=>{
        axios.put(`http://localhost:5000/inc`,{"_id":id},{headers:{"Authorization":obj.usercon.token}}).then((res)=>{
           
            getcart()

        })


    }
    let dec=(id)=>{
        axios.put(`http://localhost:5000/dec`,{"_id":id},{headers:{"Authorization":obj.usercon.token}}).then((res)=>{
           
            getcart()

        })


    }
    let clercart=()=>{
        axios.delete(`http://localhost:5000/delcart/${obj.usercon._id}`,{headers:{"Authorization":obj.usercon.token}}).then((res)=>{
           
        getcart()

    }) 

    }
    return(<>
    {err!=""&&<div>{err}</div>}
    {err=="" &&data.length==0&&<div>Your cart is empty</div>}
      {data.length!=0&&  <div className="prodcon"> 
        {
            data.map((item,index)=>{
               
                return(
                    <div className="card">
                        <div className="img"><img src={`http://localhost:5000/imgs/${item.img}`}/></div>
                        <h1>Name:{item.name}</h1>
                        <p>Desc:{item.desc}</p>
                        <p>Cat:{item.cat}</p>
                        <h1>Price:{item.price}</h1>
                        <h1>qty:<button onClick={()=>item.qty>1?dec(item._id):null}>-</button>{item.qty}<button onClick={()=>inc(item._id)}>+</button></h1>
                        <h1>amount:{item.price*item.qty}</h1>
                        <button onClick={()=>del(item._id)}>delcart</button>
                   
                    </div>
                )
            })
        }

        
        </div>}
       {data.length!=0&& <div style={{"color":"red"}}>Total:{total}</div>}
       {data.length!=0&&<button onClick={clercart}>clear cart</button>}
        </>
    )
}
export default Cart