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
const userSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2, // Ensures the email has at least two domain segments (e.g., example.com)
      tlds: { allow: false }, // Disallows top-level domains (e.g., .com, .net)
    })
    .required()
    .error(new Error("Invalid email address")),
  password: Joi.string()
    .min(6)
    .max(100)
    .required()
    .error(new Error("Password must be between 6 and 100 characters")),
  name: Joi.string().required().error(new Error("Name is required")),
}).options({ abortEarly: false });
const StudySessionValidator = {
  studySessionSchema,
  userSchema,
};

export default StudySessionValidator;
