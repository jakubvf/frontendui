import { Card, Badge, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { StudentDocumentList } from "../../StudentDocument/Components"
import { EvaluationList } from "../../Evaluation/Components"
import { StudentPayment } from "./StudentPayment"
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
            </Card.Header>
            <Card.Body>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Card.Title className="mt-3">Platba</Card.Title>
                <div>
                  {study.payment.amount >= study.payment.paymentInfo.amount && <Badge bg="success">Zaplaceno</Badge>}
                  {study.payment.amount < study.payment.paymentInfo.amount && <Badge bg="danger">Nezaplaceno</Badge>}
                </div>
              </div>

              <StudentPayment
                  payment={study.payment}
                  onUpdate={onUpdate}
                  {... props}
              />
              <Card.Title className="mt-3">Nahrané dokumenty ({documents.filter(doc => doc.student.id === study.id).length})</Card.Title>
              <StudentDocumentList
                  documents={documents.filter(doc => doc.student.id === study.id)}
                  studentId={study.id}
                  onUpdate={onUpdate}
                  {...props}
              />
              <Card.Title className="mt-3">Výsledky přijmacího řízení ({evaluations.length})</Card.Title>
              <EvaluationList evaluations={evaluations} />

            </Card.Body>
        </Card>
    )
}
