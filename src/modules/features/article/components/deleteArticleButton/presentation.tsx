import { Button } from "@/modules/common/components/button";
import { MouseEventHandler } from "react";
import styles from "./presentation.module.css";

type Props = {
  handleClickDelete?: MouseEventHandler<HTMLButtonElement>;
  action?: () => void;
  isPending?: boolean;
};

export const DeleteArticleButton = ({ action, isPending }: Props) => {
  return (
    <form action={action} className={styles["form"]}>
      <Button component="button" color="danger" type="submit" disabled={isPending}>
        <i className="ion-trash-a"></i> Delete Article
      </Button>
    </form>
  );
};
