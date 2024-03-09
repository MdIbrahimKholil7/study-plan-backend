import { NextFunction, Request, Response } from "express";
import { AnySchema } from "joi";

// Define a custom interface that extends the Request interface
interface CustomRequest extends Request {
  validatedData?: {
    body: any;
    query: any;
    params: any;
    cookies: any;
  };
}

type JoiSchema = AnySchema;

const requestValidator =
  (schema: JoiSchema) =>
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { body, query, params, cookies } = req;
      await schema.validateAsync({
        ...body,
      });

      next();
    } catch (error) {
      next(error);
    }
  };

export default requestValidator;
