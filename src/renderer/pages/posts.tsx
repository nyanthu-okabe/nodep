import { FC } from 'hono/jsx'

// 取得関数
async function fetchTitles() {
  const res = await fetch('https://dev.to/api/articles?username=nyanchu_okabe_b2a95eb4beb')
  if (!res.ok) throw new Error('Failed to fetch posts')
  const posts = await res.json()
  return posts.map((p: any) => ({
    title: p.title,
    url: p.url
  }))
}

// JSXコンポーネント
export const postsPage: FC = async () => {
  const posts = await fetchTitles()

  return (
    <section id="posts">
      <h2>All posts</h2>
        {posts.map((p) => (
          <a href={p.url} target="_blank" rel="noopener noreferrer">
            {p.title}
          </a>
        ))}
    </section>
  )
}
