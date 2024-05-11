import React from "react";
import Nav from "./Nav";
import Subcard from "./Subcard";
import { BACKEND_URL} from "./Url.js"
import { useState, useEffect } from "react";
import axios from "axios";

export default function Submissions() {
  const [data, setData] = useState([]);
  const mail = sessionStorage.getItem("mail");
  const handle = sessionStorage.getItem('handle');
  useEffect(() => {
    const getdata = async () => {
      try {
        await axios
          .post(BACKEND_URL+"getsubmissions", { mail })
          .then((res) => setData(res.data));
      } catch (error) {
        console.log(error, "something went wrong");
      }
    };
    getdata();
  },[]);

  const subs = data.map((i) => {
    return (
      <Subcard
        id={i.problemid}
        name={i.probname}
        code={i.code}
        verdict={i.verdict}
        lang={i.language}
        time={i.submittedAt}
      />
    );
  });

  return (
    <div className="problem-page">
      <h2> {handle} submissions </h2>
      <Nav />
      <div className="problems-wrapper">{subs}</div>
    </div>
  );
}
