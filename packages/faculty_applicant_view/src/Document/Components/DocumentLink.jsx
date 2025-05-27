import { ProxyLink } from "@hrbolek/uoisfrontend-shared"

export const DocumentURI = `/document/document/view/`;

/**
 * A React component that renders a `ProxyLink` to an "document" entity's view page.
 *
 * The target URL is dynamically constructed using the `document` object's `id`, and the link displays
 * the `document` object's `name` as its clickable content.
 *
 * @function DocumentLink
 * @param {Object} props - The properties for the `DocumentLink` component.
 * @param {Object} props.document - The object representing the "document" entity.
 * @param {string|number} props.document.id - The unique identifier for the "document" entity. Used to construct the target URL.
 * @param {string} props.document.name - The display name for the "document" entity. Used as the link text.
 *
 * @returns {JSX.Element} A `ProxyLink` component linking to the specified "document" entity's view page.
 *
 * @example
 * // Example usage with a sample document entity:
 * const documentEntity = { id: 123, name: "Example Document Entity" };
 * 
 * <DocumentLink document={documentEntity} />
 * // Renders: <ProxyLink to="/document/document/view/123">Example Document Entity</ProxyLink>
 *
 * @remarks
 * - This component utilizes `ProxyLink` to ensure consistent link behavior, including parameter preservation and conditional reloads.
 * - The URL format `/document/document/view/:id` must be supported by the application routing.
 *
 * @see ProxyLink - The base component used for rendering the link.
 */
export const DocumentLink = ({document, ...props}) => {
    return <ProxyLink to={DocumentURI + document.id} {...props}>{document.name}</ProxyLink>
}