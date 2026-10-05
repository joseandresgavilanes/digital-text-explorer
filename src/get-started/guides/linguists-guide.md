---
section: Get Started
title: "A Linguist's Guide to the Ticha Digital Text Explorer"
description: >-
  What the corpus contains, how to search the transcribed text, and where the
  grammars, dictionaries, and analysis that go with it can be found.
layout: 'page'
permalink: '/get-started/guides/linguists.html'
browse_blocks:
  - label: 'Zapotec-language documents'
    link: '/explore/documents?Language=Zapotec'
    description: >-
      Everything written in Zapotec, including documents that mix Zapotec with Spanish.
      Use the Language filter to separate the two.
  - label: 'Documents with a transcription'
    link: '/explore/documents?transcription=true'
    description: >-
      The transcribed part of the corpus, which is what free-text search can reach.
      Choose Transcription in the Search Within menu to search these words alone.
  - label: 'Zapotec documents with a Spanish translation'
    link: '/explore/documents?has_translation=true'
    description: >-
      Documents whose archival Spanish translation is also held here, so that the two
      versions can be read against each other.
  - label: 'Digital editions'
    link: '/explore/editions'
    description: >-
      Documents selected for more focused editorial work. Each opens on its page images;
      a transcription or linked Spanish translation is available for some of them.
  - label: 'Printed grammars and doctrinal texts'
    link: '/explore/documents?Document%20Type=Grammatical%20Text%7CSpiritual%20Text'
    description: >-
      The colonial printed books in Zapotec, which record the language as missionaries
      analyzed and standardized it.
---

<div class="max-w-[70ch] [&_p]:my-4 [&_li]:my-1 [&_a]:text-accent-light [&_a:hover]:text-accent-dark [&_a]:underline">

  <p>
    The language written in these documents is Colonial Valley Zapotec: the Zapotec of the Valley of
    Oaxaca as it was written alphabetically after the Spanish invasion, when communities took up the
    alphabet introduced by missionaries and used it for their own purposes — wills, land transactions,
    petitions, and complaints. It is not a single uniform variety, and it is not identical to any Zapotec
    language spoken today. For background on the language and its history, see
    <a href="https://ticha.haverford.edu/en/context/" target="_blank" rel="noopener">About Colonial Valley Zapotec ↗</a>
    on the main Ticha site.
  </p>

  <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark mt-10 mb-4">What the corpus contains</h2>

  <p>
    Most of the collection is notarial: testaments, bills of sale, land deeds and descriptions, petitions,
    receipts, and complaints, written in towns across the Valley of Oaxaca and beyond, spanning the
    seventeenth, eighteenth, and early nineteenth centuries. Alongside the manuscripts are printed colonial
    books in Zapotec — grammars and doctrinal texts — which record the language as missionaries analyzed
    and standardized it, and which make a useful counterpoint to the notarial material.
  </p>

  <p>
    Many Zapotec documents are accompanied in the archive by a Spanish translation. Those translations are
    held here as records of their own, linked to the Zapotec document from the top of each page, so a text
    and its translation can be compared page by page.
  </p>

  <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark mt-10 mb-4">Searching the transcribed text</h2>

  <p>
    Search runs over the transcriptions as well as the metadata. Choosing
    <span class="font-mono">Transcription</span> in the <span class="font-mono">Search Within</span> menu
    restricts a query to the words of the documents themselves, which is what you want when hunting for a
    form rather than a subject.
  </p>

  <p>
    Two properties of the search matter for work on orthographic variation. Diacritics and the characters
    <span class="font-mono">. , ( )</span> are stripped from both your query and the text, so
    <em>quie</em> and <em>quíe</em> are treated alike. And matching is deliberately loose: an exact hit
    ranks first, but forms that begin with your query, and forms within a short edit distance of it, are
    returned too. That is a help when a morpheme is spelled several ways and a hindrance when you want one
    spelling only — read the ranked results rather than the result count.
  </p>

  <p>
    Transcription is ongoing, so a search of the transcribed text is a search of part of the collection,
    not all of it. Filter by <em>Has Transcription</em> to see what is currently searchable.
  </p>

</div>

<div class="my-10">
  <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark">Entry points</h2>
</div>
<div class="container mx-auto flex flex-wrap mb-12">
  <div class="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
    <a href="/document/Tl675b">
      <img alt="Opening page of the 1675 Zapotec testament from San Jerónimo Tlacochahuaya" class="object-cover object-center w-full" src="/static/Tl675b.png">
    </a>
    <p class="text-xs text-accent-light tracking-widest font-medium title-font my-2 uppercase">Above: Testament from San Jerónimo Tlacochahuaya, 1675</p>
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

  <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark mt-10 mb-4">Companion resources</h2>

  <ul class="list-disc list-inside">
    <li>
      <a href="https://www.webonary.org/colonial_valley_zapotec/" target="_blank" rel="noopener">Ticha Diccionario Colonial Valley Zapotec ↗</a>
      — the project's dictionary of the language of these documents, hosted on Webonary.
    </li>
    <li>
      <a href="https://ticha.haverford.edu/en/lessons/" target="_blank" rel="noopener">Caseidyneën Saën — Aprendemos Juntos — Learning Together ↗</a>
      — teaching modules built around documents from this collection.
    </li>
    <li>
      <a href="https://ticha.haverford.edu/en/context/" target="_blank" rel="noopener">About Colonial Valley Zapotec ↗</a>
      — historical and linguistic background on the writing tradition.
    </li>
  </ul>

  <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark mt-10 mb-4">Citing, and correcting</h2>

  <p>
    Cite the project and the individual documents as described on
    <a href="/connect/credits">Credits and Acknowledgements</a>; a document's identifier — the
    <span class="font-mono">Tl675b</span> in <span class="font-mono">/document/Tl675b</span> — is stable and
    worth quoting alongside the archive and call number.
  </p>

  <p>
    Transcriptions and analyses are working documents, and corrections from readers are welcome. If you
    find an error, or you have transcribed or analyzed one of these documents in your own work,
    <a href="https://ticha.haverford.edu/en/form/" target="_blank" rel="noopener">get in touch ↗</a>.
  </p>

</div>
