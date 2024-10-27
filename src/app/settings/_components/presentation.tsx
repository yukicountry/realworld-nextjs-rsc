import { Button } from "@/modules/common/components/button";
import { ErrorMessage } from "@/modules/common/components/errorMessage";
import { inputsSchema } from "./types";
import { User } from "@/utils/types/models";
import { getInputProps, getTextareaProps, SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

type Props = {
  user?: User;
  action?: (formData: FormData) => void;
  isPending?: boolean;
  result?: SubmissionResult<string[]>;
};

export const SettingsForm = ({ user, action, isPending, result }: Props) => {
  const [form, fields] = useForm({
    lastResult: result,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: inputsSchema });
    },
    defaultValue: { ...user },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <>
      <ErrorMessage messages={form.errors} />
      <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate={true}>
        <fieldset>
          <fieldset className="form-group">
            <input
              {...getInputProps(fields.image, { type: "text" })}
              placeholder="URL of profile picture"
              className="form-control"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              {...getInputProps(fields.username, { type: "text" })}
              placeholder="Your Name"
              className="form-control form-control-lg"
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              {...getTextareaProps(fields.bio)}
              placeholder="Short bio about you"
              className="form-control form-control-lg"
              rows={8}
            ></textarea>
          </fieldset>
          <fieldset className="form-group">
            <input
              {...getInputProps(fields.email, { type: "email" })}
              placeholder="Email"
              className="form-control form-control-lg"
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              {...getInputProps(fields.password, { type: "password" })}
              placeholder="New Password"
              autoComplete="new-password"
              className="form-control form-control-lg"
            />
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
            Update Settings
          </Button>
        </fieldset>
      </form>
    </>
  );
};
