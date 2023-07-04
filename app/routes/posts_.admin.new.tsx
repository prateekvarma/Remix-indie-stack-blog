import { Form, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { createPost } from "~/models/post.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());

  const title = formData.title;
  const slug = formData.slug;
  const markdown = formData.markdown;

  const errors = {
    title: title ? null : "title is required",
    slug: slug ? null : "slug is required",
    markdown: markdown ? null : "markdown is required",
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json(errors);
  }

  await createPost({ title, slug, markdown });

  return redirect("/posts/admin");
};

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function NewPostRoute() {
  const errors = useActionData();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title: { errors?.title ? (
            <em className="text-red-600">{errors.title}</em>
          ): null }
          <input type="text" name="title" className={inputClassName} />
        </label>
      </p>
      <p>
        <label>
          Post Slug: { errors?.slug ? (
            <em className="text-red-600">{errors.slug}</em>
          ): null }
          <input type="text" name="slug" className={inputClassName} />
        </label>
      </p>
      <p>
        <label>Markdown:</label>
        { errors?.markdown ? (
            <em className="text-red-600">{errors.markdown}</em>
          ): null }
        <textarea
          id="markdown"
          rows={20}
          name="markdown"
          className={`${inputClassName} font-mono`}
        />
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 text-white hover:to-blue-800"
        >
          Create Post
        </button>
      </p>
    </Form>
  );
}
