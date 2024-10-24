"use server";

import { createApiClient } from "@/utils/api/apiClient";
import { redirect } from "next/navigation";
import { FormState, Inputs } from "./types";

export const createArticleAction = async (_prevState: FormState, inputs: Inputs) => {
  const client = createApiClient({
    path: "/articles",
    method: "post",
    params: {
      body: {
        article: {
          ...inputs,
          tagList: inputs.tagList.map((tag) => tag.value),
        },
      },
    },
  });

  const response = await client.sendRequest();

  if (response.result === "success") {
    redirect(`/article/${response.data.article.slug}`);
  }

  throw new Error("api error");
};

export const updateArticleAction = async (_prevState: FormState, inputs: Inputs) => {
  const client = createApiClient({
    path: "/articles/{slug}",
    method: "put",
    params: {
      path: {
        slug: inputs.slug,
      },
      body: {
        article: inputs,
      },
    },
  });

  const response = await client.sendRequest();

  if (response.result === "success") {
    redirect(`/article/${response.data.article.slug}`);
  }

  throw new Error("api error");
};
