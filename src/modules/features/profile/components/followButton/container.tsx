"use client";

import { useActionState } from "react";
import { followAction } from "./action";
import { FollowButton as FollowButtonPresentation } from "./presentation";
import { Color } from "@/modules/common/components/button";

type Props = {
  username: string;
  following: boolean;
  color?: Color;
};

export const FollowButton = ({ username, following, color }: Props) => {
  const [state, dispatch, isPending] = useActionState(followAction, { following });

  const handleClickFollow = () => {
    dispatch(username);
  };

  return (
    <FollowButtonPresentation
      username={username}
      {...state}
      handleClickFollow={handleClickFollow}
      isPending={isPending}
      color={color}
    />
  );
};
