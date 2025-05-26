import { createAsyncGraphQLAction, processVectorAttributeFromGraphQLResult } from "@hrbolek/uoisfrontend-gql-shared"
import { InfiniteScroll } from "@hrbolek/uoisfrontend-shared"

/**
 * A component for displaying the `vectors` attribute of an studentdocument entity.
 *
 * This component checks if the `vectors` attribute exists on the `studentdocument` object. If `vectors` is undefined,
 * the component returns `null` and renders nothing. Otherwise, it maps over the `vectors` array and
 * displays a placeholder message and a JSON representation for each item in the `vectors`.
 *
 * @component
 * @param {Object} props - The props for the StudentdocumentVectorsAttribute component.
 * @param {Object} props.studentdocument - The object representing the studentdocument entity.
 * @param {Array} [props.studentdocument.vectors] - An array of vectors items associated with the studentdocument entity.
 * Each item is expected to have a unique `id` property.
 *
 * @returns {JSX.Element|null} A JSX element displaying the `vectors` items or `null` if the attribute is undefined.
 *
 * @example
 * // Example usage:
 * const studentdocumentEntity = { 
 *   vectors: [
 *     { id: 1, name: "Vector Item 1" }, 
 *     { id: 2, name: "Vector Item 2" }
 *   ] 
 * };
 *
 * <StudentdocumentVectorsAttribute studentdocument={studentdocumentEntity} />
 */
export const StudentdocumentVectorsAttribute = ({studentdocument}) => {
    const { vectors } = studentdocument
    if (typeof vectors === 'undefined') return null
    return (
        <>
            {vectors.map(
                vector => <div id={vector.id} key={vector.id}>
                    Probably {'<VectorMediumCard vector=\{vector\} />'} <br />
                    {JSON.stringify(vector)}
                </div>
            )}
        </>
    )
}

const StudentdocumentVectorsAttributeQuery = `
query StudentdocumentQueryRead($id: id, $where: VectorInputFilter, $skip: Int, $limit: Int) {
    result: studentdocumentById(id: $id) {
        __typename
        id
        vectors(skip: $skip, limit: $limit, where: $where) {
            __typename
            id
        }
    }
}
`

const StudentdocumentVectorsAttributeAsyncAction = createAsyncGraphQLAction(
    StudentdocumentVectorsAttributeQuery,
    processVectorAttributeFromGraphQLResult("vectors")
)

export const StudentdocumentVectorsAttributeInfinite = ({studentdocument}) => { 
    const {vectors} = studentdocument

    return (
        <InfiniteScroll 
            Visualiser={'VectorMediumCard'} 
            actionParams={{skip: 0, limit: 10}}
            asyncAction={StudentdocumentVectorsAttributeAsyncAction}
        />
    )
}