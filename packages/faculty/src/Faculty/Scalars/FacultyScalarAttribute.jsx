/**
 * A component for displaying the `scalar` attribute of an faculty entity.
 *
 * This component checks if the `scalar` attribute exists on the `faculty` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the FacultyScalarAttribute component.
 * @param {Object} props.faculty - The object representing the faculty entity.
 * @param {*} [props.faculty.scalar] - The scalar attribute of the faculty entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const facultyEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <FacultyScalarAttribute faculty={facultyEntity} />
 */
export const FacultyScalarAttribute = ({faculty}) => {
    const {scalar} = faculty
    if (typeof scalar === 'undefined') return null
    return (
        <>
            Probably {'<ScalarMediumCard scalar=\{scalar\} />'} <br />
            {JSON.stringify(scalar)}
        </>
    )
}