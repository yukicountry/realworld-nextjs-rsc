"use client";

import { useActionState } from "react";
import { favoriteAction } from "./action";
import { FavoriteButton as FavoriteButtonPresentation } from "./presentation";

type Props = {
  slug: string;
  favorited: boolean;
  favoritesCount: number;
  showMessage?: boolean;
  className?: string;
};

export const FavoriteButton = ({ slug, favorited, favoritesCount, showMessage, className }: Props) => {
  const [state, dispatch, isPending] = useActionState(favoriteAction, {
    favorited,
    favoritesCount,
  });

  const handleClickFavorite = () => {
    dispatch(slug);
  };

  return (
    <FavoriteButtonPresentation
      {...state}
      handleClickFavorite={handleClickFavorite}
      disabled={isPending}
      showMessage={showMessage}
      className={className}
    />
  );
};
