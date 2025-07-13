import { ButtonWithDialog, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
import { forwardRef } from "react";

import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { StudentdocumentDeleteAsyncAction, StudentdocumentInsertAsyncAction, StudentdocumentUpdateAsyncAction } from "../Queries";
import { StudentdocumentMediumEditableContent } from "./StudentdocumentMediumEditableContent";
import { DocumentInsertAsyncAction } from "../../Document/Queries";

/**
 * StudentdocumentCUDButton Component
 *
 * A higher-order component that dynamically renders one of the following components
 * based on the `operation` prop:
 * - `InsertStudentdocumentButton` for creating a new item (operation "C")
 * - `UpdateStudentdocumentButton` for updating an existing item (operation "U")
 * - `DeleteStudentdocumentButton` for deleting an existing item (operation "D")
 *
 * This component validates the `studentdocument` prop:
 * - For "C" (create), `studentdocument` can be any object (no restrictions).
 * - For "U" (update) and "D" (delete), `studentdocument` must include an `id` key.
 *
 * If the `operation` prop is invalid or required conditions for `studentdocument` are not met,
 * an `ErrorHandler` component is rendered with an appropriate error message.
 *
 * @component
 * @param {Object} props - The props for the StudentdocumentCUDButton component.
 * @param {string} props.operation - The operation type ("C" for create, "U" for update, "D" for delete).
 * @param {React.ReactNode} props.children - The content or label for the button.
 * @param {Object} props.studentdocument - The parameters for the operation. For "U" and "D", it must include an `id` key.
 * @param {string} [props.studentdocument.id] - The unique identifier for the item (required for "U" and "D").
 * @param {string} [props.studentdocument.name] - The name of the item (optional).
 * @param {string} [props.studentdocument.name_en] - The English name of the item (optional).
 * @param {Function} [props.onDone=(studentdocument) => {}] - Callback executed after the operation completes. Receives the `studentdocument` object.
 * @param {...Object} props - Additional props passed to the underlying button components.
 *
 * @example
 * // Example Usage
 * const Example = () => {
 *   const handleDone = (data) => console.log("Operation completed:", data);
 *
 *   return (
 *     <>
 *       <StudentdocumentCUDButton
 *         operation="C"
 *         studentdocument={{ name: "New Item", name_en: "New Item EN" }}
 *         onDone={handleDone}
 *       >
 *         Insert
 *       </StudentdocumentCUDButton>
 *
 *       <StudentdocumentCUDButton
 *         operation="U"
 *         studentdocument={{ id: "123", name: "Updated Item", name_en: "Updated Item EN" }}
 *         onDone={handleDone}
 *       >
 *         Update
 *       </StudentdocumentCUDButton>
 *
 *       <StudentdocumentCUDButton
 *         operation="D"
 *         studentdocument={{ id: "123" }}
 *         onDone={handleDone}
 *       >
 *         Delete
 *       </StudentdocumentCUDButton>
 *     </>
 *   );
 * };
 *
 * @returns {JSX.Element} The dynamically selected button component for the specified operation.
 */
export const StudentDocumentButton = forwardRef(({ operation, children, studentdocument, onDone = () => { }, ...props }, ref) => {
    const operationConfig = {
        C: {
            asyncAction: StudentdocumentInsertAsyncAction,
            dialogTitle: "Vložit novou studentdocument",
            loadingMsg: "Vkládám novou studentdocument",
            renderContent: () => <StudentdocumentMediumEditableContent studentdocument={studentdocument} />,
        },
        U: {
            asyncAction: StudentdocumentUpdateAsyncAction,
            dialogTitle: "Upravit studentdocument",
            loadingMsg: "Ukládám studentdocument",
            renderContent: () => <StudentdocumentMediumEditableContent studentdocument={studentdocument} />,
        },
        D: {
            asyncAction: StudentdocumentDeleteAsyncAction,
            dialogTitle: "Chcete odebrat studentdocument?",
            loadingMsg: "Odstraňuji studentdocument",
            renderContent: () => (
                <h2>
                    {studentdocument?.name} ({studentdocument?.name_en})
                </h2>
            ),
        },
    };

    if (!operationConfig[operation]) {
        return <ErrorHandler errors={`Invalid operation value: '${operation}'. Must be one of 'C', 'U', or 'D'.`} />;
    }

    if (operation === 'C' && !studentdocument.studentId) {
        return <ErrorHandler errors={`For '${operation}' operation, 'studentdocument' must include an 'studentId' key.`} />;
    }

    const { asyncAction, dialogTitle, loadingMsg, renderContent } = operationConfig[operation];

    const { error, loading, fetch, entity } = useAsyncAction(asyncAction, studentdocument, { deferred: true });
    const { error: documentError, fetch: documentFetch } = useAsyncAction(DocumentInsertAsyncAction, { name: studentdocument.name, description: studentdocument.description }, { deferred: true });

    const handleClick = async (params = {}) => {
        // create document first, if it's not provided
        if (operation === 'C') {
            try {
                let finalStudentdocument = { ...studentdocument, ...params };

                // If we need to create a document first
                if (!finalStudentdocument.documentId) {
                    const documentResult = await documentFetch({
                        name: finalStudentdocument.name,
                        description: finalStudentdocument.description
                    });

                    if (documentResult) {
                        finalStudentdocument = {
                            ...finalStudentdocument,
                            documentId: documentResult.data.result.id
                        };
                    }
                }

                // Now create/update the student document with the document ID
                const freshStudentdocument = await fetch(finalStudentdocument);
                onDone(freshStudentdocument);
            } catch (err) {
                console.error('Error in handleClick:', err);
            }
        } else {
            await fetch(studentdocument);
            onDone(studentdocument);
        }
    };

    // Validate required fields for "U" and "D"
    if ((operation === 'U' || operation === 'D') && !studentdocument?.id) {
        return <ErrorHandler errors={`For '${operation}' operation, 'studentdocument' must include an 'id' key.`} />;
    }

    return (<>
        {error && <ErrorHandler errors={error} />}
        {loading && <LoadingSpinner text={loadingMsg} />}
        <ButtonWithDialog
            ref={ref}
            buttonLabel={children}
            dialogTitle={dialogTitle}
            {...props}
            params={studentdocument}
            onClick={handleClick}
        >
            {renderContent()}
        </ButtonWithDialog>
    </>);
});

// // Prop validation using PropTypes
// StudentdocumentCUDButton.propTypes = {
//     /** The operation to perform: "C" for create, "U" for update, "D" for delete. */
//     operation: PropTypes.oneOf(['C', 'U', 'D']).isRequired,
//     /** The label or content for the button. */
//     children: PropTypes.node,
//     /** The parameters for the operation. */
//     studentdocument: PropTypes.shape({
//         id: PropTypes.string, // Required for "U" and "D" operations
//         name: PropTypes.string,
//         name_en: PropTypes.string,
//     }).isRequired,
//     /** Callback executed after the operation completes. Receives the `studentdocument` object. */
//     onDone: PropTypes.func,
// };

// // Default props
// StudentdocumentCUDButton.defaultProps = {
//     onDone: () => {},
// };