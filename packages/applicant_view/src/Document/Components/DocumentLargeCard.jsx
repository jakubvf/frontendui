import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { DocumentCardCapsule } from "./DocumentCardCapsule"
import { DocumentMediumCard } from "./DocumentMediumCard"

/**
 * A large card component for displaying detailed content and layout for an document entity.
 *
 * This component wraps an `DocumentCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `DocumentMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the DocumentLargeCard component.
 * @param {Object} props.document - The object representing the document entity.
 * @param {string|number} props.document.id - The unique identifier for the document entity.
 * @param {string} props.document.name - The name or label of the document entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const documentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <DocumentLargeCard document={documentEntity}>
 *   <p>Additional content for the middle column.</p>
 * </DocumentLargeCard>
 */
export const DocumentLargeCard = ({document, children}) => {
    return (
        <DocumentCardCapsule document={document} >
            <Row>
                <LeftColumn>
                    <DocumentMediumCard document={document}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </DocumentCardCapsule>
    )
}
