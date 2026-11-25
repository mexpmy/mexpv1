"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./TikTokLanding.module.css";

type Attribution = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    ttq?: { track: (event: string, properties?: Record<string, unknown>) => void };
  }
}

const ATTRIBUTION_KEY = "mexp:tiktok-attribution:v1";
const ATTRIBUTION_FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "ttclid",
] as const;

const destinations = [
  {
    number: "01",
    label: "AGENTIC WORKFLOWS",
    title: "Less busywork. More shipped.",
    description:
      "Small, focused AI products and agentic workflows built around real operational friction.",
    href: "https://microsaas.mymexp.com",
    action: "Explore microSaaS",
    tone: "lime",
  },
  {
    number: "02",
    label: "MONEY INTELLIGENCE",
    title: "Make the numbers useful.",
    description:
      "Practical finance tools that turn scattered information into clearer next moves.",
    href: "https://saasfinance.mymexp.com",
    action: "Explore finance",
    tone: "coral",
  },
  {
    number: "03",
    label: "PHYSICAL AI",
    title: "Intelligence meets the real world.",
    description:
      "Research into applied AI, simulation, and systems that interact with physical environments.",
    href: "https://rsx.mymexp.com",
    action: "Explore RSX",
    tone: "blue",
  },
  {
    number: "04",
    label: "FIELD NOTES",
    title: "What we learn, in public.",
    description:
      "Build notes, experiments, and ideas from the work as it happens.",
    href: "https://blog.mymexp.com",
    action: "Read the journal",
    tone: "yellow",
  },
];

function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function withAttribution(destination: string, attribution: Attribution) {
  const url = new URL(destination);
  Object.entries(attribution).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
}

