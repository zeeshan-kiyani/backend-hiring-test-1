import express, { Express, Request, Response } from 'express';
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser');
const makeCall = require('./app/routes/makeCall')
export const app: Express = express();

//middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/makeCall', makeCall);

//start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
