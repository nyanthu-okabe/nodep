import type { FC } from 'hono/jsx'

const NotFoundPage: FC = () => {
  return (
    <div role="main">
      <section id="not-found">
        <h2>404 - Page Not Found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <p>
          <a href="/">Return to the home page</a>
        </p>
      </section>
    </div>
  )
}
export default NotFoundPage
