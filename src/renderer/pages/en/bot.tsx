import type { FC } from 'hono/jsx'

const botPage: FC = () => {
  return (
    <section id="bot">
      <iframe
        style={{ width: '100%', height: '800px', border: 'none' }}
        src="https://nyanthubot.nyanthu.com/"
        title="nyanthubot"
      ></iframe>
      <a href="https://nyanthubot.nyanthu.com">nyanthubot.nyanthu.com</a>
    </section>
  )
}
export default botPage
