import { Button } from "@/modules/common/components/button";
import { MouseEventHandler } from "react";

type Props = {
  favorited: boolean;
  favoritesCount: number;
  action?: () => void;
  disabled?: boolean;
  showMessage?: boolean;
  className?: string;
};

export const FavoriteButton = ({ favorited, favoritesCount, action, disabled, showMessage, className }: Props) => {
  const content = showMessage ? (
    <>
      <i className="ion-heart"></i> {favorited ? "Unfavorite Article " : "Favorite Article "}
      <span className="counter">({favoritesCount})</span>
    </>
  ) : (
    <>
      <i className="ion-heart"></i> {favoritesCount}
    </>
  );

  return (
    <form action={action}>
      <Button component="button" variant={favorited ? "filled" : "outline"} disabled={disabled} className={className}>
        {content}
      </Button>
    </form>
  );
};
