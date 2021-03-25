import { createClient } from "contentful";

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
});

export default async function getContent(slug) {
  const content = await client.getEntries({
    content_type: "page",
    limit: 1,
    include: 10,
    "fields.slug": slug,
  });

  return content;
}
