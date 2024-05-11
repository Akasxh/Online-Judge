const express =require('express');
const {getProblems, getStatement} = require('../controllers/getproblems.js');
const { checkLogin, signup } = require ('../controllers/login_and_register.js');
const {runCode} = require('../controllers/runcode.js')
const {submitCode} = require('../controllers/submitcode.js')
const {getSubs} = require('../controllers/getSubmissions.js')
const router = express.Router();
// const {getTestcases} = require('../getTestcases.js')

router.get('/getAllproblems', getProblems);
router.post('/getstatement',getStatement)
router.post('/login',checkLogin)
router.post('/register',signup)
router.post('/run',runCode)
router.post('/submit',submitCode)
router.post('/getsubmissions',getSubs)

module.exports = {router}