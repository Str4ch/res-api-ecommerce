const express = require("express");
const app = express();
const port = 3000;


const userRoutes = require("./routes/users");

const connectDB = require("./utils/db");

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    next()
});

connectDB();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to my API ! e-commerce backed 🤳")
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });