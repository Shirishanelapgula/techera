import {Link} from 'react-router-dom'
import './index.css'

const Item = props => {
  const {details} = props

  return (
    <Link to={`/courses/${details.id}`}>
      <li className="item-container">
        <img src={details.logo_url} alt={details.name} className="logo-image" />
        <p className="text">{details.name}</p>
      </li>
    </Link>
  )
}

export default Item