export default function TikTokLanding() {
  const [attribution, setAttribution] = useState<Attribution>({});

  useEffect(() => {
    const incoming = new URLSearchParams(window.location.search);
    const saved = readAttribution();
    const next = { ...saved };

    ATTRIBUTION_FIELDS.forEach((field) => {
      const value = incoming.get(field);
      if (value) next[field] = value;
    });

    if (Object.keys(next).length > 0) {
      sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(next));
      setAttribution(next);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    document.querySelectorAll(`.${styles.reveal}`).forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const trackCTA = (cta: string, href: string) => {
    const event = {
      event: "mexp_cta_click",
      cta_name: cta,
      destination: href,
      ...attribution,
    };

    window.dataLayer?.push(event);
    window.ttq?.track("ClickButton", {
      content_name: cta,
      content_type: "product",
      content_id: href,
    });
  };

  return (
    <div className={styles.page}>
      <div className={styles.topline} aria-hidden="true">
        <span>MEXP / APPLIED SYSTEMS</span>
        <span>INDEPENDENT DIGITAL LAB · MY</span>
      </div>

      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.brand}>
            <Image src="/logo.png" alt="MEXP" width={42} height={42} priority />
            <span>MEXP</span>
            <span className={styles.brandDivider} />
            <span className={styles.brandNote}>SYSTEMS THAT MOVE WORK FORWARD</span>
          </div>

          <p className={styles.eyebrow}>ENGINEERED FOR THE NEXT MOVE <span>↘</span></p>
          <h1>Agentic AI for work that <em>should move faster.</em></h1>
          <p className={styles.intro}>
            We turn real-world friction into useful software, sharper decisions, and systems that can act.
          </p>

          <div className={styles.heroActions}>
            <a className={styles.primaryAction} href="#work">
              Find your next move <span aria-hidden="true">↓</span>
            </a>
            <span className={styles.actionNote}>4 live paths · 2 in the lab</span>
          </div>

          <div className={styles.heroMeta}>
            <span><i className={styles.liveDot} /> BUILDING IN MALAYSIA</span>
            <span>AI · SOFTWARE · ENGINEERING</span>
          </div>
        </div>

        <div className={styles.signalPanel} aria-label="MEXP system flow: intent to agent to outcome">
          <div className={styles.panelTop}><span>FIELD / 001</span><span>LIVE SYSTEM MAP</span></div>
          <div className={styles.signalMap}>
            <div className={`${styles.signalNode} ${styles.intent}`}><span>01</span><b>INTENT</b><small>Find the friction</small></div>
            <div className={styles.signalLine}><span /></div>
            <div className={`${styles.signalNode} ${styles.agent}`}><span>02</span><b>AGENT</b><small>Design the system</small></div>
            <div className={styles.signalLine}><span /></div>
            <div className={`${styles.signalNode} ${styles.outcome}`}><span>03</span><b>OUTCOME</b><small>Make progress visible</small></div>
          </div>
          <div className={styles.panelBottom}><span>OBSERVE → DESIGN → SHIP</span><span>MY / 03°08′N</span></div>
          <div className={styles.panelStamp}>M<br />X</div>
        </div>

        <div className={styles.scrollCue}><span /> SCROLL TO EXPLORE</div>
      </header>

      <section id="work" className={styles.work}>
        <div className={`${styles.sectionIntro} ${styles.reveal}`}>
          <div>
            <p className={styles.eyebrow}>CHOOSE A SIGNAL <span>04 / 06</span></p>
            <h2>One lab. <em>Useful directions.</em></h2>
          </div>
          <p className={styles.sectionNote}>Pick the thread closest to the problem you are solving.</p>
        </div>

        <div className={styles.pathList}>
          {destinations.map((item) => (
            <a
              key={item.number}
              className={`${styles.path} ${styles[item.tone]} ${styles.reveal}`}
              href={withAttribution(item.href, attribution)}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackCTA(item.label, item.href)}
            >
              <span className={styles.pathNumber}>{item.number}</span>
              <span className={styles.pathBody}>
                <span className={styles.pathLabel}>{item.label}</span>
                <strong>{item.title}</strong>
                <span className={styles.pathDescription}>{item.description}</span>
              </span>
              <span className={styles.pathAction}>{item.action}<b aria-hidden="true">↗</b></span>
            </a>
          ))}
        </div>
      </section>

      <section className={styles.lab}>
        <div className={`${styles.labHeading} ${styles.reveal}`}>
          <p className={styles.eyebrow}>UNDER ACTIVE RESEARCH <span>02 IN THE LAB</span></p>
          <h2>Some systems are <em>still becoming.</em></h2>
        </div>
        <div className={styles.labGrid}>
          <article className={`${styles.labItem} ${styles.reveal}`}>
            <span className={styles.labIndex}>R / 01</span>
            <span className={styles.labMark}>◎</span>
            <h3>Engineering intelligence</h3>
            <p>Tools and methods for more legible, resilient engineering work.</p>
            <span className={styles.comingSoon}>IN DEVELOPMENT</span>
          </article>
          <article className={`${styles.labItem} ${styles.reveal}`}>
            <span className={styles.labIndex}>R / 02</span>
            <span className={styles.labMark}>⌁</span>
            <h3>Research into reality</h3>
            <p>Applied research moving from simulation and prototypes toward useful systems.</p>
            <span className={styles.comingSoon}>IN DEVELOPMENT</span>
          </article>
        </div>
      </section>

      <section className={`${styles.contact} ${styles.reveal}`}>
        <div>
          <p className={styles.eyebrow}>HAVE A REAL PROBLEM TO SOLVE? <span>LET’S TALK</span></p>
          <h2>Good work starts with <em>a sharper question.</em></h2>
        </div>
        <a
          className={styles.contactAction}
          href={withAttribution("mailto:hello@mymexp.com?subject=Let's%20build%20something%20useful", attribution)}
          onClick={() => trackCTA("CONTACT", "mailto:hello@mymexp.com")}
        >
          Start a conversation <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBrand}><Image src="/logo.png" alt="" width={28} height={28} /><span>MEXP</span></div>
        <p>All rights reserved 2026 · MEXP Services · An analytics company · 202603235170 (TR0349010-T)</p>
        <a href="https://www.instagram.com/marineexpeditors/" target="_blank" rel="noreferrer" aria-label="MEXP on Instagram">IG ↗</a>
      </footer>
    </div>
  );
}