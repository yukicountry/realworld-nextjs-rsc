import { fetchComments } from "@/modules/features/article/fetch/fetchComments";
import { CommentCard } from "../commentCard";
import { fetchCurrentUser } from "@/modules/features/auth/fetch/fetchCurrentUser";

type Props = {
  slug: string;
};

export const CommentList = async ({ slug }: Props) => {
  const comments = await fetchComments(slug);
  const currentUserPromise = fetchCurrentUser();

  return (
    <>
      {comments.map((comment, index) => (
        <CommentCard key={index} slug={slug} comment={comment} currentUserPromise={currentUserPromise} />
      ))}
    </>
  );
};
