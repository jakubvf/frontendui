import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * ApplicantChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `applicant` entity along with other props to all child elements.
 * This component is useful for injecting a common `applicant` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the ApplicantChildren component.
 * @param {any} props.applicant - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `applicant` entity.
 *
 * @example
 * // Example usage:
 * const applicantEntity = { id: 1, message: "No data available" };
 *
 * <ApplicantChildren applicant={applicantEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </ApplicantChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'applicant' prop with the specified entity.
 */
export const ApplicantChildren = ({applicant, children, ...props}) => <ChildWrapper applicant={applicant} children={children} {...props} />