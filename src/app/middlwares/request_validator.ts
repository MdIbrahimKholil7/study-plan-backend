import { NextFunction, Request, Response } from "express";
import { AnySchema } from "joi";

type JoiSchema = AnySchema;

const requestValidator =
  (schema: JoiSchema) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
