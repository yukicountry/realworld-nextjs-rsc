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
  const [state, action, isPending] = useActionState(followAction, { following });

  return (
    <FollowButtonPresentation
      username={username}
      following={state.following}
      action={() => action(username)}
      isPending={isPending}
      color={color}
    />
  );
};
