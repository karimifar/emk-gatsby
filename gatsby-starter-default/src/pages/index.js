import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import * as styles from "../components/index.module.css"
import "../styles/home.css"

const yearsXp = new Date().getFullYear() - 2017

const IndexPage = () => (
  <Layout>
    <div className="home-banner">
      <div className="intro-content">
        <p id="greet">
          Hi! <br /> I’m a multidisciplinary designer with {yearsXp}+ years of
          experience.
        </p>
        <h1>
          I specialize in UI/UX design & I enjoy engineering interactive,
          human-centered experiences!
        </h1>
      </div>
    </div>
    <div className="feat-works">
      {/* <div className="label">
        <p>featured works</p>
      </div> */}
      <div className="wrapper">
        <div class="works-index">
          <h1>Interactive Data Visualizations</h1>
          <h1>Texas Child Mental Health Care Consortium</h1>
          <h1>Brand Design & Management</h1>
          <h1>Design for Social Change</h1>
          <h1>Design for Play</h1>
        </div>
        <div className="works-thumb"></div>
      </div>
    </div>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Em Karimifar" />

export default IndexPage
