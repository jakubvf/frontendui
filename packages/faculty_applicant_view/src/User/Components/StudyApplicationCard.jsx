import { Card, Badge, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import { PaymentButton } from "../../Payment/Components"
import { StudentDocumentList, StudentDocumentButton } from "../../StudentDocument/Components"
import { EvaluationList } from "../../Evaluation/Components"
/**
 * Displays a single study application card with payment and document information.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.study - Study application data
 * @param {Object} props.study.program - Program information
 * @param {Object} props.study.payment - Payment information
 * @param {Array<Object>} props.documents - Array of student documents
 * @param {Array<Object>} props.evaluations - Array of evaluations
 * @returns {JSX.Element} Rendered component
 */
export const StudyApplicationCard = ({ study, documents, evaluations, onUpdate, ...props }) => {
    return (
        <Card>
            <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ alignItems: 'left' }}>
                    <Link to={'/programs/program/view/' + study.program.id}>{study.program.name}</Link>
                </div>
                <div style={{ alignItems: 'right' }}>
                    {study.payment.amount >= study.payment.paymentInfo.amount && <Badge bg="success">Zaplaceno</Badge>}
                    {study.payment.amount < study.payment.paymentInfo.amount && <Badge bg="danger">Nezaplaceno</Badge>}
                </div>
            </Card.Header>
            <Card.Body>
            {study.id}

                <Card.Title>Platba</Card.Title>
                <ListGroup>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span><strong>Zaplacená částka:</strong> {study.payment.amount} Kč</span>
                        {props.isEditMode && (
                        <PaymentButton
                            operation="U"
                            payment={{ id: study.payment.id, amount: study.payment.amount, lastchange: study.payment.lastchange }}
                            onDone={onUpdate}
                        >
                            <Button variant="outline-primary" size="sm">Upravit</Button>
                        </PaymentButton>
                        )}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <strong>Požadovaná částka:</strong> {study.payment.paymentInfo.amount} Kč
                    </ListGroup.Item>
                </ListGroup>
                <Card.Title className="mt-3">Nahrané dokumenty</Card.Title>
                <StudentDocumentList
                    documents={documents.filter(doc => doc.student.id === study.id)}
                    studentId={study.id}
                    onUpdate={onUpdate}
                    {...props}
                />
                <Card.Title className="mt-3">Výsledky přijmacího řízení</Card.Title>
                <EvaluationList evaluations={evaluations} />

            </Card.Body>
        </Card>
    )
} 