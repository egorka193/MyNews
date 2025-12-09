import { z } from "zod";

export const registerFormSchema = z.object({
  username: z
    .string()
    .nonempty("Обязательное поле")
    .min(3, "Минимум 3 символа")
    .max(20, "Максимум 20 символов")
    .regex(/^[a-zA-Z0-9_]+$/, "Только латинские буквы, цифры и подчеркивание"),

  password: z
    .string()
    .nonempty("Обязательное поле")
    .min(8, "Минимум 8 символов")
    .max(32, "Максимум 32 символа")
    .regex(/(?=.*[a-z])/, "Должна быть хотя бы одна строчная буква (a-z)")
    .regex(/(?=.*[A-Z])/, "Должна быть хотя бы одна заглавная буква (A-Z)")
    .regex(/(?=.*\d)/, "Должна быть хотя бы одна цифра (0-9)"),

  confirmPassword: z.string().nonempty("Подтвердите пароль"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});