import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
const app: Application = express();
import cors from "cors";
import morgan from "morgan";
import httpStatus from "http-status";
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  (
    error: { message: any },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});
export default app;
