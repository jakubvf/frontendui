import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * FacultyChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `faculty` entity along with other props to all child elements.
 * This component is useful for injecting a common `faculty` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the FacultyChildren component.
 * @param {any} props.faculty - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `faculty` entity.
 *
 * @example
 * // Example usage:
 * const facultyEntity = { id: 1, message: "No data available" };
 *
 * <FacultyChildren faculty={facultyEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </FacultyChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'faculty' prop with the specified entity.
 */
export const FacultyChildren = ({faculty, children, ...props}) => <ChildWrapper faculty={faculty} children={children} {...props} />