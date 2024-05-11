import React from "react";
import Nav from './Nav'
import { useState, useEffect } from 'react';
import axios from 'axios';
import stubs from "./stubs";
import { BACKEND_URL} from "./Url.js"

import Editor from '@monaco-editor/react';
export default function IDE(){
    const [code,setCode] = useState('');
    const [input,setInput]=useState('');
    const[output,setOutput]=useState('');
    const [outwindow,setOutwindow]=useState('input')
    const [language,setLanguage] = useState('cpp');

    useEffect(()=>{
      setCode(stubs[language])
    },[language])

    const handleClick= async (e)=>{
        e.target.disabled=true;
        setOutput("Loading...")
        setOutwindow('output')
        const payload = {
            language: language,
            code: code,
            input: input
        }
        try {
            const {data} = await axios.post(BACKEND_URL+"run", payload)
            setOutput("Output: \n"+data.output)
            console.log(data)
        } catch (error) {
            // console.log(error.response);
            const msg = error.response.data.err.stderr;
            const e=msg.split("error:")[1];
            setOutput("Compilation or Run time Error:\n"+e)
        }
        e.target.disabled=false;
    }

    return (<div className="ide-wrapper">
            <Nav/>
        <section className='ide'>
        <div className="lang">
        <label>Language:</label>
        <select
          value={language}
          onChange={(e) => {
            const shouldSwitch = window.confirm(
              "Are you sure you want to change language? WARNING: Your current code will be lost."
            );
            if (shouldSwitch) {
              setLanguage(e.target.value);
            }
          }}
        >
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="py">Python</option>
        </select>
      </div>
            {/* <textarea onChange={(e)=>setCode(e.target.value)} value={code} placeholder=' Write your code here' spellCheck="false"></textarea> */}
            <Editor height="65%" value={code} language="cpp" onChange={(value)=>setCode(value)} options={{automaticLayout: true}}/>
            <div className='output'>
                <div className='window-btns'>
                    <button onClick={()=>setOutwindow('input')}>input</button>
                    <button onClick={()=>setOutwindow('output')}>output</button>
                </div>
                {(outwindow==='input')&&<textarea onChange={(e)=>setInput(e.target.value)} value={input} placeholder='input here'></textarea>}
                {(outwindow==='output')&&<p style={{"white-space":"pre-wrap",overflow:"auto"}}>{output}</p>}
                <div className='submit-btns'>
                <button onClick={(e)=>handleClick(e)}>Run</button>
                </div>
            </div>
        </section>
        </div>
    )
}
