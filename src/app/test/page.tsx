export default async function Test() {
  const res = await fetch('http://localhost:3000/express_app/api/kontent/svg-text');
  if (!res.ok) {
    return <div>Error: {res.status}</div>;
  }
  const posts = await res.json();
  return (
    <ul>
      {posts.map(({ id, text }: { id: number; text: string }) => (
        <li key={id}>{text}</li>
      ))}
    </ul>
  );
}
