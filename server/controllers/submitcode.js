const { generateFile, generateInput } = require("../generateFile");
const { getTestcases } = require("../getTestcases");
const { executeCpp, executePy, executeC } = require("../executeFile");
const { Sub } = require("../models/submission");
const fs = require("fs-extra");
const path = require("path");

const outputPath = path.join(__dirname, "..", "codes");

const submitCode = async (req, res) => {
  const { language = "cpp", code, id, probname, mail } = req.body;
  const newSub = new Sub();
  newSub["language"] = language;
  newSub["problemid"] = id;
  newSub["usermail"] = mail;
  newSub["probname"] = probname;
  const time = new Date().toLocaleString();
  newSub["submittedAt"] = time;
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "empty code body" });
  }
  newSub["code"] = code;

  let testcases = [];
  let filepath = "";
  try {
    const Tcases = await getTestcases(id);
    filepath = await generateFile(language, code);
    testcases = Tcases.cases;
  } catch (err) {
    newSub["verdict"] = "Error";
    await newSub.save();
    return res.status(500).json({ err });
  }

  let accepted = 0;
  const totalcases = testcases.length;
  let output;
  for (let i = 0; i < testcases.length; i++) {
    try {
      const inputfile = await generateInput(testcases[i].input);
      if(language==='cpp'){
        output = await executeCpp(filepath);
      }
      else if(language==='py'){
        output = await executePy(filepath);
      }
      else if (language==='c'){
        output = await executeC(filepath);
      }
      const out = output.trim();
      if (out == testcases[i].output) {
        accepted = accepted + 1;
      }
    } catch (err) {
      newSub["verdict"] = "Error";
      await newSub.save();
      return res.status(500).json({ err });
    }
  }
  fs.emptyDirSync(outputPath);
  if (accepted == totalcases) newSub["verdict"] = "AC";
  else newSub["verdict"] = "WA";
  await newSub.save();
  return res.status(200).json({ accepted, totalcases });
};

module.exports = {
  submitCode,
};
