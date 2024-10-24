import { Button } from "@/modules/common/components/button";
import { ErrorMessage } from "@/modules/common/components/errorMessage";
import { KeyboardEventHandler } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Tag } from "../tag";
import { FormState, Inputs } from "./types";
import { Article } from "@/utils/types/models";

type Props = {
  defaultValues?: Article;
  formState?: FormState;
  onSubmit?: (inputs: Inputs) => void;
  isPending?: boolean;
};

export const ArticleEditor = ({ defaultValues, formState, onSubmit, isPending }: Props) => {
  const { register, control, handleSubmit, getValues, resetField } = useForm<Inputs>({
    defaultValues: {
      ...defaultValues,
      tagList: defaultValues?.tagList.map((tag) => ({ value: tag })),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tagList",
  });

  const onTagFormKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    switch (event.key) {
      case "Enter":
        // prevent form submit
        event.preventDefault();

        const tag = getValues("tag");

        if (tag === "") {
          return;
        }

        append({ value: tag });
        resetField("tag");
      default:
        return;
    }
  };

  return (
    <>
      <ErrorMessage errors={formState?.errors ?? {}} />
      <form onSubmit={onSubmit && handleSubmit(onSubmit)}>
        <input type="hidden" {...register("slug")} />
        <fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Article Title"
              {...register("title")}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="What's this article about?"
              {...register("description")}
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control"
              rows={8}
              placeholder="Write your article (in markdown)"
              {...register("body")}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter tags"
              onKeyDown={onTagFormKeyDown}
              {...register("tag")}
            />
            <ul className="tag-list">
              {fields.map((field, index) => (
                <li key={index}>
                  <input type="hidden" {...register(`tagList.${index}.value`)} />
                  <Tag as="span" variant="filled" onClick={() => remove(index)}>
                    <i className="ion-close-round" />
                    {field.value}
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
