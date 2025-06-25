interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseHours {
  dailyExerciseHours: number[];
  target: number;
}

export const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): Result => {
  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter((h) => h > 0).length;
  const totalHours = dailyExerciseHours.reduce((acc, h) => acc + h, 0);
  const average = totalHours / periodLength;
  const [rating, ratingDescription] =
    average >= target
      ? [3, "target met!"]
      : average >= target / 2.0
      ? [2, "not too bad but could be better"]
      : [1, "bad"];
  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (argv: string[]): ExerciseHours => {
  const usage =
    "Usage: npm calculateExercises <target> [daily hours separated by ' ']";
  if (argv.length < 4) {
    console.log(`expected >= 2 arguments, ${argv.length - 2} given`);
    console.log();
    console.log(usage);
    throw new Error(`expected >= 2 arguments, ${argv.length - 2} given`);
  }
  const target = Number(argv[2]);
  const dailyExerciseHours = argv.slice(3).map(Number);

  if (isNaN(target) || dailyExerciseHours.some(isNaN)) {
    console.log("expected all arguments to be of type 'number'");
    console.log(`instead, got: ${argv[2]} and ${argv.slice(3)}`);
    console.log();
    console.log(usage);
    throw new Error("expected all arguments to be of type 'number'");
  }
  return { target, dailyExerciseHours };
};

if (require.main === module) {
  const { target, dailyExerciseHours } = parseArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
}
