const zod = require ("zod");
const z = zod.z

module.exports = {
  
  registerSchema : z.object({
    username: z.string({
      required_error: "Username is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Email is not valid",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, {
        message: "Password must be at least 6 characters",
      }),
  }),


  loginSchema : z.object({
    username: z.string(),
    password: z.string().min(6),
  }),
  
}



