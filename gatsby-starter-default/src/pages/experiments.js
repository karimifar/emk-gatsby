import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

import * as styles from "../styles/works.module.css"

const ExpPage = ({ data }) => {
  const [selectedWork, setSelectedWork] = useState(null)
  const rawWorks = data.allMarkdownRemark.edges

  function isExperiment(work) {
    return work.node.frontmatter.category === "experiment"
  }
  function isNotExperiment(work) {
    return !isExperiment(work)
  }

  const experiments = rawWorks
    .filter(isExperiment)
    .sort((a, b) => a.node.frontmatter.order - b.node.frontmatter.order)
  const works = rawWorks
    .filter(isNotExperiment)
    .sort((a, b) => a.node.frontmatter.order - b.node.frontmatter.order)

  console.log(works)
  return (
    <Layout>
      <div className={styles.worksWrap}>
        {experiments.map(work => {
          const title = work.node.frontmatter.title
          const url = work.node.fields.slug
          const featimg = work.node.frontmatter.featimg
          const id = work.node.id
          return (
            <a
              href={url}
              key={"link-" + id}
              className={`${styles.workLink} ${
                selectedWork === id ? styles.hovered : ""
              }`}
              onMouseEnter={() => setSelectedWork(id)}
              onMouseLeave={() => setSelectedWork(null)}
            >
              <div className={styles.workThumbWrap}>
                <GatsbyImage
                  image={getImage(featimg)}
                  alt={title}
                  key={id}
                  className={styles.workThumb}
                  data-img={"img-" + id}
                  id={styles["img-" + id]}
                />
              </div>
              <div className={styles.thumbOverlay}></div>

              <h2 key={id}>{title}</h2>
            </a>
          )
        })}
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Em Karimifar | Portfolio" />

export default ExpPage

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
