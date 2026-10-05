---
section: Get Started
title: 'Finding Documents in the Ticha Digital Text Explorer'
description: >-
  How to search the collection, narrow what you find, and read what you land on —
  whether you are looking for one document or for everything from one town.
layout: 'page'
permalink: '/get-started/guides/finding-documents.html'
browse_blocks:
  - label: 'Browse by place'
    link: '/explore/towns'
    description: >-
      Every document records the town it comes from. The map shows each town in the
      collection; its marker opens the documents written there.
  - label: 'Browse by year'
    link: '/explore/documents'
    description: >-
      The documents span roughly two centuries. Set a first and last year in the Year
      filter to work within a period, or leave one end open.
  - label: 'Browse by people'
    link: '/explore/people'
    description: >-
      Testators, scribes, witnesses, and officials are named on each document page.
      A browsable index of those names is in progress.
  - label: 'Browse by archive'
    link: '/explore/documents'
    description: >-
      Documents come from several archives in Oaxaca and Mexico City. Filter by Archive
      to see what one repository holds, which is useful when planning a visit.
  - label: 'Browse by document type'
    link: '/explore/documents'
    description: >-
      Testaments, bills of sale, land deeds, petitions, receipts, and complaints each
      follow their own conventions. Filter by Document Type to compare like with like.
---

<div class="max-w-[70ch] [&_p]:my-4 [&_li]:my-1 [&_a]:text-accent-light [&_a:hover]:text-accent-dark [&_a]:underline">

  <p>
    Everything in this collection is reachable from
    <a href="/explore/documents">All Documents</a>: one search box, a menu for choosing what that box
    searches, and a set of filters down the side. This guide covers all three, and then what you will find
    when you open a document.
  </p>

  <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark mt-10 mb-4">Searching</h2>

  <p>
    Type in the search box and the results update as you go. By default the search covers every indexed
    field at once — titles, towns, languages, archives, document types, dates, and any transcribed text.
    To search one field alone, choose it from the <span class="font-mono">Search Within</span> menu to the
    left of the box: choosing <span class="font-mono">Transcription</span>, for instance, searches the words
    of the documents themselves rather than their descriptions.
  </p>

  <p>
    Accents and punctuation are ignored, so <em>Tlacochahuaya</em> and <em>Tlacochahuáya</em> find the same
    documents. Close matches count too, which helps when a name can be spelled several ways.
  </p>

  <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark mt-10 mb-4">Narrowing your results</h2>

  <p>The filters beside the results can be combined with each other and with a search:</p>

  <ul class="list-disc list-inside">
    <li><span class="font-bold text-text-dark">Features</span> — limit to digital editions, to documents that have a transcription, or to Zapotec documents that have a Spanish translation (or to the translations themselves).</li>
    <li><span class="font-bold text-text-dark">Language</span> — Zapotec, Spanish, or Spanish with some Zapotec.</li>
    <li><span class="font-bold text-text-dark">Document Type</span> — testament, bill of sale, land deed, petition, and so on.</li>
    <li><span class="font-bold text-text-dark">Year</span> — a first year, a last year, or both.</li>
    <li><span class="font-bold text-text-dark">Archive</span> — the repository that holds the original.</li>
  </ul>

  <p>
    Each filter you apply appears as a tag above the results; click the × on a tag to drop that filter.
    The address bar keeps up with what you have chosen, so a search you want to come back to — or send to
    someone else — can simply be bookmarked or copied.
  </p>

</div>

<div class="my-10">
  <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark">Exploring by category</h2>
</div>
<div class="container mx-auto flex flex-wrap mb-12">
  <div class="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
    <a href="/explore/towns">
      <img alt="Map of the Valley of Oaxaca with a marker on each town represented in the collection" class="object-cover object-center w-full" src="/static/map-screen.png">
    </a>
    <p class="text-xs text-accent-light tracking-widest font-medium title-font my-2 uppercase">Above: the towns represented in the collection, on the Documents by Town map</p>
  </div>
  <div class="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
    {% for block in browse_blocks %}
    <div class="flex flex-col mb-10 lg:items-start items-center">
      <div class="flex-grow">
        <div class="flex items-baseline">
          <div class="w-6 h-6 inline-flex items-center justify-center rounded-full bg-red-100 text-accent-light mr-2 float-left">
            <svg aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-3 h-3" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <h3 class="text-text-dark text-lg title-font font-medium mb-3">
            <a class="text-accent-light hover:text-accent-dark underline" href="{{ block.link }}">{{ block.label }}</a>
          </h3>
        </div>
        <p class="leading-relaxed text-sm">{{ block.description }}</p>
      </div>
    </div>
    {% endfor %}
  </div>
</div>

<div class="max-w-[70ch] [&_p]:my-4 [&_li]:my-1 [&_a]:text-accent-light [&_a:hover]:text-accent-dark [&_a]:underline">

  <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark mt-10 mb-4">Reading a document</h2>

  <p>
    A document page opens on its images. You can zoom in, move around the page, and use the strip of
    thumbnails to turn to another page; printed books open as a two-page spread, manuscripts one page at a
    time. Beside the images, the <em>Metadata</em> tab records what is known about the document — its
    archive and call number, town, year and date, the people named in it, and, where they are recorded, the
    acknowledgements owed for it. A <em>Transcription</em> tab appears when a transcription exists.
  </p>

  <p>
    Several metadata values are links. Clicking a town searches for it; clicking a language, document type,
    archive, or year applies that as a filter, which is a quick way to move from one document to everything
    like it.
  </p>

  <p>
    Where a Zapotec document has a Spanish translation in the archive, a panel at the top right of the page
    leads to it, and back again from the translation to the original. The identifier in the address of a
    document page — the <span class="font-mono">Tl675b</span> in
    <span class="font-mono">/document/Tl675b</span> — is stable, so it is a dependable thing to cite or to
    send to a colleague. See <a href="/connect/credits">Credits and Acknowledgements</a> for how to cite
    what you find.
  </p>

</div>
