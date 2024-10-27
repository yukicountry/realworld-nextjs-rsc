"use server";

import { createApiClient } from "@/utils/api/apiClient";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { inputsSchema } from "./types";

export const createArticleAction = async (_prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: inputsSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const client = createApiClient({
    path: "/articles",
    method: "post",
    params: {
      body: {
        article: submission.value,
      },
    },
  });

  // const client = createApiClient({
  //   path: "/articles",
  //   method: "post",
  //   params: {
  //     body: {
  //       article: {
  //         ...inputs,
  //         tagList: inputs.tagList.map((tag) => tag.value),
  //       },
  //     },
  //   },
  // });

  const response = await client.sendRequest();

  if (response.result === "success") {
    redirect(`/article/${response.data.article.slug}`);
  }

  throw new Error("api error");
};

export const updateArticleAction = async (_prevState: unknown, formData: FormData) => {
  const submission = parseWithZod(formData, { schema: inputsSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { slug, ...article } = submission.value;
  if (slug == null) {
    throw new Error("Slug is unexpectedly set to null.");
  }

  const client = createApiClient({
    path: "/articles/{slug}",
    method: "put",
    params: {
      path: {
        slug,
      },
      body: {
        article,
      },
    },
  });

  const response = await client.sendRequest();

  if (response.result === "success") {
    redirect(`/article/${response.data.article.slug}`);
  }

  throw new Error("api error");
};
