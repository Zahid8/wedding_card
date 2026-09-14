import { z } from "zod";

export const rsvpSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal("")),
  attending: z.enum(["accept", "decline"]),
  guests: z.enum(["1", "2", "3", "4", "5+"]),
  dietary: z.string().trim().max(500).optional().or(z.literal("")),
  hp: z.string().max(0).optional().or(z.literal("")),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;
