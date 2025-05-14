import { ButtonWithDialog, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";

import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";
import { DocumentDeleteAsyncAction, DocumentInsertAsyncAction, DocumentUpdateAsyncAction } from "../Queries";
import { DocumentMediumEditableContent } from "./DocumentMediumEditableContent";

/**
 * DocumentCUDButton Component
 *
 * A higher-order component that dynamically renders one of the following components
 * based on the `operation` prop:
 * - `InsertDocumentButton` for creating a new item (operation "C")
 * - `UpdateDocumentButton` for updating an existing item (operation "U")
 * - `DeleteDocumentButton` for deleting an existing item (operation "D")
 *
 * This component validates the `document` prop:
 * - For "C" (create), `document` can be any object (no restrictions).
 * - For "U" (update) and "D" (delete), `document` must include an `id` key.
 *
 * If the `operation` prop is invalid or required conditions for `document` are not met,
 * an `ErrorHandler` component is rendered with an appropriate error message.
 *
 * @component
 * @param {Object} props - The props for the DocumentCUDButton component.
 * @param {string} props.operation - The operation type ("C" for create, "U" for update, "D" for delete).
 * @param {React.ReactNode} props.children - The content or label for the button.
 * @param {Object} props.document - The parameters for the operation. For "U" and "D", it must include an `id` key.
 * @param {string} [props.document.id] - The unique identifier for the item (required for "U" and "D").
 * @param {string} [props.document.name] - The name of the item (optional).
 * @param {string} [props.document.name_en] - The English name of the item (optional).
 * @param {Function} [props.onDone=(document) => {}] - Callback executed after the operation completes. Receives the `document` object.
 * @param {...Object} props - Additional props passed to the underlying button components.
 *
 * @example
 * // Example Usage
 * const Example = () => {
 *   const handleDone = (data) => console.log("Operation completed:", data);
 *
 *   return (
 *     <>
 *       <DocumentCUDButton
 *         operation="C"
 *         document={{ name: "New Item", name_en: "New Item EN" }}
 *         onDone={handleDone}
 *       >
 *         Insert
 *       </DocumentCUDButton>
 *
 *       <DocumentCUDButton
 *         operation="U"
 *         document={{ id: "123", name: "Updated Item", name_en: "Updated Item EN" }}
 *         onDone={handleDone}
 *       >
 *         Update
 *       </DocumentCUDButton>
 *
 *       <DocumentCUDButton
 *         operation="D"
 *         document={{ id: "123" }}
 *         onDone={handleDone}
 *       >
 *         Delete
 *       </DocumentCUDButton>
 *     </>
 *   );
 * };
 *
 * @returns {JSX.Element} The dynamically selected button component for the specified operation.
 */
export const DocumentButton = ({ operation, children, document, onDone = () => {}, ...props }) => {
    const operationConfig = {
        C: {
            asyncAction: DocumentInsertAsyncAction,
            dialogTitle: "Vložit novou document",
            loadingMsg: "Vkládám novou document",
            renderContent: () => <DocumentMediumEditableContent document={document} />,
        },
        U: {
            asyncAction: DocumentUpdateAsyncAction,
            dialogTitle: "Upravit document",
            loadingMsg: "Ukládám document",
            renderContent: () => <DocumentMediumEditableContent document={document} />,
        },
        D: {
            asyncAction: DocumentDeleteAsyncAction,
            dialogTitle: "Chcete odebrat document?",
            loadingMsg: "Odstraňuji document",
            renderContent: () => (
                <h2>
                    {document?.name} ({document?.name_en})
                </h2>
            ),
        },
    };

    if (!operationConfig[operation]) {
        return <ErrorHandler errors={`Invalid operation value: '${operation}'. Must be one of 'C', 'U', or 'D'.`} />;
    }

    const { asyncAction, dialogTitle, loadingMsg, renderContent } = operationConfig[operation];

    const { error, loading, fetch, entity } = useAsyncAction(asyncAction, document, { deferred: true });
    const handleClick = async (params = {}) => {
        const fetchParams = { ...document, ...params };
        const freshDocument = await fetch(fetchParams);
        onDone(freshDocument); // Pass the result to the external callback
    };

    // Validate required fields for "U" and "D"
    if ((operation === 'U' || operation === 'D') && !document?.id) {
        return <ErrorHandler errors={`For '${operation}' operation, 'document' must include an 'id' key.`} />;
    }

    return (<>
        {error && <ErrorHandler errors={error} />}
        {loading && <LoadingSpinner text={loadingMsg} />}
        <ButtonWithDialog
            buttonLabel={children}
            dialogTitle={dialogTitle}
            {...props}
            params={document}
            onClick={handleClick}
        >
            {renderContent()}
        </ButtonWithDialog>
    </>);
};

// // Prop validation using PropTypes
// DocumentCUDButton.propTypes = {
//     /** The operation to perform: "C" for create, "U" for update, "D" for delete. */
//     operation: PropTypes.oneOf(['C', 'U', 'D']).isRequired,
//     /** The label or content for the button. */
//     children: PropTypes.node,
//     /** The parameters for the operation. */
//     document: PropTypes.shape({
//         id: PropTypes.string, // Required for "U" and "D" operations
//         name: PropTypes.string,
//         name_en: PropTypes.string,
//     }).isRequired,
//     /** Callback executed after the operation completes. Receives the `document` object. */
//     onDone: PropTypes.func,
// };

// // Default props
// DocumentCUDButton.defaultProps = {
//     onDone: () => {},
// };