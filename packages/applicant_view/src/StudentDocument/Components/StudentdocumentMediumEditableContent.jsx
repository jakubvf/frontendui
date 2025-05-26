import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an studentdocument entity.
 *
 * This component renders a label "StudentdocumentMediumContent" followed by a serialized representation of the `studentdocument` object
 * and any additional child content. It is designed to handle and display information about an studentdocument entity object.
 *
 * @component
 * @param {Object} props - The properties for the StudentdocumentMediumContent component.
 * @param {Object} props.studentdocument - The object representing the studentdocument entity.
 * @param {string|number} props.studentdocument.id - The unique identifier for the studentdocument entity.
 * @param {string} props.studentdocument.name - The name or label of the studentdocument entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `studentdocument` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const studentdocumentEntity = { id: 123, name: "Sample Entity" };
 * 
 * <StudentdocumentMediumContent studentdocument={studentdocumentEntity}>
 *   <p>Additional information about the entity.</p>
 * </StudentdocumentMediumContent>
 */
export const StudentdocumentMediumEditableContent = ({studentdocument, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={studentdocument?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={studentdocument?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
