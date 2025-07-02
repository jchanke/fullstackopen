import { useQuery } from "@tanstack/react-query";
import diaryService from "../services/diaryService";

import type { DiaryEntry } from "@backend/src/types";

interface EntryProps {
  entry: DiaryEntry;
}

const Entry = ({ entry }: EntryProps) => {
  const { date, visibility, weather, comment } = entry;
  return (
    <div>
      <h4>{date}</h4>
      <div>visibility: {visibility}</div>
      <div>weather: {weather}</div>
      {comment && <div>comment: {comment}</div>}
    </div>
  );
};

const Content = () => {
  const result = useQuery({
    queryKey: ["diaries"],
    queryFn: diaryService.getAll,
  });

  if (result.isPending) return "loading diaries...";
  if (result.isError) return JSON.stringify(result.error);

  const diaries = result.data;

  return (
    <div>
      <h3>diary entries</h3>
      {diaries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default Content;
