const { exec } = require("child_process");
const path = require("path");
const { stdout, stderr } = require("process");

const outputPath = path.join(__dirname, "codes");

const executeCpp = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outpath = path.join(outputPath, `${jobId}.out`);
  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outpath} && cd ${outputPath} && ./${jobId}.out<input.txt`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};

const executePy = (filepath) => {
  return new Promise((resolve, reject) => {
    exec(
      `cd ${outputPath} && python3 ${filepath}<input.txt`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};


const executeC = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outpath = path.join(outputPath, `${jobId}.out`);
  return new Promise((resolve, reject) => {
    exec(
      `gcc ${filepath} -o ${outpath} && cd ${outputPath} && ./${jobId}.out<input.txt`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};

module.exports = { executeCpp,executePy,executeC };
