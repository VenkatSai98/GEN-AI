import mongoose from 'mongoose';
import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors(
  {origin: 'http://localhost:5173', // backend should know where my frontend is hosted for cookies etc..
    credentials: true, // to allow cookies to be sent from frontend to backend and allowing http requests also even with out https
  } 
))

app.use(express.json()); // to handle to user request body we need this middleware
app.use(cookieParser());

async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://venkatasaireddyvibrant:oF6xcN61jb8qhilw@organic-cluster.9ecyi.mongodb.net/tinder');
    console.log("Connected to MongoDB Server");

    app.listen(7777, () => {
      console.log("Server is running on port 7036");
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
}

app.post('/search', (req, res) => {
  const {query} = req.body.params;
  console.log('Test route accessed', req.body);
  console.log('Query parameter:', query);
  res.send('Test route is working!');
});

connectDB().then(() => {
  console.log("Database connection attempt finished.");
  app.listen(7036, () => {
    console.log("Server is running on port 7036");
  });
}).catch((err) => {
  console.error("Error during database connection attempt:", err);
});
