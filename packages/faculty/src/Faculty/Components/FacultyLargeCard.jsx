import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { FacultyCardCapsule } from "./FacultyCardCapsule"
import { FacultyMediumCard } from "./FacultyMediumCard"

/**
 * A large card component for displaying detailed content and layout for an faculty entity.
 *
 * This component wraps an `FacultyCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `FacultyMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the FacultyLargeCard component.
 * @param {Object} props.faculty - The object representing the faculty entity.
 * @param {string|number} props.faculty.id - The unique identifier for the faculty entity.
 * @param {string} props.faculty.name - The name or label of the faculty entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const facultyEntity = { id: 123, name: "Sample Entity" };
 * 
 * <FacultyLargeCard faculty={facultyEntity}>
 *   <p>Additional content for the middle column.</p>
 * </FacultyLargeCard>
 */
export const FacultyLargeCard = ({faculty, children}) => {
    return (
        <FacultyCardCapsule faculty={faculty} >
            <Row>
                <LeftColumn>
                    <FacultyMediumCard faculty={faculty}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </FacultyCardCapsule>
    )
}
