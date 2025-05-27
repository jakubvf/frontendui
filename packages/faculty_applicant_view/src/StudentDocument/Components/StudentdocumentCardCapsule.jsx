import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { StudentdocumentLink } from "./StudentdocumentLink"

/**
 * A specialized card component that displays an `StudentdocumentLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `StudentdocumentLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `studentdocument` object.
 *
 * @component
 * @param {Object} props - The props for the StudentdocumentCardCapsule component.
 * @param {Object} props.studentdocument - The object representing the studentdocument entity.
 * @param {string|number} props.studentdocument.id - The unique identifier for the studentdocument entity.
 * @param {string} props.studentdocument.name - The display name for the studentdocument entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { StudentdocumentCardCapsule } from './StudentdocumentCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const studentdocumentEntity = { id: 123, name: "Example Entity" };
 *
 * <StudentdocumentCardCapsule studentdocument={studentdocumentEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </StudentdocumentCardCapsule>
 */
export const StudentdocumentCardCapsule = ({studentdocument, children, title=<><PersonFill /> <StudentdocumentLink studentdocument={studentdocument} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
