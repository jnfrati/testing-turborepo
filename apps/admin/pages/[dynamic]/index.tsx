import { useRouter } from "next/router";
import { Button } from "ui";

export default function Docs() {
  const { query } = useRouter();

  return (
    <div>
      <h1>Docs</h1>
      {query.dinamic}
      <Button />
    </div>
  );
}
