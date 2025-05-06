import {Link} from '@remix-run/react';

export function GenericError({
  error,
}: {
  error?: {message: string; stack?: string};
}) {
  const heading = `Something’s wrong here.`;
  let description = `We found an error while loading this page.`;

  // TODO hide error in prod?
  if (error) {
    description += `\n${error.message}`;
    // eslint-disable-next-line no-console
    console.error(error);
  }

  return (
    <>
      <div className="text-center text-2xl font-bold">{description}</div>
      {error?.stack && (
        <pre
          style={{
            padding: '2rem',
            background: 'hsla(10, 50%, 50%, 0.1)',
            color: 'red',
            overflow: 'auto',
            maxWidth: '100%',
          }}
          dangerouslySetInnerHTML={{
            __html: addLinksToStackTrace(error.stack),
          }}
        />
      )}
      <Link to={'/'}>Take me to the home page</Link>
    </>
  );
}

function addLinksToStackTrace(stackTrace: string) {
  return stackTrace?.replace(
    /^\s*at\s?.*?[(\s]((\/|\w\:).+)\)\n/gim,
    (all, m1) =>
      all.replace(
        m1,
        `<a href="vscode://file${m1}" class="hover:underline">${m1}</a>`,
      ),
  );
}
