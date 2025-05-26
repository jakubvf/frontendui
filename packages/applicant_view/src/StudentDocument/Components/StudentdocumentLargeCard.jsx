import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { StudentdocumentCardCapsule } from "./StudentdocumentCardCapsule"
import { StudentdocumentMediumCard } from "./StudentdocumentMediumCard"

/**
 * A large card component for displaying detailed content and layout for an studentdocument entity.
 *
 * This component wraps an `StudentdocumentCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `StudentdocumentMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the StudentdocumentLargeCard component.
 * @param {Object} props.studentdocument - The object representing the studentdocument entity.
 * @param {string|number} props.studentdocument.id - The unique identifier for the studentdocument entity.
 * @param {string} props.studentdocument.name - The name or label of the studentdocument entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const studentdocumentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudentdocumentLargeCard studentdocument={studentdocumentEntity}>
 *   <p>Additional content for the middle column.</p>
 * </StudentdocumentLargeCard>
 */
export const StudentdocumentLargeCard = ({studentdocument, children}) => {
    return (
        <StudentdocumentCardCapsule studentdocument={studentdocument} >
            <Row>
                <LeftColumn>
                    <StudentdocumentMediumCard studentdocument={studentdocument}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </StudentdocumentCardCapsule>
    )
}
