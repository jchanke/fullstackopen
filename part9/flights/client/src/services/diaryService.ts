import axios from "axios";

import { EntryArraySchema, EntrySchema } from "@backend/src/utils";
import type { DiaryEntry, NewDiaryEntry } from "@backend/src/types";

const baseUrl = "/api/diaries";

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get(baseUrl);
  return EntryArraySchema.parse(response.data);
};

const create = async (newDiaryEntry: NewDiaryEntry): Promise<DiaryEntry> => {
  const response = await axios.post(baseUrl, newDiaryEntry);
  return EntrySchema.parse(response.data);
};

export default { getAll, create };
