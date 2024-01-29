import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

import * as styles from "../styles/works.module.css"

const AboutPage = ({ data }) => {
  return (
    <Layout>
      <div className={styles.aboutWrap}>Hi</div>
    </Layout>
  )
}

export const Head = () => <Seo title="Em Karimifar | About" />

export default AboutPage

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
