const path = require(`path`)
const _ = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Works

// Default subject taxonomy to "random" if no subject provided.
// exports.createSchemaCustomization = ({ actions, schema }) => {
//   const { createTypes } = actions
//   const typeDefs = [
//     "type MarkdownRemark implements Node { frontmatter: Frontmatter }",
//     schema.buildObjectType({
//       name: "Frontmatter",
//       fields: {
//         subject: {
//           type: "[String!]",
//           resolve(source, args, context, info) {
//             const { subject } = source
//             if (
//               source.subject == null ||
//               (Array.isArray(subject) && !subject.length)
//             ) {
//               return ["random"]
//             }
//             return subject
//           },
//         },
//       },
//     }),
//   ]
//   createTypes(typeDefs)
// }

// Markdown items: Create slug nodes based on folder
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content` })

    actions.createNodeField({
      node,
      name: `slug`,
      value: `/works${slug}`,
    })
  }
}

// Generate pages for each work.

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  // Query all the data
  const queryResult = await graphql(`
    {
      workQuery: allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  if (queryResult.errors) {
    reporter.panic("error loading works", queryResult.errors)
    return
  }

  // Generate single work pages
  const works = queryResult.data.workQuery.edges
  works.forEach(work => {
    createPage({
      path: work.node.fields.slug,
      component: path.resolve(`./src/templates/work.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: work.node.fields.slug,
      },
    })
  })
}
