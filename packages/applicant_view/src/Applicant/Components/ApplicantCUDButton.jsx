import { ButtonWithDialog, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
// import { InsertApplicantButton } from "./CUDButtons/InsertApplicantButton";
// import { UpdateApplicantButton } from "./CUDButtons/UpdateApplicantButton";
// import { DeleteApplicantButton } from "./CUDButtons/DeleteApplicantButton";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";

/**
 * ApplicantCUDButton Component
 *
 * A higher-order component that dynamically renders one of the following components
 * based on the `operation` prop:
 * - `InsertApplicantButton` for creating a new item (operation "C")
 * - `UpdateApplicantButton` for updating an existing item (operation "U")
 * - `DeleteApplicantButton` for deleting an existing item (operation "D")
 *
 * This component validates the `applicant` prop:
 * - For "C" (create), `applicant` can be any object (no restrictions).
 * - For "U" (update) and "D" (delete), `applicant` must include an `id` key.
 *
 * If the `operation` prop is invalid or required conditions for `applicant` are not met,
 * an `ErrorHandler` component is rendered with an appropriate error message.
 *
 * @component
 * @param {Object} props - The props for the ApplicantCUDButton component.
 * @param {string} props.operation - The operation type ("C" for create, "U" for update, "D" for delete).
 * @param {React.ReactNode} props.children - The content or label for the button.
 * @param {Object} props.applicant - The parameters for the operation. For "U" and "D", it must include an `id` key.
 * @param {string} [props.applicant.id] - The unique identifier for the item (required for "U" and "D").
 * @param {string} [props.applicant.name] - The name of the item (optional).
 * @param {string} [props.applicant.name_en] - The English name of the item (optional).
 * @param {Function} [props.onDone=(applicant) => {}] - Callback executed after the operation completes. Receives the `applicant` object.
 * @param {...Object} props - Additional props passed to the underlying button components.
 *
 * @example
 * // Example Usage
 * const Example = () => {
 *   const handleDone = (data) => console.log("Operation completed:", data);
 *
 *   return (
 *     <>
 *       <ApplicantCUDButton
 *         operation="C"
 *         applicant={{ name: "New Item", name_en: "New Item EN" }}
 *         onDone={handleDone}
 *       >
 *         Insert
 *       </ApplicantCUDButton>
 *
 *       <ApplicantCUDButton
 *         operation="U"
 *         applicant={{ id: "123", name: "Updated Item", name_en: "Updated Item EN" }}
 *         onDone={handleDone}
 *       >
 *         Update
 *       </ApplicantCUDButton>
 *
 *       <ApplicantCUDButton
 *         operation="D"
 *         applicant={{ id: "123" }}
 *         onDone={handleDone}
 *       >
 *         Delete
 *       </ApplicantCUDButton>
 *     </>
 *   );
 * };
 *
 * @returns {JSX.Element} The dynamically selected button component for the specified operation.
 */
export const ApplicantButton = ({ operation, children, applicant, onDone = () => {}, ...props }) => {
    const operationConfig = {
        C: {
            asyncAction: ApplicantInsertAsyncAction,
            dialogTitle: "Vložit novou applicant",
            loadingMsg: "Vkládám novou applicant",
            renderContent: () => <ApplicantMediumEditableContent applicant={applicant} />,
        },
        U: {
            asyncAction: ApplicantUpdateAsyncAction,
            dialogTitle: "Upravit applicant",
            loadingMsg: "Ukládám applicant",
            renderContent: () => <ApplicantMediumEditableContent applicant={applicant} />,
        },
        D: {
            asyncAction: ApplicantDeleteAsyncAction,
            dialogTitle: "Chcete odebrat applicant?",
            loadingMsg: "Odstraňuji applicant",
            renderContent: () => (
                <h2>
                    {applicant?.name} ({applicant?.name_en})
                </h2>
            ),
        },
    };

    if (!operationConfig[operation]) {
        return <ErrorHandler errors={`Invalid operation value: '${operation}'. Must be one of 'C', 'U', or 'D'.`} />;
    }

    const { asyncAction, dialogTitle, loadingMsg, renderContent } = operationConfig[operation];

    const { error, loading, fetch, entity } = useAsyncAction(asyncAction, applicant, { deferred: true });
    const handleClick = async (params = {}) => {
        const fetchParams = { ...applicant, ...params };
        const freshApplicant = await fetch(fetchParams);
        onDone(freshApplicant); // Pass the result to the external callback
    };

    // Validate required fields for "U" and "D"
    if ((operation === 'U' || operation === 'D') && !applicant?.id) {
        return <ErrorHandler errors={`For '${operation}' operation, 'applicant' must include an 'id' key.`} />;
    }

    return (<>
        {error && <ErrorHandler errors={error} />}
        {loading && <LoadingSpinner text={loadingMsg} />}
        <ButtonWithDialog
            buttonLabel={children}
            dialogTitle={dialogTitle}
            {...props}
            params={applicant}
            onClick={handleClick}
        >
            {renderContent()}
        </ButtonWithDialog>
    </>);
};

// // Prop validation using PropTypes
// ApplicantCUDButton.propTypes = {
//     /** The operation to perform: "C" for create, "U" for update, "D" for delete. */
//     operation: PropTypes.oneOf(['C', 'U', 'D']).isRequired,
//     /** The label or content for the button. */
//     children: PropTypes.node,
//     /** The parameters for the operation. */
//     applicant: PropTypes.shape({
//         id: PropTypes.string, // Required for "U" and "D" operations
//         name: PropTypes.string,
//         name_en: PropTypes.string,
//     }).isRequired,
//     /** Callback executed after the operation completes. Receives the `applicant` object. */
//     onDone: PropTypes.func,
// };

// // Default props
// ApplicantCUDButton.defaultProps = {
//     onDone: () => {},
// };