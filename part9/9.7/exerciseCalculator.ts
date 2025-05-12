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

interface CalculateValues {
    daily_exercises: number[],
    target: number
}

const parseArguments2 = (args: string[]): CalculateValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = Number(args[2]);
    const dailyHours = args.slice(3).map((val) => {
        const num = Number(val);
        if (isNaN(num)) {
        throw new Error('Provided values were not all numbers!');
        }
        return num;
  });

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            target,
            daily_exercises: dailyHours
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

export const calculateExercises = (dailyExerciseHours: number[], target: number) : ResultObject => {
    const periodLength = dailyExerciseHours.length;
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
    };
};

try {
    const { target, daily_exercises } = parseArguments2(process.argv);
    console.log(calculateExercises(daily_exercises, target));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    // here we can not use error.message

    if (error instanceof Error) {
        // the type is narrowed and we can refer to error.message

        errorMessage += error.message;
    }
    // here we can not use error.message

    console.log(errorMessage);
}