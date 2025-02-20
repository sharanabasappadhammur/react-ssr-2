const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static(path.join(__dirname, "./client/build")));

app.listen(5001, () => {
  console.log(`Server is running on http://localhost:${5001}`);
});

app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "client/build", "index.html"));

  const filePath = path.join(__dirname, "client/build", "index.html");

  const htmlContent = fs.readFileSync(filePath, "utf8");

  htmlContent = htmlContent.replace(
    /<meta property="og:image".*\/>/,
    `<meta property="og:image" content="https://sample-videos.com/img/Sample-png-image-100kb.png" />`
  );

  res.send(htmlContent);
});
