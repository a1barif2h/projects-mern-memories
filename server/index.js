import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";


const app = express();
dotenv.config();


app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());
app.use("/posts", postsRouter);
app.use("/user", usersRouter);

app.get("/", (req,res) => {
    res.send("Hello Welcome to Memory Project!")
})

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server listening at port ${PORT}`)))
.catch(err => console.log(err.message));

mongoose.set("useFindAndModify", false);