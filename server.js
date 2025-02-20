// const express = require("express");
// const path = require("path");
// const fs = require("fs");

// const app = express();

// app.use(express.static(path.join(__dirname, "./client/build")));

// app.get("*", (req, res) => {
//   console.log("htmlContent");
//   //   res.sendFile(path.join(__dirname, "client/build", "index.html"));

//   const filePath = path.join(__dirname, "client/build", "index.html");

//   const htmlContent = fs.readFileSync(filePath, "utf8");

//   htmlContent = htmlContent.replace(
//     /<meta property="og:image".*\/>/,
//     `<meta property="og:image" content="https://sample-videos.com/img/Sample-png-image-100kb.png" />`
//   );

//   res.send(htmlContent);
// });

// app.listen(5001, () => {
//   console.log(`Server is running on http://localhost:${5001}`);
// });
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Serve static files except for index.html
app.use((req, res, next) => {
  if (req.path === "/" || req.path === "/index.html") {
    next();
  } else {
    express.static(path.join(__dirname, "./client/build"))(req, res, next);
  }
});

// Custom handler for index.html
app.get("*", (req, res) => {
  console.log("htmlContent");

  const filePath = path.join(__dirname, "client/build", "index.html");
  let htmlContent = fs.readFileSync(filePath, "utf8");

  htmlContent = htmlContent.replace(
    /<\/head>/,
    `<meta property="og:image" content="https://sample-videos.com/img/Sample-png-image-100kb.png" />\n</head>`
  );

  console.log(htmlContent);

  res.send(htmlContent);
});

app.listen(5001, () => {
  console.log(`Server is running on http://localhost:${5001}`);
});
