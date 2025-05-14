import type { DiaryEntry } from "../types";

const Diary = ({ diaryEntry }: { diaryEntry: DiaryEntry }) => {
  return (
    <p>
      <b>{diaryEntry.date}</b>
      <br/>
      visibility: {diaryEntry.visibility} 
       <br/>
      weather: {diaryEntry.weather}
    </p>
  );
};

export default Diary;
