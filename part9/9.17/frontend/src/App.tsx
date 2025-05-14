import type { DiaryEntry } from "./types";
import { useEffect, useState } from "react";
import { getAllDiaries, createDiary } from "./services/diaryService";
import Diary from "./components/Diary";

const App = () => {
  const [newDiary, setNewDiary] = useState('');
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