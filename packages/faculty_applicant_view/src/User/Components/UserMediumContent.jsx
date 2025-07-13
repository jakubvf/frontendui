import { Link } from "react-router-dom"
import { Envelope, Calendar } from "react-bootstrap-icons"
import { Card, ListGroup, Badge } from "react-bootstrap"

/**
 * A component that displays medium-level content for a user, including contact information,
 * study dates, and associated study programs.
 *
 * This component renders the user's email (as a clickable mailto link), study start and end dates,
 * and a list of study programs the user is enrolled in. Each study program is displayed as a
 * clickable link to the program's detail page.
 *
 * @component
 * @param {Object} props - The properties for the UserMediumContent component.
 * @param {Object} props.user - The user object containing personal and academic information.
 * @param {string} props.user.email - The user's email address.
 * @param {string} props.user.startdate - The user's study start date.
 * @param {string} props.user.enddate - The user's study end date.
 * @param {Array<Object>} props.user.studies - Array of study objects representing enrolled programs.
 * @param {Object} props.user.studies[].program - The study program object.
 * @param {string|number} props.user.studies[].program.id - The unique identifier of the study program.
 * @param {string} props.user.studies[].program.name - The name of the study program.
 * @param {React.ReactNode} [props.children] - Additional content to render after the user information.
 *
 * @returns {JSX.Element} A JSX element displaying the user's academic information and optional content.
 *
 * @example
 * // Example usage:
 * const user = {
 *   email: "student@example.com",
 *   startdate: "2023-09-01",
 *   enddate: "2027-06-30",
 *   studies: [
 *     { program: { id: 1, name: "Computer Science" } },
 *     { program: { id: 2, name: "Mathematics" } }
 *   ]
 * };
 *
 * <UserMediumContent user={user}>
 *   <p>Additional information about the user.</p>
 * </UserMediumContent>
 */
export const UserMediumContent = ({user, children}) => {
    return (
        <>
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
                  </ListGroup.Item>
              ))}
          </ListGroup>
          {children}
        </>
    )
}
