import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const FacultyURI = '/faculty/faculty/view/';

/**
 * A React component that renders a `ProxyLink` to an "faculty" entity's view page.
 *
 * The target URL is dynamically constructed using the `faculty` object's `id`, and the link displays
 * the `faculty` object's `name` as its clickable content.
 *
 * @function FacultyLink
 * @param {Object} props - The properties for the `FacultyLink` component.
 * @param {Object} props.faculty - The object representing the "faculty" entity.
 * @param {string|number} props.faculty.id - The unique identifier for the "faculty" entity. Used to construct the target URL.
 * @param {string} props.faculty.name - The display name for the "faculty" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "faculty" entity's view page.
 *
 * @example
 * // Example usage with a sample faculty entity:
 * const facultyEntity = { id: 123, name: "Example Faculty Entity" };
 * 
 * <FacultyLink faculty={facultyEntity} />
 * // Renders: <ProxyLink to="/faculty/faculty/view/123">Example Faculty Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/faculty/faculty/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const FacultyLink = ({faculty}) => {
    return <ProxyLink to={FacultyURI + faculty.id}>{faculty.name}</ProxyLink>
}