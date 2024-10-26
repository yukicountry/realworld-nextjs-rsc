"use server";

import { createApiClient } from "@/utils/api/apiClient";
import { revalidateTag } from "next/cache";
import { Inputs } from "./types";

export const deleteCommentAction = async (_prevState: undefined, inputs: Inputs): Promise<undefined> => {
  const apiClient = createApiClient({
    path: "/articles/{slug}/comments/{id}",
    method: "delete",
    params: {
      path: inputs,
    },
  });

  const response = await apiClient.sendRequest();

  if (response.result === "success") {
    revalidateTag("");
    return undefined;
  }

  throw new Error("api error");
};
