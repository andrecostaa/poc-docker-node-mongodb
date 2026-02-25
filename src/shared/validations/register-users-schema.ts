import { z } from "zod";

export const registerUsersSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").trim(),
  email: z.string().email("Email inválido").toLowerCase().trim(),
});

export type RegisterUsersSchema = z.infer<typeof registerUsersSchema>;
