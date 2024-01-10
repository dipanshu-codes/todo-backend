const z = require("zod");

const createUserSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(5).max(10)
});

const updateUserSchema = z.object({
  userId: z.string(),
  fullName: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(5).max(10).optional()
});

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  loginUserSchema
}
