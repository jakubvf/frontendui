import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const ApplicantURI = '/applicant/applicant/view/';

/**
 * A React component that renders a `ProxyLink` to an "applicant" entity's view page.
 *
 * The target URL is dynamically constructed using the `applicant` object's `id`, and the link displays
 * the `applicant` object's `name` as its clickable content.
 *
 * @function ApplicantLink
 * @param {Object} props - The properties for the `ApplicantLink` component.
 * @param {Object} props.applicant - The object representing the "applicant" entity.
 * @param {string|number} props.applicant.id - The unique identifier for the "applicant" entity. Used to construct the target URL.
 * @param {string} props.applicant.name - The display name for the "applicant" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "applicant" entity's view page.
 *
 * @example
 * // Example usage with a sample applicant entity:
 * const applicantEntity = { id: 123, name: "Example Applicant Entity" };
 *
 * <ApplicantLink applicant={applicantEntity} />
 * // Renders: <ProxyLink to="/applicant/applicant/view/123">Example Applicant Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/applicant/applicant/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const ApplicantLink = ({applicant}) => {
    return <ProxyLink to={ApplicantURI + applicant.id}>{applicant.student.name}</ProxyLink>
}
