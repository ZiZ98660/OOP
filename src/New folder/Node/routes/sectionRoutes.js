const express = require("express");
const Section = require("../models/section");
const {
  section_index,
  section_details,
  section_create_get,
  section_delete,
  section_create_post,
} = require("../controllers/sectionController");

const router = express.Router();

// router.get("/sections", (req, res) => {
//   Section.find()
//     .sort({ createdAt: -1 })
//     .then((output) => {
//       res.render("index", { title: "Sections", sections: output });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
router.get("/sections", section_index);

router.post("/sections", section_create_post);

// create section
router.get("/sections/create", section_create_get);

// get details
router.get("/sections/:id", section_details);

// delete section
router.delete("/sections/:id", section_delete);

module.exports = router;
