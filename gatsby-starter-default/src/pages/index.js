import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import P5Sketch from "../components/p5sketch"

import * as styles from "../styles/index.module.css"

const yearsXp = new Date().getFullYear() - 2017

const IndexPage = ({ data }) => {
  const [visibleThumb, setVisibleThumb] = useState(null)
  const rawWorks = data.allMarkdownRemark.edges
  function isFeatured(work) {
    if (work.node.frontmatter.category === "featured") {
      return work
    }
  }
  const featWorks = rawWorks.filter(isFeatured)
  // SORTING NOT NEEDED because graphql does it by default nevermind
  const works = featWorks.sort(
    (a, b) => a.node.frontmatter.order - b.node.frontmatter.order
  )
  console.log(featWorks)
  // console.log(works)
  return (
    <Layout>
      <div className={styles.homeBanner}>
        <div className={styles.introContent}>
          <p id={styles.greet}>
            Hi! <br /> I’m a multidisciplinary designer with {yearsXp}+ years of
            experience.
          </p>
          <h1>
            I specialize in UI/UX design & I enjoy engineering interactive,
            human-centered experiences!
          </h1>
        </div>
      </div>
      <div className={styles.featWorks}>
        {/* <div className="label">
        <p>featured works</p>
      </div> */}
        <div className={styles.wrapper}>
          <div className={styles.worksIndex}>
            {featWorks.map(work => {
              const order = work.node.frontmatter.order
              const title = work.node.frontmatter.title
              const url = "." + work.node.fields.slug
              const skills = work.node.frontmatter.skills
              const id = work.node.id
              return (
                <a
                  href={url}
                  key={"link-" + id}
                  className={styles.workLink}
                  data-img={"img-" + id}
                  onMouseEnter={() => setVisibleThumb(id)}
                  onMouseLeave={() => setVisibleThumb(null)}
                >
                  <div className={styles.workTitle} key={"work-" + id}>
                    <h1 key={id}>{title}</h1>
                    <p className={styles.workSkills}>{skills}</p>
                  </div>
                </a>
              )
            })}
            <Link to="/works" className={styles.allWorks}>
              <p>view all works</p>
            </Link>
          </div>
          <div className={styles.worksThumb}>
            {featWorks.map(work => {
              const key = work.node.frontmatter.order
              const title = work.node.frontmatter.title
              const featimg = work.node.frontmatter.featimg
              const id = work.node.id
              return (
                <GatsbyImage
                  image={getImage(featimg)}
                  alt={title}
                  key={id}
                  className={`${styles.workThumb} ${
                    visibleThumb === id ? styles.visible : ""
                  }`}
                  data-img={"img-" + id}
                  id={styles["img-" + id]}
                />
              )
            })}
            <div id={styles.thumbOverlay}></div>
            <div id={styles.sandbox}>{/* <P5Sketch /> */}</div>
          </div>
        </div>
      </div>
      {/* <Home /> */}
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
