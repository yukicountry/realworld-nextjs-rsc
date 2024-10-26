import { Button } from "@/modules/common/components/button";
import { ErrorMessage } from "@/modules/common/components/errorMessage";
import { getInputProps, SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { inputsSchema } from "./types";

type Props = {
  action?: (formData: FormData) => void;
  isPending?: boolean;
  result?: SubmissionResult<string[]>;
};

export const LoginForm = ({ result, action, isPending }: Props) => {
  const [form, fields] = useForm({
    lastResult: result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: inputsSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <>
      <ErrorMessage errors={form.allErrors} />
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate={true}>
        <fieldset className="form-group">
          <input
            {...getInputProps(fields.email, {
              type: "email",
            })}
            placeholder="Email"
            className="form-control form-control-lg"
          />
        </fieldset>
        <fieldset className="form-group">
          <input
            {...getInputProps(fields.password, {
              type: "password",
            })}
            placeholder="Password"
            className="form-control form-control-lg"
          />
        </fieldset>
        <Button component="button" size="lg" type="submit" className="pull-xs-right" disabled={isPending}>
          Sign in
        </Button>
      </form>
    </>
  );
};
