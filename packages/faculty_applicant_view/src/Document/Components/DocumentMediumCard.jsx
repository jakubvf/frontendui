import { PersonFill } from "react-bootstrap-icons"
import { DocumentLink } from "./DocumentLink"
import { DocumentCardCapsule } from "./DocumentCardCapsule"
import { DocumentMediumContent } from "./DocumentMediumContent"

/**
 * A card component that displays detailed content for an document entity.
 *
 * This component combines `DocumentCardCapsule` and `DocumentMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the document entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the DocumentMediumCard component.
 * @param {Object} props.document - The object representing the document entity.
 * @param {string|number} props.document.id - The unique identifier for the document entity.
 * @param {string} props.document.name - The name or label of the document entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const documentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <DocumentMediumCard document={documentEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </DocumentMediumCard>
 */
export const DocumentMediumCard = ({document, children}) => {
    return (
        <DocumentCardCapsule title={<><PersonFill /> <DocumentLink document={document} /></>}>
            <DocumentMediumContent document={document}>
                {children}
            </DocumentMediumContent>
        </DocumentCardCapsule>
    )
}
