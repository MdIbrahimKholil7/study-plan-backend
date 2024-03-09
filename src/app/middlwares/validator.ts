import Joi from "joi";

const studySessionSchema = Joi.object({
  subject: Joi.string()
    .required()
    .error(new Error("Study session must have a subject")),
  user: Joi.string()
    .required()
    .error(new Error("A user must be connected with study session")),
  duration: Joi.number()
    .min(1)
    .required()
    .error(new Error("Study session must have a duration of at least 1")),
  priority: Joi.number()
    .valid(1, 2, 3)
    .default(1)
    .required()
    .error(new Error("Priority must be 1, 2, or 3")),
});

const StudySessionValidator = {
  studySessionSchema,
};

export default StudySessionValidator;
