import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import './infra/database/prisma.service'

import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.listen(3030, () => console.log("Server is running in port 3030"));