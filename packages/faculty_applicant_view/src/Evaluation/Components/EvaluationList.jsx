import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { EvaluationLink } from "."
import { ListGroup, Badge, Button } from "react-bootstrap"
import { EvaluationButton } from "."

export const EvaluationList = ({ evaluations, onUpdate, isEditMode = false }) => {
    return (
        <ListGroup>
            {evaluations.map(evaluation => (
                <ListGroup.Item key={evaluation.id}>
                    <EvaluationLink evaluation={evaluation} />
                    {evaluation.passed && <Badge style={{ marginLeft: '10px' }} bg="success">Uspěl</Badge>}
                    {!evaluation.passed && <Badge style={{ marginLeft: '10px' }} bg="danger">Neuspěl</Badge>}
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
