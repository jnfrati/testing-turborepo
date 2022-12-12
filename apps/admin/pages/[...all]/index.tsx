import { useRouter } from "next/router";

export default function AdminFallback() {
  const { query } = useRouter();

  console.log(query);

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
}
