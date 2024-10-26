"use client";

import { Comment } from "@/utils/types/models";
import { useActionState } from "react";
import { deleteCommentAction } from "./action";
import { CommentCard as CommentCardPresentation } from "./presentation";

type Props = {
  slug: string;
  comment: Comment;
};

export const CommentCard = ({ slug, comment }: Props) => {
  const [_state, dispatch, isPending] = useActionState(deleteCommentAction, undefined);

  return (
    <CommentCardPresentation
      comment={comment}
      showTrash={true}
      deleteCommentAction={() => {
        if (!confirm("Delete comment?")) {
          return;
        }
        dispatch({ slug, id: comment.id });
      }}
      isPending={isPending}
    />
  );
};
