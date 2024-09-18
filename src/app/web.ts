import "../config/envConfig";
import express from 'express';
import publicRouter from "../router/public";

export const web = express();
web.use(express.json());
web.use(publicRouter);