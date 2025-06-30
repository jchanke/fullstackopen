import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useField, useSelect } from "../hooks";
import diaryService from "../services/diaryService";

import { Visibility, Weather, type NewDiaryEntry } from "@backend/src/types";
import { NewEntrySchema } from "@backend/src/utils";
import { ZodError } from "zod/v4";
import { useNotification } from "../contexts/NotificationContext";
import Notification from "../components/Notification";

const DiaryForm = () => {
  const notification = useNotification()!; // never undefined
  const date = useField({
    name: "date",
    type: "date",
    initial: new Date().toLocaleDateString("en-CA"), // YYYY-MM-DD
  });

  const weather = useSelect({
    name: "weather",
    options: Object.values(Weather).map((w) => w.toString()),
  });

  const visibility = useSelect({
    name: "visibility",
    options: Object.values(Visibility).map((w) => w.toString()),
  });

  const comment = useField({ name: "comment" });

  const client = useQueryClient();

  const createNewEntry = useMutation({
    mutationFn: async () => {
      const newDiaryEntry: NewDiaryEntry = NewEntrySchema.parse({
        date: date.value,
        visibility: visibility.value,
        weather: weather.value,
        ...(comment.value === "" ? {} : { comment: comment.value }),
      });
      return await diaryService.create(newDiaryEntry);
    },
    onError: (error: unknown) => {
      if (error instanceof ZodError) {
        notification.error(
          error.issues.map((z) => `${z.path}: ${z.message}`).join(" • ")
        );
      } else {
        notification.error(String(error));
      }
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["diaries"] });
      comment.setValue("");
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createNewEntry.mutate();
  };

  return (
    <div>
      <h3>add entry</h3>
      <Notification />
      <form onSubmit={handleSubmit}>
        {date.input}
        {weather.input}
        {visibility.input}
        {comment.input}
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;
