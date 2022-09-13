import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export async function run() {
  await connect(process.env.MONGO_URL);
}
