import mongoose from "mongoose";

async function conectDatabase() {
  mongoose.connect(process.env.DB_CONNECTION_STRING);

  return mongoose.connection;
}

export default conectDatabase;

