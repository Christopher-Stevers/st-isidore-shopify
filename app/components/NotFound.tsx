import { Link } from "react-router";

export function NotFound({ type = "page" }: { type?: string }) {
  const heading = `We’ve lost this ${type}`;
  const description = `We couldn’t find the ${type} you’re looking for. Try checking the URL or heading back to the home page.`;

  return (
    <>
      <div>{description}</div>
      <Link to={"/"}>Take me to the home page</Link>
    </>
  );
}
