import { fetchComments } from "@/modules/features/article/fetch/fetchComments";
import { CommentCard } from "../commentCard";

type Props = {
  slug: string;
};

export const CommentList = async ({ slug }: Props) => {
  const comments = await fetchComments(slug);

  return (
    <>
      {comments.map((comment, index) => (
        <CommentCard key={index} slug={slug} comment={comment} />
      ))}
    </>
  );
};
