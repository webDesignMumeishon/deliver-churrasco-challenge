import express, { Express } from 'express';
import logger from 'morgan';
import cors from 'cors';
import "reflect-metadata"
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

dotenv.config();

const whitelist = ['http://localhost:3000']; //add postman

const corsOptions = {
  credentials: true, // This is important.
  origin: (origin, callback) => {
    return callback(null, true)
    // if(whitelist.includes(origin)) return callback(null, true)
    // callback(new Error('Not allowed by CORS'));
  }
}

export default (app: Express) => {

  app.use(cookieParser());

  app.disable('x-powered-by')
  app.set('env', process.env.NODE_ENV)

  if (process.env.NODE_ENV !== 'test')
    app.use(logger('dev'))

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cors(corsOptions))
}
