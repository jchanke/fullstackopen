export type HeightInCm = number;
export type WeightInKg = number;
export type BMICategory =
  | "Underweight"
  | "Normal range"
  | "Overweight"
  | "Obese";

interface HeightAndWeight {
  height: HeightInCm;
  weight: WeightInKg;
}

export interface BMIResults {
  weight: WeightInKg;
  height: HeightInCm;
  bmi: BMICategory;
}

const UNDERWEIGHT = 18.5;
const NORMAL_RANGE = 25.0;
const OVERWEIGHT = 30.0;

export const calculateBmi = (
  height: HeightInCm,
  weight: WeightInKg
): BMIResults => {
  const bmi: number = weight / (height / 100.0) ** 2;
  const category: BMICategory =
    bmi < UNDERWEIGHT
      ? "Underweight"
      : bmi < NORMAL_RANGE
      ? "Normal range"
      : bmi < OVERWEIGHT
      ? "Overweight"
      : "Obese";
  return { weight, height, bmi: category };
};

const parseArguments = (argv: string[]): HeightAndWeight => {
  const usage = "Usage: npm calculateBmi <heightInCm> <weightInKg>";
  if (argv.length !== 4) {
    console.log(`expected 4 arguments, ${argv.length} given`);
    console.log();
    console.log(usage);
    throw new Error(`expected 4 arguments, ${argv.length} given`);
  }
  const height: HeightInCm = Number(argv[2]);
  const weight: WeightInKg = Number(argv[3]);
  if (isNaN(height) || isNaN(weight)) {
    console.log("expected both arguments to be of type 'number'");
    console.log(`instead, got: ${argv[2]} and ${argv[3]}`);
    console.log();
    console.log(usage);
    throw new Error("expected both arguments to be of type 'number'");
  }
  return { height, weight };
};

if (require.main === module) {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
}
