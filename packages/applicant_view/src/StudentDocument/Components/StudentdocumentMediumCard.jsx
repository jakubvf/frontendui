import { PersonFill } from "react-bootstrap-icons"
import { StudentdocumentLink } from "./StudentdocumentLink"
import { StudentdocumentCardCapsule } from "./StudentdocumentCardCapsule"
import { StudentdocumentMediumContent } from "./StudentdocumentMediumContent"

/**
 * A card component that displays detailed content for an studentdocument entity.
 *
 * This component combines `StudentdocumentCardCapsule` and `StudentdocumentMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the studentdocument entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the StudentdocumentMediumCard component.
 * @param {Object} props.studentdocument - The object representing the studentdocument entity.
 * @param {string|number} props.studentdocument.id - The unique identifier for the studentdocument entity.
 * @param {string} props.studentdocument.name - The name or label of the studentdocument entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const studentdocumentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudentdocumentMediumCard studentdocument={studentdocumentEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </StudentdocumentMediumCard>
 */
export const StudentdocumentMediumCard = ({studentdocument, children}) => {
    return (
        <StudentdocumentCardCapsule title={<><PersonFill /> <StudentdocumentLink studentdocument={studentdocument} /></>}>
            <StudentdocumentMediumContent studentdocument={studentdocument}>
                {children}
            </StudentdocumentMediumContent>
        </StudentdocumentCardCapsule>
    )
}
