import { Button } from "@/modules/common/components/button";
import { MouseEventHandler } from "react";

type Props = {
  handleClickDelete?: MouseEventHandler<HTMLButtonElement>;
  isPending?: boolean;
};

export const DeleteArticleButton = ({ handleClickDelete, isPending }: Props) => {
  return (
    <Button component="button" color="danger" onClick={handleClickDelete} disabled={isPending}>
      <i className="ion-trash-a"></i> Delete Article
    </Button>
  );
};
