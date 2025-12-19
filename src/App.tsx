// src/App.tsx

import { useEffect, useState } from "react";
import { useAutoThemeClass } from "./hooks/useAutoThemeClass";

/* ---------- JSON type helpers ---------- */
type Email   = { email: string;   caption: string; description: string };
type XHandle = { x: string;       caption: string; description: string };
type Discord = { discord: string; caption: string; description: string };

type Contacts = {
  emails:  Email[];
  discord?: Discord[]; // optional
};

type Media = {
  x?: XHandle[]; // optional
};

/* each resource object has 1 dynamic URL key + caption + description */
type ResourceItem = {
  caption: string;
  description: string;
  [k: string]: string; // urlKey -> url
};

type Resources = {
  HJ:  ResourceItem[];
  nft?: ResourceItem[]; // optional
};

type JsonData = {
  contacts: Contacts;
  media?: Media;
  resources: Resources;
};

export default function App() {
  const [data, setData] = useState<JsonData | null>(null);

  useAutoThemeClass();

  // --- manual source switch ---
const USE_REMOTE = false; // <- set true to load from GitHub Pages
const LOCAL_URL  = `${import.meta.env.BASE_URL}res.json`; // served from /public/res.json
const REMOTE_URL = "https://hashcanon.github.io/resources/res.json";

useEffect(() => {
  const url = USE_REMOTE ? REMOTE_URL : LOCAL_URL;

  fetch(url)
    .then(async (r) => {
      if (!r.ok) {
        const body = await r.text().catch(() => "");
        throw new Error(`HTTP ${r.status} on ${url}. Body: ${body.slice(0,200)}…`);
      }
      return r.json();
    })
    .then(setData)
    .catch((err) => {
      console.error("Error loading res.json:", err);
    });
}, []);

  if (!data) return <p className="status">Loading contacts & resources…</p>;

  const { contacts, resources, media } = data;

  /* helper: extract the single dynamic URL key */
  const getUrlKey = (item: ResourceItem) =>
    Object.keys(item).find((k) => k !== "caption" && k !== "description") as
      | string
      | undefined;

  return (
    <>
      <div className="sticky top-0 z-10 w-full py-3 text-center text-3xl font-bold bg-background border-b border-gray-300">
        Contacts and Resources
      </div>

      <main className="mx-auto max-w-screen-md px-4 space-y-8">
        {/* --------- GENERAL RESOURCES --------- */}
        <section className="space-y-4 mt-8">
          <h2 className="text-center text-2xl font-semibold tracking-tight">
            General Resources
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            {resources.HJ.map((item, idx) => {
              const urlKey = getUrlKey(item);
              if (!urlKey) return null;
              const url = item[urlKey];
              const key = `${urlKey}:${url}:${idx}`;
              return (
                <p key={key}>
                  <strong>{item.caption}: </strong>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 underline hover:text-blue-600"
                  >
                    {url}
                  </a>
                  <br />
                  {item.description}
                </p>
              );
            })}
          </div>
        </section>

        {/* --------- MEDIA --------- */}
        {(media?.x?.length ?? 0) > 0 && (
          <section className="space-y-4 mt-6">
            <h2 className="text-center text-2xl font-semibold tracking-tight">
              Media
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              {media!.x!.map(({ x, caption, description }) => (
                <p key={x}>
                  <strong>{caption}: </strong>
                  <a
                    href={`https://x.com/${x.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 underline hover:text-blue-600"
                  >
                    {x}
                  </a>
                  <br />
                  {description}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* --------- CONTACTS --------- */}
        <section className="space-y-4 mt-6 mb-6">
          <h2 className="text-center text-2xl font-semibold tracking-tight">
            Contacts
          </h2>
          <div className="space-y-4 text-base leading-relaxed">
            {contacts.emails.map(({ email, caption, description }) => (
              <p key={email}>
                <strong>{caption}: </strong>
                <a
                  href={`mailto:${email}`}
                  className="text-blue-400 underline hover:text-blue-600"
                >
                  {email}
                </a>
                <br />
                {description}
              </p>
            ))}

            {(contacts.discord?.length ?? 0) > 0 &&
              contacts.discord!.map(({ discord, caption, description }) => (
                <p key={discord}>
                  <strong>{caption}: </strong>
                  <a
                    href={discord}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 underline hover:text-blue-600"
                  >
                    {discord}
                  </a>
                  <br />
                  {description}
                </p>
              ))}
          </div>
        </section>
      </main>
    </>
  );
}
