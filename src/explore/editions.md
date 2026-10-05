---
section: 'Explore'
title: 'Digital Editions'
description: >-
  Digital editions mark documents selected for more focused editorial work. Each opens
  on the original page images; transcriptions and linked translations are available for
  some editions, and the material varies from one edition to the next.
layout: 'page'
permalink: '/explore/editions.html'
---

{% assign digital_editions = api.documents | where: 'digital_edition' | reverse %}

<p class="max-w-[70ch] mb-10">
  Each edition below opens on the manuscript or printed book itself. The flower marks a digital
  edition, and the badge in the corner gives the language of the document. Where a transcription
  or Spanish translation is available, it appears or is linked from the document page.
</p>

<div class="flex flex-wrap gap-12 justify-start">
  {%- for edition in digital_editions -%}
    <div class="group xl:w-1/5 lg:w-1/4 md:w-1/3 w-full transition duration-250 ease-in-out hover:scale-105">
      {%- if edition.id -%}
        <a class="block relative h-48 rounded overflow-hidden" href="/document/{{ edition.slug }}.html">
      {%- else -%}
        <a class="block relative h-48 rounded overflow-hidden">
      {%- endif -%}
      {%- assign edition_language = edition.language | split: " " | first -%}
      <div class="absolute top-0 right-0 {% if edition_language == "Zapotec" %}bg-red-950{% else %}bg-accent-dark{% endif %} text-[#f7efdc] text-lg font-bold px-2 py-1 rounded-bl-lg z-10">{{ edition_language }}</div>
        <div class="absolute bottom-0 left-0 h-14 w-14 shadow bg-accent-alt-light bg-[url(../static/flower.png)] bg-cover bg-center px-2 py-1 rounded-tr-lg z-10">
        </div>
        <img alt="{{ edition.title | escape }}" class="rounded-tl-[3rem] rounded-br-[3rem] object-cover object-center w-full h-full block" src="/static/thumbnails/{{ edition.slug }}.jpg">
        <div class="absolute top-0 left-0 w-full h-full block transition-opacity saturate-50 opacity-80 duration-350 ease-in-out group-hover:opacity-0 rounded-tl-[3rem] rounded-br-[3rem]" style="background-color: #{{edition.color}};"></div>
      </a>
      <div class="mt-4">
        <h2 class="text-text-dark title-font text-lg font-bold leading-tight"><span class="group-hover:text-accent-dark underline">Digital Edition</span> · {{ edition.title }}</h2>
        <p class="mt-1 text-xs">
          {{ edition.material_type | default: "Document" }}
          {%- if edition.document_type and edition.document_type != "Unknown" %} · {{ edition.document_type }}{% endif -%}
          {%- if edition.town_short and edition.town_short != "Unknown Town" %} · {{ edition.town_short }}{% endif -%}
        </p>
      </div>
    </div>
  {%- endfor -%}
</div>
