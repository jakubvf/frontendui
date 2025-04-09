import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { ApplicantCardCapsule } from "./ApplicantCardCapsule"
import { ApplicantMediumCard } from "./ApplicantMediumCard"

/**
 * A large card component for displaying detailed content and layout for an applicant entity.
 *
 * This component wraps an `ApplicantCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `ApplicantMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the ApplicantLargeCard component.
 * @param {Object} props.applicant - The object representing the applicant entity.
 * @param {string|number} props.applicant.id - The unique identifier for the applicant entity.
 * @param {string} props.applicant.name - The name or label of the applicant entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const applicantEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ApplicantLargeCard applicant={applicantEntity}>
 *   <p>Additional content for the middle column.</p>
 * </ApplicantLargeCard>
 */
export const ApplicantLargeCard = ({applicant, children}) => {
    return (
        <ApplicantCardCapsule applicant={applicant} >
            <Row>
                <LeftColumn>
                    <ApplicantMediumCard applicant={applicant}/>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </ApplicantCardCapsule>
    )
}
