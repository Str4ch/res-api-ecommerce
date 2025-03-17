const express = require("express");
const app = express();
const port = 3000;

app.use((req, res, next)=>{
    req.multiplication = 4*7;
    next();

})

app.get("/", (req, res) =>{
    res.send(req.multiplication.toString());
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });