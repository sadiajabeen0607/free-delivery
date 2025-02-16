// db.js file

import dotenv from "dotenv";
dotenv.config();

// console.log("username",process.env.MONGODB_MONGODB_USERNAME);
// console.log("password", process.env.MONGODB_PASSWORD);

const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;

if (!MONGODB_USERNAME || !MONGODB_PASSWORD) {
  throw new Error("MongoDB username or password is missing. Check your .env file.");
}

export const connectDB = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@restaurantapp.gr25s.mongodb.net/restaurantDB?retryWrites=true&w=majority`;



  
