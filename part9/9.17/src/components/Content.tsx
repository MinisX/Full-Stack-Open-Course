import type { JSX } from "react";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase{
    description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

interface PartProps {
  coursePart: CoursePart;
}

interface ContentProps {
  courseParts: CoursePart[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: PartProps) => {
  const {coursePart} = props;
  let additionalInfo: JSX.Element | null = null;

  switch (coursePart.kind) {
    case "basic":
      additionalInfo = <p>Description: {coursePart.description}</p>;
      break;
    case "group":
      additionalInfo = <p>Group Projects: {coursePart.groupProjectCount}</p>;
      break;
    case "background":
      additionalInfo = (
        <>
          <p>Description: {coursePart.description}</p>
          <p>Background Material: {coursePart.backgroundMaterial}</p>
        </>
      );
      break;
    default:
        return assertNever(coursePart);
  }

  return (
    <div>
      <h3>{coursePart.name}</h3>
      <p>Exercises: {coursePart.exerciseCount}</p>
      {additionalInfo}
    </div>
  );
};

const Content = (props: ContentProps) => {
    return(
        <>
            {props.courseParts.map((part, key) => (
                <Part key={key} coursePart={part}/>
            ))}
        </>
    )
}

export default Content;