import { FC } from 'hono/jsx'

export const postsPage: FC<{ posts: { title: string; url: string }[] }> = ({ posts }) => (
  <section id="posts">
    <h2>All posts</h2>
    <ul>
      {posts.map((p) => (
        <li key={p.url}>
          <a href={p.url} target="_blank" rel="noopener noreferrer">
            {p.title}
          </a>
        </li>
      ))}
    </ul>
  </section>
)
