/**
 * A component for displaying the `scalar` attribute of an applicant entity.
 *
 * This component checks if the `scalar` attribute exists on the `applicant` object. If `scalar` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it displays a placeholder message
 * and a JSON representation of the `scalar` attribute.
 *
 * @component
 * @param {Object} props - The props for the ApplicantScalarAttribute component.
 * @param {Object} props.applicant - The object representing the applicant entity.
 * @param {*} [props.applicant.scalar] - The scalar attribute of the applicant entity to be displayed, if defined.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `scalar` attribute or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const applicantEntity = { scalar: { id: 1, name: "Sample Scalar" } };
 *
 * <ApplicantScalarAttribute applicant={applicantEntity} />
 */
export const ApplicantScalarAttribute = ({applicant}) => {
    const {scalar} = applicant
    if (typeof scalar === 'undefined') return null
    return (
        <>
            Probably {'<ScalarMediumCard scalar=\{scalar\} />'} <br />
            {JSON.stringify(scalar)}
        </>
    )
}