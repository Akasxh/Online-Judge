import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL} from "./Url.js"

export default function Subcard({id,name,code,verdict,lang,time}){
    const Nav = useNavigate();
    const handleClick = async ()=>{
        const desc = await axios.post(BACKEND_URL+"getstatement",{id})
        const description=desc.data;
        sessionStorage.setItem('fromsub',true);
        Nav(`/problem/${id}`,{state: {name,description,code,lang}})
    }

    const map = new Map();
    map.set('cpp','C++'); map.set('py','Python 3'); map.set('c','C');
    const Lang=map.get(lang)
    return(
    <div className="subcard" onClick={handleClick}>
        <div className="sub-element">{time}</div>
        <div className="sub-element"> {name} </div>
        <div className="sub-element"> {Lang} </div>
        <div className="sub-element"> {verdict} </div>
    </div>
    )
}
