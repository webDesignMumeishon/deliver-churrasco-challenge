import { connect } from 'mongoose';
import dotenv from 'dotenv';


export async function run() {
  await connect(process.env.MONGO_URL);
}
