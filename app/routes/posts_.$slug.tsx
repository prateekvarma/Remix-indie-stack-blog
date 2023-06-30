import { marked } from "marked";
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/post.server";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  invariant(slug, "slug is required");
  const post = await getPost(slug);

  invariant(post, `post not found: ${slug}`);
  const html = marked(post.markdown);
  return json({ post, html });
};

export default function PostRoute() {
  const { post, html } = useLoaderData();
  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
