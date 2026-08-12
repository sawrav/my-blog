import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./about.module.css";

export default function About(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="About"
      description="Learn more about the author of this blog."
    >
      <main className={styles.aboutPage}>
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.avatarWrapper}>
              {/* Placeholder avatar — replace with your photo */}
              <svg
                className={styles.avatarSvg}
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle cx="40" cy="40" r="40" fill="#232F3E" />
                <circle cx="40" cy="30" r="14" fill="#FF9900" />
                <ellipse cx="40" cy="62" rx="22" ry="14" fill="#FF9900" />
              </svg>
            </div>

            <h1 className={styles.name}>Sawrav Roy</h1>
            <p className={styles.tagline}>
              Engineer · Scientist · Philosopher
            </p>

            <div className={styles.socialRow}>
              <a
                href="https://www.linkedin.com/in/sawravroy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <span className={styles.divider}>·</span>
              <a
                href="https://github.com/sawravroy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                GitHub
              </a>
              <span className={styles.divider}>·</span>
              <a
                href="https://twitter.com/sawravroy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="X / Twitter"
              >
                X / Twitter
              </a>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <section className={styles.section}>
            <h2>About this blog</h2>
            <p>
              This is my personal corner of the internet — a place where I
              write long-form, considered thoughts on the things I care about
              most: the frontiers of <strong>Science</strong>, the craft of{" "}
              <strong>Engineering</strong>, and the enduring questions of{" "}
              <strong>Philosophy</strong>.
            </p>
            <p>
              I believe the best ideas sit at the intersection of these three
              disciplines. A great engineer thinks scientifically about
              uncertainty. A good scientist needs philosophical clarity about
              what "explanation" really means. And philosophy without
              grounding in how the world actually works is just word games.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Topics I write about</h2>
            <div className={styles.topicsGrid}>
              <div className={styles.topicCard}>
                <span className={styles.topicIcon}>🔬</span>
                <h3>Science</h3>
                <p>
                  Physics, biology, cosmology, and the philosophy of science.
                  What do we know, how do we know it, and what can't we know?
                </p>
                <a href="/tags/science">Browse posts →</a>
              </div>
              <div className={styles.topicCard}>
                <span className={styles.topicIcon}>⚙️</span>
                <h3>Engineering</h3>
                <p>
                  Software systems, distributed computing, AI, and the art of
                  building things that work reliably at scale.
                </p>
                <a href="/tags/engineering">Browse posts →</a>
              </div>
              <div className={styles.topicCard}>
                <span className={styles.topicIcon}>💭</span>
                <h3>Philosophy</h3>
                <p>
                  Epistemology, ethics, consciousness, and the classic
                  problems that refuse to go away no matter how clever we get.
                </p>
                <a href="/tags/philosophy">Browse posts →</a>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Subscribe</h2>
            <p>
              New posts are infrequent but substantial. Subscribe via RSS to
              get notified when something new appears.
            </p>
            <div className={styles.feedRow}>
              <a href="/rss.xml" className={styles.feedBtn}>
                RSS Feed
              </a>
              <a href="/atom.xml" className={styles.feedBtn}>
                Atom Feed
              </a>
              <a href="/feed.json" className={styles.feedBtn}>
                JSON Feed
              </a>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
