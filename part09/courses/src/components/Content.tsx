import type { CoursePart } from "../types";
import { assertNever } from "../utils";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((part) => (
        <CoursePart key={part.name} coursePart={part} />
      ))}
    </>
  );
};

interface CoursePartProps {
  coursePart: CoursePart;
}

const CoursePart = ({ coursePart }: CoursePartProps) => {
  const { name, exerciseCount } = coursePart;
  const partStyle = { padding: 5 };
  switch (coursePart.kind) {
    case "basic":
      return (
        <div style={partStyle}>
          <Heading name={name} exerciseCount={exerciseCount} />
          <Description description={coursePart.description} />
        </div>
      );
    case "group":
      return (
        <div style={partStyle}>
          <Heading name={name} exerciseCount={exerciseCount} />
          <div>project exercises {coursePart.groupProjectCount}</div>
        </div>
      );
    case "background":
      return (
        <div style={partStyle}>
          <Heading name={name} exerciseCount={exerciseCount} />
          <Description description={coursePart.description} />
          <div>{coursePart.backgroundMaterial}</div>
        </div>
      );
    case "special":
      return (
        <div style={partStyle}>
          <Heading name={name} exerciseCount={exerciseCount} />
          <Description description={coursePart.description} />
          <div>required skills: {coursePart.requirements}</div>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Content;

interface HeadingProps {
  name: string;
  exerciseCount: number;
}

const Heading = ({ name, exerciseCount }: HeadingProps) => {
  return (
    <div>
      <strong>
        {name} {exerciseCount}
      </strong>
    </div>
  );
};

interface DesciptionProps {
  description: string;
}

const Description = ({ description }: DesciptionProps) => {
  return (
    <div>
      <em>{description}</em>
    </div>
  );
};
