import { PersonFill } from "react-bootstrap-icons"
import { ApplicantLink } from "./ApplicantLink"
import { ApplicantCardCapsule } from "./ApplicantCardCapsule"
import { ApplicantMediumContent } from "./ApplicantMediumContent"

/**
 * A card component that displays detailed content for an applicant entity.
 *
 * This component combines `ApplicantCardCapsule` and `ApplicantMediumContent` to create a card layout
 * with a title and medium-level content. The title includes a `PersonFill` icon and a link to
 * the applicant entity's details, while the body displays serialized details of the entity along
 * with any additional children passed to the component.
 *
 * @component
 * @param {Object} props - The properties for the ApplicantMediumCard component.
 * @param {Object} props.applicant - The object representing the applicant entity.
 * @param {string|number} props.applicant.id - The unique identifier for the applicant entity.
 * @param {string} props.applicant.name - The name or label of the applicant entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render inside the card body.
 *
 * @returns {JSX.Element} A JSX element combining a card with a title and detailed content.
 *
 * @example
 * // Example usage:
 * const applicantEntity = { id: 123, name: "Sample Entity" };
 * 
 * <ApplicantMediumCard applicant={applicantEntity}>
 *   <p>Additional details or actions for the entity.</p>
 * </ApplicantMediumCard>
 */
export const ApplicantMediumCard = ({applicant, children}) => {
    return (
        <ApplicantCardCapsule title={<><PersonFill /> <ApplicantLink applicant={applicant} /></>}>
            <ApplicantMediumContent applicant={applicant}>
                {children}
            </ApplicantMediumContent>
        </ApplicantCardCapsule>
    )
}
