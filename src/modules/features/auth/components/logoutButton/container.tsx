"use client";

import { FormEventHandler, useActionState } from "react";
import { logoutAction } from "./action";
import { LogoutButton as LogoutButtonPresentation } from "./presentation";

export const LogoutButton = () => {
  const [_formState, dispatch, isPending] = useActionState(logoutAction, undefined);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    dispatch();
  };

  return <LogoutButtonPresentation onSubmit={handleSubmit} isPending={isPending} />;
};
