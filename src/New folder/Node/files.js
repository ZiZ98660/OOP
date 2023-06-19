const fs = require("fs");

// reading files
fs.readFile("./txtdoc.txt", (err, data) => {
  err ? console.log(err) : console.log(data.toString());
});

// writing files
fs.writeFile("./txtdoc.txt", "115 financial breaches", () => {
  console.log("UCL was successfully bought");
});
fs.writeFile("./stream.js", "<p>something</p>", () => {
  console.log("file was successfully writen");
});

// directories
!fs.existsSync("./views")
  ? fs.mkdir("./views", (err) => {
      err ? console.log(err) : console.log("folder created");
    })
  : console.log("folder already exists!");

// deleting files
fs.existsSync("./txtdoc1.txt")
  ? fs.unlink("./txtdoc1.txt", (err) => {
      err ? console.log(err) : console.log("file deleted");
    })
  : console.log("file does not exist!");
