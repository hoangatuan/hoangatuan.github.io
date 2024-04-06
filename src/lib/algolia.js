import * as dotenv from "dotenv"
dotenv.config()

import algoliasearch from "algoliasearch"
const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_WRITE_API_KEY
)

// 1. Build a dataset
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import removeMd from "remove-markdown"

const filenames = fs.readdirSync(path.join("./src/content/post"))
const data = filenames.map(filename => {
  try {
    const markdownWithMeta = fs.readFileSync("./src/content/post/" + filename)
    const { data: frontmatter, content } = matter(markdownWithMeta)
    return {
      id: frontmatter.slug,
      title: frontmatter.title,
      content: removeMd(content).replace(/\n/g, ""),
    }
  } catch (e) {
    console.log(e.message)
  }
})

// 2. Send the dataset in JSON format
client
  .initIndex("posts")
  .saveObjects(JSON.parse(JSON.stringify(data)), { autoGenerateObjectIDIfNotExist: true })
  .then(res => console.log(res))
  .catch(err => {
    console.error('An error occurred:', err);
    process.exit(1); // Exit the process with an error code
  });