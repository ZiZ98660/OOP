const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
