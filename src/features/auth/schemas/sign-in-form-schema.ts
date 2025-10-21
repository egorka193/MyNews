import { z } from "zod";

export const signInFormSchema = z.object({
  username: z
    .string()
    .nonempty("Обязательное поле")
    .min(3, "Минимум 3 символа")
    .max(20, "Максимум 20 символов"),

  password: z
    .string()
    .nonempty("Обязательное поле")
    .min(6, "Минимум 6 символов")
    .max(32, "Максимум 32 символов"),
});

export type SignInFormData = z.infer<typeof signInFormSchema>;