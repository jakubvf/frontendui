import { ChildWrapper } from "@hrbolek/uoisfrontend-shared";

/**
 * DocumentChildren Component
 *
 * A utility React component that wraps its children with the `ChildWrapper` component, 
 * passing down an `document` entity along with other props to all child elements.
 * This component is useful for injecting a common `document` entity into multiple children 
 * while preserving their existing functionality.
 *
 * @component
 * @param {Object} props - The props for the DocumentChildren component.
 * @param {any} props.document - An entity (e.g., object, string, or other data) to be passed to the children.
 * @param {React.ReactNode} props.children - The children elements to be wrapped and enhanced.
 * @param {...any} props - Additional props to be passed to each child element.
 *
 * @returns {JSX.Element} A `ChildWrapper` component containing the children with the injected `document` entity.
 *
 * @example
 * // Example usage:
 * const documentEntity = { id: 1, message: "No data available" };
 *
 * <DocumentChildren document={documentEntity}>
 *     <CustomMessage />
 *     <CustomIcon />
 * </DocumentChildren>
 *
 * // Result: Both <CustomMessage /> and <CustomIcon /> receive the 'document' prop with the specified entity.
 */
export const DocumentChildren = ({document, children, ...props}) => <ChildWrapper document={document} children={children} {...props} />