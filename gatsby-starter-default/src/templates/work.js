import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import _ from "lodash"
import Seo from "../components/Seo"
import Layout from "../components/Layout"
import * as styles from "./work.module.css"
import "../styles/work.css"

const Work = ({ data }) => {
  const work = data.markdownRemark

  console.log(work.frontmatter)
  return (
    <Layout>
      <Seo
        title={work.frontmatter.title}
        description={work.excerpt}
        image="/logo.png"
        pathname={work.fields.slug}
      />
      <div className={styles.banner}>
        <div className={styles.workInfo}>
          <h1>{work.frontmatter.title}</h1>
          {work.frontmatter.client && (
            <p className={styles.client}>
              <span>Client: </span>
              {work.frontmatter.client}
            </p>
          )}
          <p className={styles.workDate}>
            <span>Date: </span>
            {work.frontmatter.date}
          </p>
          <p className={styles.role}>
            <span>Role: </span>
            {work.frontmatter.role}
          </p>
        </div>

        {work.frontmatter.featimg && (
          <div className={styles.featimgContainer}>
            <GatsbyImage
              image={getImage(work.frontmatter.featimg)}
              alt={work.frontmatter.title}
              className={styles.featimg}
            />
            <div className={styles.featimgCover}></div>
          </div>
        )}
      </div>
      <div
        className={styles.contentWrap}
        // See https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
        dangerouslySetInnerHTML={{ __html: work.html }}
      />
    </Layout>
  )
}
export default Work

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        date
        role
        client
        featimg {
          childImageSharp {
            gatsbyImageData(placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
  }
`
