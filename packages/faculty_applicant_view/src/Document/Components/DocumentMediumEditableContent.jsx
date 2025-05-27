import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an document entity.
 *
 * This component renders a label "DocumentMediumContent" followed by a serialized representation of the `document` object
 * and any additional child content. It is designed to handle and display information about an document entity object.
 *
 * @component
 * @param {Object} props - The properties for the DocumentMediumContent component.
 * @param {Object} props.document - The object representing the document entity.
 * @param {string|number} props.document.id - The unique identifier for the document entity.
 * @param {string} props.document.name - The name or label of the document entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `document` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const documentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <DocumentMediumContent document={documentEntity}>
 *   <p>Additional information about the entity.</p>
 * </DocumentMediumContent>
 */
export const DocumentMediumEditableContent = ({document, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={document?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={document?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
