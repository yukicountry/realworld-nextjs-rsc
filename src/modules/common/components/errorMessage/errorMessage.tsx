type Props = {
  errors: Record<string, string[]>;
};

export const ErrorMessage = (props: Props) => {
  const errors = Object.entries(props.errors)
    .map(([key, value]) => {
      if (value.length < 1) {
        return undefined;
      }

      return `${key} ${value.at(0)}`;
    })
    .filter((x) => x != null); // exclude undefined

  return (
    errors.length > 0 && (
      <ul className="error-messages" aria-live="polite">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    )
  );
};
