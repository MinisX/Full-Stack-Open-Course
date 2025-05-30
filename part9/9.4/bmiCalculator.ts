interface BmiValues {
    heightCm: number;
    weightKg: number;
}

const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            heightCm: Number(args[2]),
            weightKg: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBmi = ( heightCm: number, weightKg: number) : string => {
    const heightM = heightCm / 100
    const bmi = (weightKg / ( heightCm * heightM )) * 100
    
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal range';
    } else if (bmi >= 25 && bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
}

try {
    const { heightCm, weightKg } = parseArguments(process.argv);
    console.log(calculateBmi(heightCm, weightKg));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    // here we can not use error.message

    if (error instanceof Error) {
        // the type is narrowed and we can refer to error.message

        errorMessage += error.message;
    }
    // here we can not use error.message

    console.log(errorMessage);
}