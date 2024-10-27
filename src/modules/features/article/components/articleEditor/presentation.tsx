import { Button } from "@/modules/common/components/button";
import { ErrorMessage } from "@/modules/common/components/errorMessage";
import { KeyboardEventHandler } from "react";
import { Tag } from "../tag";
import { Article } from "@/utils/types/models";
import { getInputProps, getTextareaProps, SubmissionResult, useForm } from "@conform-to/react";
import { inputsSchema } from "./types";
import { parseWithZod } from "@conform-to/zod";

type Props = {
  defaultValues?: Article;
  action?: (formData: FormData) => void;
  isPending?: boolean;
  result?: SubmissionResult<string[]>;
};

export const ArticleEditor = ({ defaultValues, result, action, isPending }: Props) => {
  const [form, fields] = useForm({
    lastResult: result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: inputsSchema });
    },
    defaultValue: { ...defaultValues },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const onTagFormKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    switch (event.key) {
      case "Enter":
        // prevent form submit
        event.preventDefault();

        const tag = fields.tag.value;
        if (!tag) {
          return;
        }
        form.insert({ name: fields.tagList.name, defaultValue: tag });
      default:
        return;
    }
  };

  const onClickRemoveTag = (index: number) => {
    form.remove({ name: fields.tagList.name, index });
  };

  return (
    <>
      <ErrorMessage messages={form.errors} />
      <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate={true}>
        <input {...getInputProps(fields.slug, { type: "hidden" })} key={fields.slug.key} />
        <fieldset>
          <fieldset className="form-group">
            <input
              {...getInputProps(fields.title, { type: "text" })}
              placeholder="Article Title"
              className="form-control form-control-lg"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              {...getInputProps(fields.description, { type: "text" })}
              placeholder="What's this article about?"
              className="form-control"
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              {...getTextareaProps(fields.body)}
              rows={8}
              placeholder="Write your article (in markdown)"
              className="form-control"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              {...getInputProps(fields.tag, { type: "text" })}
              placeholder="Enter tags"
              onKeyDown={onTagFormKeyDown}
              className="form-control"
            />
            <ul className="tag-list">
              {fields.tagList.getFieldList().map((tagField, index) => (
                <li key={tagField.key}>
                  <Tag as="span" variant="filled">
                    <button onClick={() => onClickRemoveTag(index)}>
                      <i className="ion-close-round" />
                    </button>
                    <input
                      type="text"
                      name={tagField.name}
                      value={tagField.value}
                      style={{ background: "none" }}
                      readOnly={true}
                    />
                  </Tag>
                </li>
              ))}
            </ul>
          </fieldset>
          <Button
            component="button"
            size="lg"
            color="primary"
            variant="filled"
            type="submit"
            className="pull-xs-right"
            disabled={isPending}
          >
            Publish Article
          </Button>
        </fieldset>
      </form>
    </>
  );
};
