import * as React from "react"
import { Link } from "gatsby"
//styles
import "../styles/global.css"
// import * as styles from "./header.module.css"

//scripts
import "../scripts/app.js"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faLinkedin,
  faBehance,
  faDribbble,
} from "@fortawesome/free-brands-svg-icons"

const Footer = ({ data }) => {
  // const location = useLocation()
  // console.log(location)
  const menuLinks = data.site.siteMetadata.menuLinks
  return (
    <footer>
      © {new Date().getFullYear()} &middot; Designed & Developed by Em Karimifar
      <ul className="nav-items">
        <li>
          <a href="">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </li>
        <li>
          <a href="">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </li>
        <li>
          <a href="">
            <FontAwesomeIcon icon={faDribbble} />
          </a>
        </li>
        <li>
          <a href="">
            <FontAwesomeIcon icon={faBehance} />
          </a>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
