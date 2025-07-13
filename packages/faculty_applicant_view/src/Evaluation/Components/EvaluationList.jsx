import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { EvaluationLink } from "."
import { ListGroup, Badge, Button } from "react-bootstrap"
import { EvaluationButton } from "."

/**
 * EvaluationList Component
 *
 * Displays a list of evaluations with support for view and edit modes.
 * In edit mode, provides buttons for updating, deleting, and creating new evaluations.
 * Each evaluation displays a pass/fail badge indicating the evaluation result.
 *
 * @component
 * @param {Object} props - The props for the EvaluationList component
 * @param {Array<Object>} props.evaluations - Array of evaluation objects to display
 * @param {Object} props.evaluations[].id - Unique identifier for the evaluation
 * @param {boolean} props.evaluations[].passed - Whether the evaluation was passed
 * @param {string} props.evaluations[].lastchange - Last modification timestamp
 * @param {string} [props.evaluations[].studentId] - Associated student ID
 * @param {Function} [props.onUpdate] - Callback function called when evaluations are updated
 * @param {boolean} [props.isEditMode=false] - Whether to show edit controls (update/delete/create buttons)
 * @returns {JSX.Element} A Bootstrap ListGroup containing evaluation items with optional edit controls
 *
 * @example
 * // Basic read-only usage
 * <EvaluationList evaluations={studentEvaluations} />
 *
 * @example
 * // With edit mode enabled
 * <EvaluationList 
 *   evaluations={studentEvaluations} 
 *   isEditMode={true}
 *   onUpdate={(data) => refreshEvaluations()}
 * />
 */
export const EvaluationList = ({ evaluations, onUpdate, isEditMode = false }) => {
    return (
        <ListGroup>
            {evaluations.map(evaluation => (
                <ListGroup.Item key={evaluation.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <EvaluationLink evaluation={evaluation} />
                    <div>
                        {evaluation.passed && <Badge bg="success">Uspěl</Badge>}
                        {!evaluation.passed && <Badge bg="danger">Neuspěl</Badge>}
                    </div>
                    {isEditMode && (
                        <>
                            <EvaluationButton
                                operation="U"
                                evaluation={evaluation}
                                onDone={onUpdate}
                                style={{ marginLeft: '10px' }}
                            >
                                <Button variant="outline-primary" size="sm">Upravit</Button>
                            </EvaluationButton>
                            <EvaluationButton
                                operation="D"
                                evaluation={{ id: evaluation.id, lastchange: evaluation.lastchange }}
                                onDone={onUpdate}
                                style={{ marginLeft: '10px' }}
                            >
                                <Button variant="outline-danger" size="sm">Smazat</Button>
                            </EvaluationButton>
                        </>
                    )}
                </ListGroup.Item>
            ))}
            {isEditMode && (
                <ListGroup.Item>
                    <EvaluationButton
                        operation="C"
                        evaluation={{ studentId: evaluations[0]?.studentId }}
                        onDone={onUpdate}
                    >
                        <Button variant="outline-success" size="sm">Přidat hodnocení</Button>
                    </EvaluationButton>
                </ListGroup.Item>
            )}
        </ListGroup>
    )
}
