import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'

function Header() {
    return (
        <header>
            <FontAwesomeIcon icon={faClipboardList} />
            <h1>TODO</h1>
        </header>
    )
}
export default Header