type Rating = 1 | 2 | 3;

interface ResultObject {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: Rating,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyExerciseHours: number[], target: number) : ResultObject => {
    let periodLength = dailyExerciseHours.length;
    let trainingDays = 0;
    let totalHours = 0;
    let ratingDescription = '';
    let success = false;
    let rating: Rating = 3;


    dailyExerciseHours.forEach(element => {
        if(element > 0)
            trainingDays++;

        totalHours += element;
    });

    if((totalHours / periodLength) >= target * 0.9 && (totalHours / periodLength) <= target )
    {
        ratingDescription = 'good job';
        rating = 2;
    }
    else if((totalHours / periodLength) >= target){
        rating = 1;
        ratingDescription = 'awesome job!';
        success = true;
    }
    else{
        ratingDescription = 'bad job';
        rating = 3;
    }

    return{ 
        periodLength: periodLength,
        trainingDays,
        success: success,
        rating,
        ratingDescription: ratingDescription,
        target: target,
        average: totalHours / periodLength
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))