import { useRouter } from "next/router";
import { Button } from "ui";

export default function Docs() {
  const { query } = useRouter();

  return (
    <div>
      <h1>Dynamic web</h1>
      {query.dynamic}
      <Button />
    </div>
  );
}
