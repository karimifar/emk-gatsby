import * as React from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
//styles
import "../styles/global.css"
// import * as styles from "./header.module.css"

//scripts
import "../scripts/app.js"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons"

const Header = ({ siteTitle }) => {
  // const location = useLocation()
  // console.log(location)
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
          <li>
            <Link to="/" activeClassName="current-page" partiallyActive={true}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/works"
              activeClassName="current-page"
              partiallyActive={true}
            >
              Works
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              activeClassName="current-page"
              partiallyActive={true}
            >
              About
            </Link>
          </li>
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

const Menu = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          menuLinks {
            link
            name
          }
        }
      }
    }
  `)
  console.log(data)
  return data
}
console.log(Menu)
export default Header
