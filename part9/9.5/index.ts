import express from 'express';
const app = express();
import bmiCalculator from './bmiCalculator';

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
    bmi: bmiCalculator(height, weight),
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});