import { ErrorHandler, LoadingSpinner } from "@hrbolek/uoisfrontend-shared"
import { EvaluationLink } from "."
import { ListGroup, Badge } from "react-bootstrap"

export const EvaluationList = ({ evaluations }) => {
    return (
        <ListGroup>
            {evaluations.map(evaluation => (
                <ListGroup.Item key={evaluation.id}>
                    
                    <EvaluationLink evaluation={evaluation} />
                    {evaluation.passed && <Badge style={{ marginLeft: '10px' }} bg="success">Uspěl</Badge>}
                    {!evaluation.passed && <Badge style={{ marginLeft: '10px' }} bg="danger">Neuspěl</Badge>}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
