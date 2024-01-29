import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

import * as styles from "../styles/works.module.css"

const WorksPage = ({ data }) => {
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
      <div
        id={styles.worksWrap}
        className={`${selectedWork ? styles.activeIndex : ""}`}
      >
        <div id={styles.worksIndex}>
          {works.map(work => {
            const title = work.node.frontmatter.title
            const url = work.node.fields.slug
            const featimg = work.node.frontmatter.featimg
            const skills = work.node.frontmatter.skills

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
                <div className={styles.MWorkThumbWrap}>
                  <GatsbyImage
                    image={getImage(featimg)}
                    alt={title}
                    key={id}
                    className={styles.MWorkThumb}
                    data-img={"img-" + id}
                    id={styles["img-" + id]}
                  />
                </div>
                {/* <div className={styles.thumbOverlay}></div> */}
                <h2 key={id}>{title}</h2>
                <p className={styles.workSkills}>{skills}</p>
              </a>
            )
          })}
        </div>
        <div id={styles.bgImgWrapper}>
          {works.map(work => {
            const key = work.node.frontmatter.order
            const title = work.node.frontmatter.title
            const featimg = work.node.frontmatter.featimg
            const id = work.node.id
            return (
              <GatsbyImage
                image={getImage(featimg)}
                alt={title}
                key={id}
                className={`${styles.workImg} ${
                  selectedWork === id ? styles.visible : ""
                }`}
                data-img={"img-" + id}
                id={styles["img-" + id]}
              />
            )
          })}
          <div id={styles.imgOverlay}></div>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="Em Karimifar | Portfolio" />

export default WorksPage

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
