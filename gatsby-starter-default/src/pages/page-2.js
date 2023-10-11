import * as React from "react"
import { Link } from "gatsby"

import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"

const SecondPage = () => (
  <Layout>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
    <StaticImage
      src="../../content/Example/images/test.png"
      layout="constrained"
      objectFit="cover"
      height={200}
      width={1800}
      loading="lazy"
    />
  </Layout>
)

export const Head = () => <Seo title="Page two" />

export default SecondPage
