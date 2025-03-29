import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { FacultyLink } from "./FacultyLink"

/**
 * A specialized card component that displays an `FacultyLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `FacultyLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `faculty` object.
 *
 * @component
 * @param {Object} props - The props for the FacultyCardCapsule component.
 * @param {Object} props.faculty - The object representing the faculty entity.
 * @param {string|number} props.faculty.id - The unique identifier for the faculty entity.
 * @param {string} props.faculty.name - The display name for the faculty entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { FacultyCardCapsule } from './FacultyCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const facultyEntity = { id: 123, name: "Example Entity" };
 *
 * <FacultyCardCapsule faculty={facultyEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </FacultyCardCapsule>
 */
export const FacultyCardCapsule = ({faculty, children, title=<><PersonFill /> <FacultyLink faculty={faculty} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
