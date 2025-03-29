import { PersonFill } from "react-bootstrap-icons"
import { FacultyLink } from "./FacultyLink"
import { FacultyCardCapsule } from "./FacultyCardCapsule"
import { FacultyMediumContent } from "./FacultyMediumContent"

/**
 * A card component that displays detailed content for an faculty entity.
 *
 * This component combines `FacultyCardCapsule` and `FacultyMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the faculty entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the FacultyMediumCard component.
 * @param {Object} props.faculty - The object representing the faculty entity.
 * @param {string|number} props.faculty.id - The unique identifier for the faculty entity.
 * @param {string} props.faculty.name - The name or label of the faculty entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const facultyEntity = { id: 123, name: "Sample Entity" };
 * 
 * <FacultyMediumCard faculty={facultyEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </FacultyMediumCard>
 */
export const FacultyMediumCard = ({faculty, children}) => {
    return (
        <FacultyCardCapsule title={<><PersonFill /> <FacultyLink faculty={faculty} /></>}>
            <FacultyMediumContent faculty={faculty}>
                {children}
            </FacultyMediumContent>
        </FacultyCardCapsule>
    )
}
