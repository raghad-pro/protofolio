import { z } from "zod";

/**
 * Shared by the form (client) and the API route (server). Error messages are
 * translation keys under `contact.errors.*`, resolved in the UI.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "nameMin" }).max(80, { message: "nameMax" }),
  email: z.string().trim().email({ message: "emailInvalid" }),
  message: z.string().trim().min(10, { message: "messageMin" }).max(2000, { message: "messageMax" }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrorKey = "nameMin" | "nameMax" | "emailInvalid" | "messageMin" | "messageMax";
