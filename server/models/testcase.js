const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    cases: {
      type: [
        {
          input: String,
          output: String,
        },
      ],
      required: true,
    },
  },
  { collection: "testcases" }
);

const testCase = mongoose.model("testcases", testSchema);

module.exports = { testCase };
