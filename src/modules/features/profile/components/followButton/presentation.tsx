import { Button, Color } from "@/modules/common/components/button";
import styles from "./presentation.module.css";

type Props = {
  username: string;
  color?: Color;
  following?: boolean;
  action?: () => void;
  isPending?: boolean;
};

export const FollowButton = ({ username, color, following, action, isPending }: Props) => {
  return (
    <form action={action} className={styles["form"]}>
      <Button
        component="button"
        type="submit"
        className="action-btn"
        color={color}
        variant={following ? "filled" : "outline"}
        disabled={isPending}
      >
        <i className="ion-plus-round"></i> {following ? "Unfollow" : "Follow"} {username}
      </Button>
    </form>
  );
};
