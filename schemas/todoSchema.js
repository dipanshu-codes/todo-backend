const z = require("zod");

const createTodoSchema = z.object({
  userId: z.string(),
  title: z.string().min(4).max(50),
  description: z.string().min(10).optional(),
});

const updateTodoSchema = z.object({
  userId: z.string(),
  title: z.string().min(4).max(50).optional(),
  description: z.string().min(10).optional(),
  isComplete: z.boolean().optional(),
});

module.exports = {
  createTodoSchema,
  updateTodoSchema,
};
