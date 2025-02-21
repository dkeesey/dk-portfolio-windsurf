export function TypographyDemo() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Typography Demo
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          The king, seeing how much happier his subjects were, realized the error of
          his ways and promised to rule with justice.
        </p>
      </div>

      <div>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          The Joke Tax
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          The king, seeing how much happier his subjects were, realized the error of
          his ways and promised to rule with justice.
        </p>
      </div>

      <div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          The Punchline Tax
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          The king, seeing how much happier his subjects were, realized the error of
          his ways and promised to rule with justice.
        </p>
      </div>

      <div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          People stopped telling jokes
        </h4>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          The king, seeing how much happier his subjects were, realized the error of
          his ways and promised to rule with justice.
        </p>
      </div>
    </div>
  );
}
