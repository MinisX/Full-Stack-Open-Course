import express from 'express';
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!req.query.height || !req.query.weight || isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if(!daily_exercises || !target){
    res.status(400).json({error: 'parameters missing'});
    return;
  }

  if (!Array.isArray(daily_exercises) || daily_exercises.some((hours) => isNaN(Number(hours))) || isNaN(Number(target))) {
    res.status(400).json({error: "malformatted parameters"});
    return;
  }

  const dailyExerciseNumbers: number[] = daily_exercises.map(d => Number(d));

  const result = calculateExercises(dailyExerciseNumbers, Number(target));
  res.json({ result });
  return;
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});