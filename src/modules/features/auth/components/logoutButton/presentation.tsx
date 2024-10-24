import { Button } from "@/modules/common/components/button";
import { FormEventHandler } from "react";

type Props = { onSubmit?: FormEventHandler<HTMLFormElement>; isPending?: boolean };

export const LogoutButton = ({ onSubmit, isPending }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <Button component="button" color="danger" type="submit" size="lg" disabled={isPending}>
        Or click here to logout.
      </Button>
    </form>
  );
};
