import React,{useState , useEffect, useRef} from "react";
import Popup from "./popup";
import axios from "axios";

export function Getdata(){
    const [Apidata, setApidata] = useState([]);
    const [open,setOpen] = useState([])
    const [pop,setPop] = useState(false)
    const [onset , setOnchange] = useState([])

    let menuRef = useRef();

    // getting api data
    useEffect(()=>{
        const getdata = async()=>{
            const data = await axios.get("https://jsonplaceholder.typicode.com/users");
           
            setApidata(data.data)
        }
        getdata();
    },[]);
// console.log(Apidata)
    
    // modal eacape and mousedone
    useEffect(()=>{
        let handler =(e)=>{
            if(e.target.className==="container"){
            //   console.log("yes")
              setPop(false);
            }
        }
        document.addEventListener("mousedown",handler)
       

        let keyHandler=(e)=>{
            if(e.key === "Escape"){
                // console.log("escape")
                setPop(false)
            }
        }
        document.addEventListener("keydown",keyHandler)
        return()=>{
            document.removeEventListener("keydown",keyHandler)
            document.removeEventListener("mousedown",handler)
        }
    })

    // inputbox handle change
    function handleChange(e){
        setOnchange(e.target.value)
    }

    // modal popup function
    const handlePopup=(data)=>{
        setOpen(data)
        setPop(!pop)
    }
    let addr = open.address

   return (
    <div className="container">
        {/* tittle */}
        <marquee direction="left" behavior="scroll" className="tittle">👉!!!. USER INFORMATION .!!!👈</marquee>

        {/* search box */}
        <span className="search-con">
          <div>Search</div>
          <input type="text" placeholder="Search by Name" onChange={handleChange} className="inputbox"/>
        </span>

        {/* modal value */}
        {pop && <Popup handleClose={handlePopup}
       content={
       <div className="pop-con" ref={menuRef}>
            <div className="name pop-upval">🙋‍♂️ <span className="span">Name :</span> {open.name}</div>
            <div className="ph pop-upval">📞 <span className="span">Phone :</span> {open.phone}</div>
            <div className="web pop-upval">🌐 <span className="span">Website :</span> {open.website}</div>
            <div className="add span">🏠 Address :</div>
            <div className="add-con">
                <div><span className="span">Street :</span> {addr.street} ,</div>
                <div><span className="span">City :</span> {addr.city} ,</div>
                <div><span className="span">Zipcodes :</span> {addr.zipcode} .</div>
            </div>     
        </div>}/>}

        {/* table heading and data */}
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