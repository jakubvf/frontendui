import { ButtonWithDialog, ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared";
// import { InsertFacultyButton } from "./CUDButtons/InsertFacultyButton";
// import { UpdateFacultyButton } from "./CUDButtons/UpdateFacultyButton";
// import { DeleteFacultyButton } from "./CUDButtons/DeleteFacultyButton";
import { useAsyncAction } from "@hrbolek/uoisfrontend-gql-shared";

/**
 * FacultyCUDButton Component
 *
 * A higher-order component that dynamically renders one of the following components
 * based on the `operation` prop:
 * - `InsertFacultyButton` for creating a new item (operation "C")
 * - `UpdateFacultyButton` for updating an existing item (operation "U")
 * - `DeleteFacultyButton` for deleting an existing item (operation "D")
 *
 * This component validates the `faculty` prop:
 * - For "C" (create), `faculty` can be any object (no restrictions).
 * - For "U" (update) and "D" (delete), `faculty` must include an `id` key.
 *
 * If the `operation` prop is invalid or required conditions for `faculty` are not met,
 * an `ErrorHandler` component is rendered with an appropriate error message.
 *
 * @component
 * @param {Object} props - The props for the FacultyCUDButton component.
 * @param {string} props.operation - The operation type ("C" for create, "U" for update, "D" for delete).
 * @param {React.ReactNode} props.children - The content or label for the button.
 * @param {Object} props.faculty - The parameters for the operation. For "U" and "D", it must include an `id` key.
 * @param {string} [props.faculty.id] - The unique identifier for the item (required for "U" and "D").
 * @param {string} [props.faculty.name] - The name of the item (optional).
 * @param {string} [props.faculty.name_en] - The English name of the item (optional).
 * @param {Function} [props.onDone=(faculty) => {}] - Callback executed after the operation completes. Receives the `faculty` object.
 * @param {...Object} props - Additional props passed to the underlying button components.
 *
 * @example
 * // Example Usage
 * const Example = () => {
 *   const handleDone = (data) => console.log("Operation completed:", data);
 *
 *   return (
 *     <>
 *       <FacultyCUDButton
 *         operation="C"
 *         faculty={{ name: "New Item", name_en: "New Item EN" }}
 *         onDone={handleDone}
 *       >
 *         Insert
 *       </FacultyCUDButton>
 *
 *       <FacultyCUDButton
 *         operation="U"
 *         faculty={{ id: "123", name: "Updated Item", name_en: "Updated Item EN" }}
 *         onDone={handleDone}
 *       >
 *         Update
 *       </FacultyCUDButton>
 *
 *       <FacultyCUDButton
 *         operation="D"
 *         faculty={{ id: "123" }}
 *         onDone={handleDone}
 *       >
 *         Delete
 *       </FacultyCUDButton>
 *     </>
 *   );
 * };
 *
 * @returns {JSX.Element} The dynamically selected button component for the specified operation.
 */
export const FacultyButton = ({ operation, children, faculty, onDone = () => {}, ...props }) => {
    const operationConfig = {
        C: {
            asyncAction: FacultyInsertAsyncAction,
            dialogTitle: "Vložit novou faculty",
            loadingMsg: "Vkládám novou faculty",
            renderContent: () => <FacultyMediumEditableContent faculty={faculty} />,
        },
        U: {
            asyncAction: FacultyUpdateAsyncAction,
            dialogTitle: "Upravit faculty",
            loadingMsg: "Ukládám faculty",
            renderContent: () => <FacultyMediumEditableContent faculty={faculty} />,
        },
        D: {
            asyncAction: FacultyDeleteAsyncAction,
            dialogTitle: "Chcete odebrat faculty?",
            loadingMsg: "Odstraňuji faculty",
            renderContent: () => (
                <h2>
                    {faculty?.name} ({faculty?.name_en})
                </h2>
            ),
        },
    };

    if (!operationConfig[operation]) {
        return <ErrorHandler errors={`Invalid operation value: '${operation}'. Must be one of 'C', 'U', or 'D'.`} />;
    }

    const { asyncAction, dialogTitle, loadingMsg, renderContent } = operationConfig[operation];

    const { error, loading, fetch, entity } = useAsyncAction(asyncAction, faculty, { deferred: true });
    const handleClick = async (params = {}) => {
        const fetchParams = { ...faculty, ...params };
        const freshFaculty = await fetch(fetchParams);
        onDone(freshFaculty); // Pass the result to the external callback
    };

    // Validate required fields for "U" and "D"
    if ((operation === 'U' || operation === 'D') && !faculty?.id) {
        return <ErrorHandler errors={`For '${operation}' operation, 'faculty' must include an 'id' key.`} />;
    }

    return (<>
        {error && <ErrorHandler errors={error} />}
        {loading && <LoadingSpinner text={loadingMsg} />}
        <ButtonWithDialog
            buttonLabel={children}
            dialogTitle={dialogTitle}
            {...props}
            params={faculty}
            onClick={handleClick}
        >
            {renderContent()}
        </ButtonWithDialog>
    </>);
};

// // Prop validation using PropTypes
// FacultyCUDButton.propTypes = {
//     /** The operation to perform: "C" for create, "U" for update, "D" for delete. */
//     operation: PropTypes.oneOf(['C', 'U', 'D']).isRequired,
//     /** The label or content for the button. */
//     children: PropTypes.node,
//     /** The parameters for the operation. */
//     faculty: PropTypes.shape({
//         id: PropTypes.string, // Required for "U" and "D" operations
//         name: PropTypes.string,
//         name_en: PropTypes.string,
//     }).isRequired,
//     /** Callback executed after the operation completes. Receives the `faculty` object. */
//     onDone: PropTypes.func,
// };

// // Default props
// FacultyCUDButton.defaultProps = {
//     onDone: () => {},
// };