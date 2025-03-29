import { Input } from "@hrbolek/uoisfrontend-shared"

/**
 * A component that displays medium-level content for an faculty entity.
 *
 * This component renders a label "FacultyMediumContent" followed by a serialized representation of the `faculty` object
 * and any additional child content. It is designed to handle and display information about an faculty entity object.
 *
 * @component
 * @param {Object} props - The properties for the FacultyMediumContent component.
 * @param {Object} props.faculty - The object representing the faculty entity.
 * @param {string|number} props.faculty.id - The unique identifier for the faculty entity.
 * @param {string} props.faculty.name - The name or label of the faculty entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render after the serialized `faculty` object.
 *
 * @returns {JSX.Element} A JSX element displaying the entity's details and optional content.
 *
 * @example
 * // Example usage:
 * const facultyEntity = { id: 123, name: "Sample Entity" };
 * 
 * <FacultyMediumContent faculty={facultyEntity}>
 *   <p>Additional information about the entity.</p>
 * </FacultyMediumContent>
 */
export const FacultyMediumEditableContent = ({faculty, onChange=(e)=>null, onBlur=(e)=>null, children}) => {
    return (
        <>           
            <Input id={"name"} label={"Název"} className="form-control" defaultValue={faculty?.name|| "Název"} onChange={onChange} onBlur={onBlur} />
            <Input id={"name_en"} label={"Anglický název"} className="form-control" defaultValue={faculty?.name_en|| "Anglický název"} onChange={onChange} onBlur={onBlur} />
            {children}
        </>
    )
}
