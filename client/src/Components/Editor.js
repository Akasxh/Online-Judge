import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import stubs from "./stubs";
import { BACKEND_URL} from "./Url.js"
export default function Editor({ id, name }) {
  const initial = stubs.cpp;
 
  const [code, setCode] = useState(initial);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [outwindow, setOutwindow] = useState("input");
  const [language, setLanguage] = useState("cpp");

  useEffect(() => {
        setCode(stubs[language]);
  }, [language]);


  const handleRun = async (e) => {
    e.target.disabled = true;
    setOutput("Loading...");
    setOutwindow("output");
    const payload = {
      language:language,
      code: code,
      input: input,
    };
    try {
      const { data } = await axios.post(BACKEND_URL+"run", payload);
      setOutput("Output: \n" + data.output);
    } catch (error) {
      const msg = error.response.data.err.stderr;
      // console.log(error.response);
      // console.log(msg);
      let e = msg.split("error:")[1];
      if(language==='py'){
        e=msg.split("line")[1];
      }
      setOutput("Compilation or Run time Error:\n" + e);
    }
    e.target.disabled = false;
  };

  const usermail = sessionStorage.getItem("mail");
  const handleSubmit = async (e) => {
    e.target.disabled = true;
    setOutput("Loading...");
    setOutwindow("output");
    const payload = {
      language: language,
      code: code,
      id: id,
      probname: name,
      mail: usermail,
    };
    try {
      const { data } = await axios.post(
        BACKEND_URL+"submit",
        payload
      );
      const { accepted, totalcases } = data;
      if (accepted === totalcases) {
        setOutput(
          `Verdict: Accepted\nDetails: ${accepted}/${totalcases} test cases passed`
        );
      } else {
        setOutput(
          `Verdict: Wrong Answer\nDetails: ${accepted}/${totalcases} test cases passed`
        );
      }
    } catch (error) {
      const msg = error.response.data.err.stderr;
      // console.log(msg);
      let e = msg.split("error:")[1];
      if(language==='py'){
        e=msg.split("line")[1];
      }
      setOutput("Compilation or Run time Error:\n" + e);
    }
    e.target.disabled = false;
  };

  return (
    <section className="editor">
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
          <option value="py">Python</option>
          <option value="c">C</option>
        </select>
      </div>
      <textarea
        onChange={(e) => setCode(e.target.value)}
        value={code}
        placeholder=" Write your code here"
        spellCheck="false"
      ></textarea>
      <div className="output">
        <div className="window-btns">
          <button onClick={() => setOutwindow("input")}>input</button>
          <button onClick={() => setOutwindow("output")}>output</button>
        </div>
        {outwindow === "input" && (
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder="input here"
          ></textarea>
        )}
        {outwindow === "output" && (
          <p style={{ "white-space": "pre-wrap", overflow: "auto" }}>
            {output}
          </p>
        )}
        <div className="submit-btns">
          <button onClick={(e) => handleRun(e)}>Run</button>
          <button onClick={(e) => handleSubmit(e)}>Submit</button>
        </div>
      </div>
    </section>
  );
}
