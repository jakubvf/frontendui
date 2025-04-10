import Row from "react-bootstrap/Row"
import { LeftColumn, MiddleColumn } from "@hrbolek/uoisfrontend-shared"
import { UserCardCapsule } from "./UserCardCapsule"
import { UserMediumCard } from "./UserMediumCard"
import { Link } from "react-router"
import { ListGroup, Badge, Card } from "react-bootstrap"
import { Envelope, Calendar } from "react-bootstrap-icons"

/**
 * A large card component for displaying detailed content and layout for an user entity.
 *
 * This component wraps an `UserCardCapsule` with a flexible layout that includes multiple
 * columns. It uses a `Row` layout with a `LeftColumn` for displaying an `UserMediumCard`
 * and a `MiddleColumn` for rendering additional children.
 *
 * @component
 * @param {Object} props - The properties for the UserLargeCard component.
 * @param {Object} props.user - The object representing the user entity.
 * @param {string|number} props.user.id - The unique identifier for the user entity.
 * @param {string} props.user.name - The name or label of the user entity.
 * @param {React.ReactNode} [props.children=null] - Additional content to render in the middle column.
 *
 * @returns {JSX.Element} A JSX element combining a large card layout with dynamic content.
 *
 * @example
 * // Example usage:
 * const userEntity = { id: 123, name: "Sample Entity" };
 *
 * <UserLargeCard user={userEntity}>
 *   <p>Additional content for the middle column.</p>
 * </UserLargeCard>
 */
export const UserLargeCard = ({ user, children }) => {
    return (
        <UserCardCapsule user={user} title={'Uchazeč'}>
            <Row>
                <LeftColumn>
                    <UserMediumCard user={user}>
                        <Card.Body>
                            <div className="mb-2">
                                <Envelope className="me-2" />
                                Email: <Card.Link href={'mailto:' + user.email}>{user.email}</Card.Link>
                            </div>
                            <div className="mb-2">
                                <Calendar className="me-2" />
                                Začátek studia: {user.startdate}
                            </div>
                            <div className="mb-3">
                                <Calendar className="me-2" />
                                Konec studia: {user.enddate}
                            </div>
                            <div><strong>Studijní programy:</strong></div>
                            <ListGroup variant="flush" className="mt-2">
                                {user.studies.map((study, index) => (
                                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                        <Link to={'/programs/program/view/' + study.program.id}>{study.program.name}</Link>
                                        <Badge bg="info">{study.program.type || "Program"}</Badge>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </UserMediumCard>
                </LeftColumn>
                <MiddleColumn>
                    {children}
                </MiddleColumn>
            </Row>
        </UserCardCapsule>
    )
}
