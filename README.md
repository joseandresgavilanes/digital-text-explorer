# Ticha Digital Text Explorer

An Eleventy site for exploring the Ticha Project's digitized texts.

## Requirements

- Node.js 20 or newer
- npm

## Install

1. Clone the repository and change into its directory.
2. Run `npm install`.

## Common commands

- `npm run dev` — start Eleventy and Tailwind in watch mode.
- `npm run build` — produce a production build in `dist/`.
- `npm run ingest` — refresh source data and cache missing thumbnails.
- `npm run format` — format project files.
- `npm run format:check` — verify formatting without modifying files.

## Project layout

- `src/` contains Eleventy content, templates, client-side code, and local API data.
- `lib/` contains scripts that refresh the API data and thumbnail cache.
- `static/` contains files copied unchanged into the published site.
- `dist/` is generated output and should not be edited directly.

## Data refresh

`npm run ingest` downloads the JSON files needed by the site before attempting to cache thumbnails. The script leaves already-cached thumbnails in place, so repeat runs only fetch images that are missing.
