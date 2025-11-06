import type { FC } from 'hono/jsx'

export const docsPage: FC = () => {
  return (
    <section id="docs">
      <h2>Docs</h2>

      <details>
        <summary>nyanthu - admin</summary>
        <p style={{ color: "gray" }}>
          <strong style={{ color: "black" }}>nyanchu okabe</strong> - CEO / Admin
        </p>
        <p>3D C++ Developer</p>
      </details>

      <details>
        <summary>snapshot</summary>
        <p>1.01v - NyanthuGame</p>
        <img src="/s1.png" style={{ height: "200px", width: "auto" }} />
      </details>
      <details>
        <summary>Pkgm Setup</summary>
        <p>
          Download and install pkgm:
          <code>curl https://www.nyanthu.com/pkgm.sh | sh</code>
        </p>
      </details>
      <details>
        <summary>About Studio</summary>
        <div style={{ display: "flex" }}>
          <img src="/favicon2.png" style={{ height: "100px", width: "auto" }} />
          <p>
            <strong>NyanthuStudio</strong>
            <br />

            <a href="mailto:nyanthu@email.com">nyanthu@email.com</a>
            <br />
            <a href="https://discord.gg/yG7sVGdgUX">Discord</a>
            <br />
            <a href="https://nyanthubot.nyanthu.com">Ask to bot</a>
          </p>
        </div>
        <p>
          A studio founded in August 2025, dedicated to achieving ultimate stability and performance — aiming to make every
          millisecond from click to gameplay completion faster.
        </p>
      </details>
    </section>
  )
}
