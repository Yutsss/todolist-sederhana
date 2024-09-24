import "../config/envConfig";
import express from 'express';
import publicRouter from "../router/public";
import privateRouter from "../router/private";
import cors from "cors";

export const web = express();
web.use(express.json());
web.use(cors());
web.use("/api", publicRouter);
web.use("/api", privateRouter);