import type { DiaryEntry } from "./types";
import { useEffect, useState } from "react";
import { getAllDiaries } from "./services/diaryService";
import Diary from "./components/Diary";
import NewDiary from "./components/NewDiary";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([
    {  id: 1, date: 'testing', weather: 'sunny', visibility: 'good', comment: 'testing'}
  ]);


  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data);
    })
  }, [])
  
  return (
    <div>
      <h1>Add new entry</h1>
      <NewDiary setDiaries={setDiaries} diaries={diaries} />
      <h1>
        Diary entries
      </h1>
      {diaries.map((diary, key) => (
        <Diary key={key} diaryEntry={diary} />
      ))}
      
    </div>
  );
};

export default App;