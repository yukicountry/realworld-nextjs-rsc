import { Button } from "@/modules/common/components/button";
import { MouseEventHandler } from "react";

type Props = {
  favorited: boolean;
  favoritesCount: number;
  handleClickFavorite?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  showMessage?: boolean;
  className?: string;
};

export const FavoriteButton = ({
  favorited,
  favoritesCount,
  handleClickFavorite,
  disabled,
  showMessage,
  className,
}: Props) => {
  const Content = () =>
    showMessage ? (
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
    <Button
      component="button"
      onClick={handleClickFavorite}
      variant={favorited ? "filled" : "outline"}
      disabled={disabled}
      className={className}
    >
      <Content />
    </Button>
  );
};
