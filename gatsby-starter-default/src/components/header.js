import * as React from "react"
import { Link } from "gatsby"
//styles
import "../styles/global.css"
// import * as styles from "./header.module.css"

//scripts
// import "../../static/assets/scripts/app.js"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons"

const Header = ({ data }) => {
  // const location = useLocation()
  // console.log(location)
  const menuLinks = data.site.siteMetadata.menuLinks
  return (
    <header>
      <Link id="site-title" to="/">
        <img
          alt="Em Karimifar Logo"
          draggable="false"
          src="/assets/logo-bg.svg"
          layout="fixed"
        />
        <h1>
          Em <br />
          Karimifar
        </h1>
      </Link>

      <nav>
        <ul className="nav-items">
          {menuLinks.map(link => (
            <li key={link.name}>
              <Link
                to={link.link}
                partiallyActive={false}
                activeClassName="current-page"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link to="#">
              <FontAwesomeIcon icon={faCircleHalfStroke} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
