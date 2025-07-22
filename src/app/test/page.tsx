export default async function Test() {
  const data = await fetch('http://localhost:3000/express_app/api/kontent/svg-text');
  const posts = await data.json();
  console.log(posts)
  return (
    <ul>
      {posts.map(({ id, text }) => (
        <li key={id}>{text}</li>
      ))}
    </ul>
  );
}
