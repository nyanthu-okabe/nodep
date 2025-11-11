import { FC } from 'hono/jsx'

// ページコンポーネント（同期）
export const postPage: FC<{ posts: { title: string; url: string }[] }> = ({ posts }) => (
  <section id="posts">
    <h2>All posts</h2>
      {posts.map((p) => (
				<a href={p.url} target="_blank" rel="noopener noreferrer">
					{p.title}
				</a>
      ))}
  </section>
)
