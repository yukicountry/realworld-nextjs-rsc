"use server";

import { createApiClient } from "@/utils/api/apiClient";
import { State } from "./types";

export const followAction = async (state: State, username: string): Promise<State> => {
  const apiClient = createApiClient({
    path: "/profiles/{username}/follow",
    method: state.following ? "delete" : "post",
    params: {
      path: {
        username,
      },
    },
  });

  const response = await apiClient.sendRequest();

  if (response.result === "success") {
    return {
      following: response.data.profile.following,
    };
  }

  throw new Error("api error");
};
