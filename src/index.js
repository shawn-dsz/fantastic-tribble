const express = require("express");
const app = express();
const port = 3000;
// app.use(compression());
const foo = () => {
  return new Promise((r, s) => {
    setTimeout(() => {
      r("done");
    }, 1000);
  });
};
// server-sent event stream
app.get("/", function(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");

  res.write("data: ping\n\n");

  res.flush();

  foo().then(val => {
    res.write(val);
    res.write("\n\n");

    foo().then(val => {
      res.write(val);
      res.write("\n\n");
      res.send();
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
