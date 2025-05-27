import { CardCapsule } from "@hrbolek/uoisfrontend-shared"
import { PersonFill } from "react-bootstrap-icons"
import { DocumentLink } from "./DocumentLink"

/**
 * A specialized card component that displays an `DocumentLink` as its title and encapsulates additional content.
 *
 * This component extends the `CardCapsule` component by using a combination of a `PersonFill` icon and 
 * an `DocumentLink` component in the card's header. The `children` prop is used to render any content 
 * inside the card body. It is designed for use with entities represented by the `document` object.
 *
 * @component
 * @param {Object} props - The props for the DocumentCardCapsule component.
 * @param {Object} props.document - The object representing the document entity.
 * @param {string|number} props.document.id - The unique identifier for the document entity.
 * @param {string} props.document.name - The display name for the document entity.
 * @param {React.ReactNode} [props.children=null] - The content to render inside the card's body.
 *
 * @returns {JSX.Element} The rendered card component with a dynamic title and body content.
 *
 * @example
 * // Example usage:
 * import { DocumentCardCapsule } from './DocumentCardCapsule';
 * import { Button } from 'react-bootstrap';
 *
 * const documentEntity = { id: 123, name: "Example Entity" };
 *
 * <DocumentCardCapsule document={documentEntity}>
 *   <Button variant="primary">Click Me</Button>
 * </DocumentCardCapsule>
 */
export const DocumentCardCapsule = ({document, children, title=<><PersonFill /> <DocumentLink document={document} /></>}) => {
    return (
        <CardCapsule title={title}>
            {children}
        </CardCapsule>
    )
}
