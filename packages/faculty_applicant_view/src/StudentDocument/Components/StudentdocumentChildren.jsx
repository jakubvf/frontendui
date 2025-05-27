import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * StudentdocumentChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `studentdocument` entity along with other props to all child elements.
 * This component is useful for injecting a common `studentdocument` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the StudentdocumentChildren component.
 * @param {any} props.studentdocument - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `studentdocument` entity.
 *
 * @example
 * // Example usage:
 * const studentdocumentEntity = { id: 1, message: "No data available" };
 *
 * <StudentdocumentChildren studentdocument={studentdocumentEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </StudentdocumentChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'studentdocument' prop with the specified entity.
 */
export const StudentdocumentChildren = ({studentdocument, children, ...props}) => <ChildWrapper studentdocument={studentdocument} children={children} {...props} />