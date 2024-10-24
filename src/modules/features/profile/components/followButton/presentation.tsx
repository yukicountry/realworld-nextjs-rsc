import { Button, Color } from "@/modules/common/components/button";
import { MouseEventHandler } from "react";

type Props = {
  username: string;
  color?: Color;
  following?: boolean;
  handleClickFollow?: MouseEventHandler<HTMLButtonElement>;
  isPending?: boolean;
};

export const FollowButton = ({ username, color, following, handleClickFollow, isPending }: Props) => {
  return (
    <Button
      component="button"
      type="submit"
      className="action-btn"
      color={color}
      variant={following ? "filled" : "outline"}
      onClick={handleClickFollow}
      disabled={isPending}
    >
      <i className="ion-plus-round"></i> {following ? "Unfollow" : "Follow"} {username}
    </Button>
  );
};
