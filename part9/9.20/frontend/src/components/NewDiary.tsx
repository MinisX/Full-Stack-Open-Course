import { useState } from "react"
import type { DiaryEntry, Visibility, Weather } from "../types";
import { createDiary } from "../services/diaryService";
import axios from "axios";

const NewDiary = ({ setDiaries, diaries, setError }: { 
    setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>; 
    diaries: DiaryEntry[]; 
    setError: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const [newDate, setNewDate] = useState('');
    const [newVisibility, setNewVisibility] = useState<Visibility>();
    const [newWeather, setNewWeather] = useState<Weather>();
    const [newComment, setNewComment] = useState('');

    const diaryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (!newDate || !newWeather || !newVisibility || !newComment) {
            alert("All fields are required!");
            return;
        }

        const diaryToAdd = {
            date: newDate,
            weather: newWeather,
            visibility: newVisibility,
            comment: newComment
        }

        createDiary(diaryToAdd)
        .then(data => {
            setDiaries(diaries.concat(data))
        })
        .catch((error) => {
            if (axios.isAxiosError(error)) {
                const message = typeof error.response?.data === 'string'
                ? error.response.data
                : error.message;

                console.log(message);
                setError(message);
            } else {
                setError('An unknown error occurred');
            }
        });
    }
    return (
        <div>
            <form onSubmit={diaryCreation}>
                date
                <input 
                type="date" 
                value={newDate} 
                onChange={(event) => setNewDate(event.target.value)} 
                />
                <br />
                visibility
                <input 
                type="text" 
                value={newVisibility} 
                onChange={(event) => setNewVisibility(event.target.value as Visibility)} 
                />
                <br />
                weather
                <input 
                type="text" 
                value={newWeather} 
                onChange={(event) => setNewWeather(event.target.value as Weather)} 
                />
                <br />
                comment
                <input 
                type="text" 
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)} 
                />
                <br />
                <button type="submit">add</button>
            </form>
        </div>
    )
}

export default NewDiary;