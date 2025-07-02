import z from "zod/v4";

import { Weather, Visibility } from "./types";

export const NewEntrySchema = z.object({
  date: z.string().date(),
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  comment: z.optional(z.string().min(1)),
});

export const EntrySchema = NewEntrySchema.extend({
  id: z.number(),
});

export const EntryArraySchema = z.array(EntrySchema);
