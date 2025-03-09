import { z } from "zod";

export const CreateSchema = z
  .object({
    title: z.string().min(3, "the title must be at least 3 characters long"),
    location: z
      .string()
      .min(8, "the location must be at least 8 characters long"),
    description: z
      .string()
      .min(8, "the description must be at least 8 characters long"),
    img: z.any(),
  })
  .refine((data) => data.img instanceof File, {
    message: "the image must be a file",
    path: ["img"],
  });
