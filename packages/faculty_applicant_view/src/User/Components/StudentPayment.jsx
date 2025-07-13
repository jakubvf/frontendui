import { Badge, ListGroup } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import { PaymentButton } from "../../Payment/Components"

/**
 * Displays payment information for a study application.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.payment - Payment information
 * @param {number} props.payment.amount - Paid amount
 * @param {number} props.payment.paymentInfo.amount - Required amount
 * @param {string} props.payment.id - Payment ID
 * @param {string} props.payment.lastchange - Last change timestamp
 * @param {boolean} props.isEditMode - Whether edit mode is enabled
 * @param {Function} props.onUpdate - Callback when payment is updated
 * @returns {JSX.Element} Rendered component
 */
export const StudentPayment = ({ payment, isEditMode, onUpdate }) => {
    return (
        <>
            <ListGroup>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span><strong>Zaplacená částka:</strong> {payment.amount} Kč</span>
                    {isEditMode && (
                    <PaymentButton
                        operation="U"
                        payment={{ id: payment.id, amount: payment.amount, lastchange: payment.lastchange }}
                        onDone={onUpdate}
                    >
                        <Button variant="outline-primary" size="sm">Upravit</Button>
                    </PaymentButton>
                    )}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Požadovaná částka:</strong> {payment.paymentInfo.amount} Kč
                </ListGroup.Item>
            </ListGroup>
        </>
    )
}
