/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"

//styles
import "../styles/reset.css"
import "../styles/accessibility.css"
import "../fonts/fonts.css"
import "../styles/global.css"
import * as styles from "./layout.module.css"

const Layout = ({ children }) => {
  const siteData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          menuLinks {
            link
            name
          }
        }
      }
    }
  `)

  return (
    <>
      <Header data={siteData} />
      <div
        className="main-content"
        // style={{
        //   margin: `0 auto`,
        //   maxWidth: `var(--size-content)`,
        //   padding: `var(--size-gutter)`,
        // }}
      >
        <main>{children}</main>
      </div>

      <Footer data={siteData} />
    </>
  )
}

export default Layout
