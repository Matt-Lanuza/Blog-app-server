const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes Middleware
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const corsOptions = {
    origin: ['http://localhost:3000', 'https://blog-post-server.onrender.com', 'https://blog-app-client-swart.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


//[Database Connection]
const MONGODB_STRING = "mongodb+srv://admin:admin123@wdc028-b461.qepkz.mongodb.net/Blog-App-API?retryWrites=true&w=majority&appName=WDC028-B461";
mongoose.connect(MONGODB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open',()=>console.log("Now connected to MongoDB Atlas"));

//[Backend Routes]
app.use("/users", userRoutes);
app.use("/posts", postRoutes);



const PORT = 4000;
if(require.main === module){
	app.listen(PORT, () => {
	    console.log(`API is now online on port ${PORT}`)
	});
}

module.exports = {app,mongoose};