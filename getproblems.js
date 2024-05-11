const {Prob} = require ("../models/prob.js");

async function getProblems(req,res){
  console.log("get all problems was called");
    try {
        const problems = await Prob.find();
        return res.status(200).json(problems);
      } catch (e) {
        console.log(e);
        return "Error";
      }
}

async function getStatement(req,res){
  const {id} = req.body
  try {
    const problem = await Prob.findOne({id:id})
    res.status(200).json(problem.description)
  } catch (e) {
    console.log(e);
    return "Error";
  }
}

module.exports={getProblems, getStatement}
