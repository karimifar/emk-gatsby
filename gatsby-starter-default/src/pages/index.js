import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import P5Sketch from "../components/p5sketch"

import * as styles from "../components/index.module.css"
import "../styles/home.css"
import "../scripts/home.js"

const yearsXp = new Date().getFullYear() - 2017

const IndexPage = ({ data }) => {
  const rawWorks = data.allMarkdownRemark.edges
  function isFeatured(work) {
    if (work.node.frontmatter.category == "featured") {
      return work
    }
  }
  const featWorks = rawWorks.filter(isFeatured)
  // SORTING NOT NEEDED because graphql does it by default
  // const works = featWorks.sort(
  //   (a, b) => a.node.frontmatter.order - b.node.frontmatter.order
  // )
  console.log(featWorks)
  // console.log(works)
  return (
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
          <div className="works-index">
            {featWorks.map(work => {
              const key = work.node.frontmatter.order
              const title = work.node.frontmatter.title
              const url = "." + work.node.fields.slug
              const skills = work.node.frontmatter.skills
              return (
                <a href={url} key={"link-" + key} className="work-link">
                  <div
                    className="work-title"
                    key={"work-" + key}
                    data-img={"img-" + key}
                  >
                    <h1 key={key}>{title}</h1>
                    <p className="work-skills">{skills}</p>
                  </div>
                </a>
              )
            })}
          </div>
          <div className="works-thumb">
            {/* <P5Sketch /> */}

            {featWorks.map(work => {
              const key = work.node.frontmatter.order
              const title = work.node.frontmatter.title
              const featimg = work.node.frontmatter.featimg
              return (
                <GatsbyImage
                  image={getImage(featimg)}
                  alt={title}
                  key={"img" + key}
                  className="work-thumb"
                  data-img={"img-" + key}
                />
              )
            })}
          </div>
        </div>
      </div>
      <script>
        const test = document.querySelectorAll(".work-link") console.log(test)
      </script>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */

export const Head = () => <Seo title="Em Karimifar" />

export default IndexPage

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            featimg {
              childImageSharp {
                gatsbyImageData(blurredOptions: {})
              }
            }
            category
            date
            title
            skills
            order
          }
          id
        }
      }
    }
  }
`
