/**
 * A component for displaying the `scalar` attribute of an document entity.
 *
 * This component checks if the `scalar` attribute exists on the `document` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the DocumentScalarAttribute component.
 * @param {Object} props.document - The object representing the document entity.
 * @param {*} [props.document.scalar] - The scalar attribute of the document entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const documentEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <DocumentScalarAttribute document={documentEntity} />
 */
export const DocumentScalarAttribute = ({document}) => {
    const {scalar} = document
    if (typeof scalar === 'undefined') return null
    return (
        <>
            Probably {'<ScalarMediumCard scalar=\{scalar\} />'} <br />
            {JSON.stringify(scalar)}
        </>
    )
}