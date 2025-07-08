import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import router from './routes/notesRoutes.js';
import connectDB from './cofing/db.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5050;
const __dirname = path.resolve();


//MIDDLEWARE
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
        })
    );
};

app.use(express.json()); // this middleware will parse jason bodies: req. body
app.use(rateLimiter);

//Ourt simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Req method: ${req.method} and Req URL : ${req.url}`);
//     next();
// });

app.use("/api/notes",router);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => { 
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    });

}


connectDB().then(() => {
    try {
        app.listen(PORT, () => {
        console.log(`Server started on PORT: http://localhost:${PORT}`);
    });
    } 
    catch (error) {
        console.log("Error connecting to   DATABASE", error);
    }
    
});




// npm i @upstash/ratelimit@2.0.5 @upstash/redis@1.34.9   , to insatll upstash