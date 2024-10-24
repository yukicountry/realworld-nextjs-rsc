"use client";

import { use, useActionState } from "react";
import { createArticleAction, updateArticleAction } from "./action";
import { ArticleEditor as ArticleEditorPresentation } from "./presentation";
import { initialFormState } from "./types";
import { Article } from "@/utils/types/models";

export const CreateArticleEditor = () => {
  const [formState, dispatch, isPending] = useActionState(createArticleAction, initialFormState);

  return <ArticleEditorPresentation formState={formState} onSubmit={dispatch} isPending={isPending} />;
};

export const UpdateArticleEditor = ({ defaultValues }: { defaultValues: Promise<Article> }) => {
  const [formState, dispatch, isPending] = useActionState(updateArticleAction, initialFormState);

  return (
    <ArticleEditorPresentation
      defaultValues={use(defaultValues)}
      formState={formState}
      onSubmit={dispatch}
      isPending={isPending}
    />
  );
};
