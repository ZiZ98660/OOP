const express = require("express");
const mongoose = require("mongoose");
const sectionRoutes = require("./routes/sectionRoutes");

// express app
const app = express();

// connect to mongo DB
const dBURI =
  "mongodb+srv://ZiZ8660:azaziz123@node-cluster.qsyzajy.mongodb.net/node-cluster?retryWrites=true&w=majority";

mongoose
  .connect(dBURI)
  .then((res) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

// middleware and static files
// app.use((req, res, next) => {
//   console.log(`A new ${req.method} request made`);
//   next();
// });
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded());

// mongoose and sandbox routes
// app.get("/add-section", (req, res) => {
//   const section1 = new Section({
//     title: "new section 2",
//     snippet: "About section",
//     body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit",
//   });

//   section1
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-sections", (req, res) => {
//   Section.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/section-1", (req, res) => {
//   Section.findById("6488209f4d58af97bc677265")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/", (req, res) => {
//   // res.send("<h1>B$tch stf*</h1>");
//   //   res.sendFile("./views/index.html", { root: __dirname });
//   const sections = [
//     {
//       title: "section 1",
//       body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
//     },
//     {
//       title: "section 2",
//       body: "Deleniti, distinctio!Lorem ipsum dolor, sit amet consectetur adipisicing elit",
//     },
//     {
//       title: "section 3",
//       body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
//     },
//   ];
//   res.render("index", { title: "Home", sections });
// });

/*routes*/
app.get("/", (req, res) => {
  res.redirect("/sections");
});

app.get("/about", (req, res) => {
  //   res.send("<h1>About Express</h1>");
  //   res.sendFile("./views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

// section routes
app.use(sectionRoutes);

// 404 page
app.use((req, res) => {
  //   res.status(404).sendFile("./views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
