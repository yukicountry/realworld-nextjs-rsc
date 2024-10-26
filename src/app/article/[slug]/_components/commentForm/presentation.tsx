import { Button } from "@/modules/common/components/button";
import { getInputProps, getTextareaProps, SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { inputsSchema } from "./types";

type Props = {
  slug?: string;
  authorImage?: string;
  result?: SubmissionResult<string[]>;
  postCommentAction?: (formData: FormData) => void;
  isPending?: boolean;
};

export const CommentForm = ({ slug, authorImage, result, postCommentAction, isPending }: Props) => {
  const [form, fields] = useForm({
    defaultValue: {
      slug,
    },
    lastResult: result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: inputsSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <form id={form.id} action={postCommentAction} onSubmit={form.onSubmit} className="card comment-form">
      <input {...getInputProps(fields.slug, { type: "hidden" })} />
      <div className="card-block">
        <textarea
          {...getTextareaProps(fields.body)}
          placeholder="Write a comment..."
          rows={3}
          className="form-control"
        ></textarea>
      </div>
      <div className="card-footer">
        {authorImage && <img src={authorImage} alt="" className="comment-author-img" />}
        <Button component="button" type="submit" disabled={isPending}>
          Post Comment
        </Button>
      </div>
    </form>
  );
};
