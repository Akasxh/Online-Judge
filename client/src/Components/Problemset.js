import React from 'react';
import Nav from './Nav';
import Probcard from './Probcard';
import axios from 'axios';
import { BACKEND_URL} from "./Url.js"
import { useState, useEffect} from 'react';

export default function Problemset(){

    const [data, setData] = useState([]);
    sessionStorage.setItem("fromsub",false);
    useEffect(() => {
        const getdata= async () =>{
            try {
                await axios.get(BACKEND_URL+"/getAllproblems").then(res=>setData(res.data))
            } catch (error) {
                console.log(error,"something went wrong")
            }
        }
        getdata()
  }, []);
  
    const problems = data.map((i)=>{return <Probcard id={i.id} name={i.name} description={i.description} tag={i.tag}/>})


    return(
        <div className='problem-page'>
            <h1> Online Judge </h1>
            <Nav/>
            <div className='problems-wrapper'>
                {problems}
            </div>
        </div>
    )
}
