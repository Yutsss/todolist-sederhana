import "../config/envConfig";
import express from 'express';
import publicRouter from "../router/public";
import privateRouter from "../router/private";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(privateRouter)