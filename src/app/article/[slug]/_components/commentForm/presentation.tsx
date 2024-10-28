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
    shouldRevalidate: "onBlur",
  });

  return (
    <>
      <form id={form.id} action={postCommentAction} onSubmit={form.onSubmit} className="card comment-form">
        <input type="hidden" key={fields.slug.key} name={fields.slug.name} defaultValue={fields.slug.initialValue} />
        <div className="card-block">
          <textarea
            key={fields.body.key}
            name={fields.body.name}
            defaultValue={fields.body.initialValue}
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
    </>
  );
};
