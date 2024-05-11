const {Sub} = require ("../models/submission");

async function getSubs(req,res){
  console.log("get subs was called");
    try {
        const {mail} = req.body
        const problems = await Sub.find({usermail:mail})
        res.status(200).json(problems);
      } catch (e) {
        console.log(e);
        return "Error getting user submissions";
      }
}

module.exports={getSubs}
