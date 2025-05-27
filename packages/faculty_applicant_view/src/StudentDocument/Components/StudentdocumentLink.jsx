import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const StudentdocumentURI = `/studentdocument/studentdocument/view/`;

/**
 * A React component that renders a `ProxyLink` to an "studentdocument" entity's view page.
 *
 * The target URL is dynamically constructed using the `studentdocument` object's `id`, and the link displays
 * the `studentdocument` object's `name` as its clickable content.
 *
 * @function StudentdocumentLink
 * @param {Object} props - The properties for the `StudentdocumentLink` component.
 * @param {Object} props.studentdocument - The object representing the "studentdocument" entity.
 * @param {string|number} props.studentdocument.id - The unique identifier for the "studentdocument" entity. Used to construct the target URL.
 * @param {string} props.studentdocument.name - The display name for the "studentdocument" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "studentdocument" entity's view page.
 *
 * @example
 * // Example usage with a sample studentdocument entity:
 * const studentdocumentEntity = { id: 123, name: "Example Studentdocument Entity" };
 * 
 * <StudentdocumentLink studentdocument={studentdocumentEntity} />
 * // Renders: <ProxyLink to="/studentdocument/studentdocument/view/123">Example Studentdocument Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/studentdocument/studentdocument/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const StudentdocumentLink = ({studentdocument, ...props}) => {
    return <ProxyLink to={StudentdocumentURI + studentdocument.id} {...props}>{studentdocument.name || studentdocument.id}</ProxyLink>
}