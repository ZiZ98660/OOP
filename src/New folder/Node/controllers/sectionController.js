const Section = require("../models/section");

const section_index = (req, res) => {
  Section.find()
    .sort({ createdAt: -1 })
    .then((output) => {
      res.render("index", { title: "Sections", sections: output });
    })
    .catch((err) => {
      console.log(err);
    });
};

const section_details = (req, res) => {
  const id = req.params.id;
  Section.findById(id)
    .then((output) => {
      res.render("details", { section: output, title: "Section Details" });
    })
    .catch((err) => console.log(err));
};

const section_create_get = (req, res) => {
  res.render("create", { title: "Create new section" });
};

const section_delete = (req, res) => {
  const id = req.params.id;

  Section.findByIdAndDelete(id)
    .then((output) => {
      res.json({ redirect: "/sections" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const section_create_post = (req, res) => {
  const section = new Section(req.body);
  section
    .save()
    .then((result) => {
      res.redirect("/sections");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  section_index,
  section_details,
  section_create_get,
  section_delete,
  section_create_post,
};
