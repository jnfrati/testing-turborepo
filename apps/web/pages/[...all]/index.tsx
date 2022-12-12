import { useRouter } from "next/router";

export default function PublicFallback() {
  const { query } = useRouter();

  console.log(query);

  return (
    <div>
      <h1>Public</h1>
    </div>
  );
}
