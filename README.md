# HashCanon Resources

Minimal static repository for **shared project resources**.

* **Source of truth (JSON):** [`docs/res.json`](https://github.com/HashCanon/resources/blob/main/docs/res.json)
* **Public view (GitHub Pages):** [https://hashcanon.github.io/resources/](https://hashcanon.github.io/resources/)
* **Main project:** [https://github.com/HashCanon/hashcanon](https://github.com/HashCanon/hashcanon)
* **Generator:** [https://hashcanon.github.io/generator/](https://hashcanon.github.io/generator/)

## What’s in here

* `docs/res.json` — canonical dataset (contacts, media, links) consumed by other HashCanon pages/apps.
* `docs/index.html` — a lightweight view over the same JSON for quick inspection.

## JSON contract (stable keys)

```json
{
  "resources": {
    "HJ": [
      { "caption": "...", "description": "...", "url": "https://..." }
    ],
    "nft": [
      { "caption": "...", "description": "...", "url": "https://..." }
    ]
  },
  "media": {
    "x": [
      { "handle": "@DataSattva", "caption": "...", "description": "..." }
    ]
  },
  "contacts": {
    "emails": [
      { "email": "datasattva@proton.me", "caption": "...", "description": "..." }
    ],
    "discord": [
      { "url": "https://discord.gg/...", "caption": "...", "description": "..." }
    ]
  }
}
```

> **Notes**
>
> * Arrays keep display order.
> * Only the shown keys are considered stable; avoid renaming without a major bump.

## How to consume

```ts
// Example (TS/JS)
const URL = "https://hashcanon.github.io/resources/res.json";
const res = await fetch(URL);
const data = await res.json();
// data.resources.HJ, data.media.x, data.contacts.emails, ...
```

## Update workflow

1. Edit [`docs/res.json`](./docs/res.json).
2. Commit to `main` — GitHub Pages updates the site.
3. Downstream apps will pick up the new JSON on next fetch.



