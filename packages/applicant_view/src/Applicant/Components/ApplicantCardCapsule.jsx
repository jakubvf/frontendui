import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { ApplicantLink } from "./ApplicantLink"

/**
 * A specialized card component that displays an `ApplicantLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `ApplicantLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `applicant` object.
 *
 * @component
 * @param {Object} props - The props for the ApplicantCardCapsule component.
 * @param {Object} props.applicant - The object representing the applicant entity.
 * @param {string|number} props.applicant.id - The unique identifier for the applicant entity.
 * @param {string} props.applicant.name - The display name for the applicant entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { ApplicantCardCapsule } from './ApplicantCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const applicantEntity = { id: 123, name: "Example Entity" };
 *
 * <ApplicantCardCapsule applicant={applicantEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </ApplicantCardCapsule>
 */
export const ApplicantCardCapsule = ({applicant, children, title=<><PersonFill /> <ApplicantLink applicant={applicant} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
