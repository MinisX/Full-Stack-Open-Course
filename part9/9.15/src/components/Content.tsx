interface CoursePart {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
    return(
        <>
            {props.courseParts.map((part, key) => (
                <p key={key}>
                    {part.name} {part.exerciseCount}
                </p>
            ))}
        </>
    )
}

export default Content;