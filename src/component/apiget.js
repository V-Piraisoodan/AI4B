import React,{useState , useEffect, useRef} from "react";
import Popup from "./popup";
import axios from "axios";

export function Getdata(){
    const [Apidata, setApidata] = useState([]);
    const [open,setOpen] = useState([])
    const [pop,setPop] = useState(false)
    const [onset , setOnchange] = useState([])

    useEffect(()=>{
        const getdata = async()=>{
            const data = await axios.get("https://jsonplaceholder.typicode.com/users");
           
            setApidata(data.data)
        }
        getdata();
    },[]);
console.log(Apidata)
    function handleChange(e){
        setOnchange(e.target.value)
    }
    // console.log(onset)

    const handlePopup=(data)=>{
        setOpen(data)
        setPop(!pop)
        // console.log(data)
    }
    let st = open.address
//  console.log(st.street)

   return (
    <div className="container">
        <marquee direction="left" behavior="scroll" className="tittle">👉!!!. USER INFORMATION .!!!👈</marquee>
        <span className="search-con">
          <div>Search</div>
          <input type="text" placeholder="Search by Name" onChange={handleChange} className="inputbox"/>
        </span>
        {pop && <Popup handleClose={handlePopup}
       content={
       <div className="pop-con">
            <div className="name"><span>Name :</span> {open.name}</div>
            <div className="ph"><span>Phone :</span> {open.phone}</div>
            <div className="web"><span>Website :</span> {open.website}</div>
            <div className="add">Address :</div>
            <div className="add-con">
                <div><span>Street :</span> {st.street}</div>
                <div><span>City :</span> {st.city}</div>
                <div><span>Zipcodes :</span> {st.zipcode}</div>
            </div>     
        </div>}/>}
        <table className="table">
            <thead className="tablehead">
                <tr className="tablerow" >
                    <td className="th">Id</td>
                    <td className="th">Name</td>
                    <td className="th">Username</td>
                    <td className="th">Email</td>
                </tr>
            </thead>
            <tbody className="tablebody">
                {Apidata
                .filter((val)=>{
                    if(onset == ""){
                        return val;
                    }else if(val.name.toLowerCase().includes(onset.toLowerCase())){
                        return val;
                    }
                })
                .map((data,index)=>{
                    return (
                        <tr key={index} onClick={(e)=>handlePopup(data)} className="tablerow-body">
                          <td>{data.id}</td>
                          <td>{data.name}</td>
                          <td>{data.username}</td>
                          <td>{data.email}</td>
                      </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
   )
}