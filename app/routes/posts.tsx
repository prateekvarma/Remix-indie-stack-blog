import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const posts = [
    {
      slug: "my-first-post",
      title: "My First Post",
    },
    {
      slug: "my-second-post",
      title: "My Second Post",
    },
  ];

  //   const postsString = JSON.stringify({ posts });

  //   return new Response(postsString, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // the one line below is the equivalent of the above Response

  return json({ posts });
};

export default function PostsRoute() {
  const { posts } = useLoaderData();

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug} className="text-blue-600 underline">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
