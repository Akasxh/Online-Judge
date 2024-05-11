const {testCase} = require ("./models/testcase");

async function getTestcases(id){
    try {
        const Tcases = await testCase.findOne({id:id});
        return Tcases
      } catch (e) {
        console.log(e,"Error getting test cases");
        return "Unable to fetch cases";
      }
}

module.exports={getTestcases}
