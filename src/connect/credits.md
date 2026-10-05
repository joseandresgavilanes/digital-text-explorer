---
section: Connect
title: 'Credits and Acknowledgements'
description: >-
  The Digital Text Explorer is one part of Ticha, a collaborative project that
  documents Colonial Valley Zapotec. Here is how to cite it, and who makes it possible.
layout: 'page'
permalink: '/connect/credits.html'
---

<div class="max-w-[70ch] [&_p]:my-4 [&_li]:my-1 [&_a]:text-accent-light [&_a:hover]:text-accent-dark [&_a]:underline">

  <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark mt-10 mb-4">About this site</h2>

  <p>
    The Ticha Digital Text Explorer is one part of
    <a href="https://ticha.haverford.edu" target="_blank" rel="noopener">Ticha ↗</a>, an international
    collaboration that documents and promotes Zapotec languages and knowledge through workshops, events,
    and online resources offered to the public at no cost. The project is directed by Brook Danielle
    Lillehaugen and George Aaron Broadwell and is guided by a Zapotec Advisory Board, with a team of
    linguists, historians, librarians, technologists, and students.
  </p>

  <p>
    This site gathers the documents the project has digitized and described so that they can be searched,
    compared, and read next to the original page images. It is built and maintained with the
    <a href="https://ticha.haverford.edu/en/about/" target="_blank" rel="noopener">mission and values ↗</a>
    of the wider project in view.
  </p>

  <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark mt-10 mb-4">How to cite Ticha</h2>

  <p>To cite the project as a whole, use:</p>

  <blockquote class="border-l-4 border-accent-light pl-4 my-6 text-text-dark">
    Lillehaugen, Brook Danielle, George Aaron Broadwell, Michel R. Oudijk, Laurie Allen, May Plumb, and
    Mike Zarafonetis. 2016. <em>Ticha: a digital text explorer for Colonial Zapotec, first edition.</em>
    Online: http://ticha.haverford.edu/
  </blockquote>

  <p>
    To cite a single document, also name the holding archive and the call number, both of which appear in
    the metadata on each document page, along with the document's Ticha identifier — the code in the page
    address, as in <span class="font-mono">Tl675b</span>. Where a document page links a permissions file,
    that file records the terms under which the archive allowed the images to be published.
  </p>

  <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark mt-10 mb-4">Archives</h2>

  <p>
    The documents on this site are held by, and published with the permission of, the following archives:
  </p>

  <ul class="list-disc list-inside">
    {%- for archive in api.archives %}
    <li>{{ archive }}</li>
    {%- endfor %}
  </ul>

  <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark mt-10 mb-4">Funding</h2>

  <p>Work on Ticha has been supported by:</p>

  <ul class="list-disc list-inside">
    <li>National Endowment for the Humanities — Lillehaugen 2014 Summer Stipend, and 2015–2016 Fellowship for College Teachers and Independent Scholars</li>
    <li>American Council of Learned Societies — Lillehaugen 2015–2016 Fellowship</li>
    <li>American Philosophical Society — Lillehaugen 2015 Franklin Research Grant</li>
    <li>Tri-Co Digital Humanities</li>
  </ul>

  <p class="text-sm">
    All opinions, findings, conclusions, or recommendations expressed in this project do not necessarily
    represent those of the National Endowment for the Humanities.
  </p>

  <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark mt-10 mb-4">Institutional partners</h2>

  <ul class="list-disc list-inside">
    <li>Haverford College</li>
    <li>Center for Peace and Global Citizenship, Haverford College</li>
    <li>Hurford Center for the Arts and Humanities, Haverford College</li>
    <li>Magill Library, Haverford College</li>
    <li>Tri-Co Digital Humanities</li>
  </ul>

  <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark mt-10 mb-4">Contributors</h2>

  <p>
    Dozens of people have transcribed, translated, analyzed, and reviewed the documents collected here,
    among them the members of the Seminario de zapoteco colonial at UNAM and the Zapotexts research group
    at UCLA. Individual document pages credit the people who worked on that document, and the
    <a href="https://ticha.haverford.edu/en/acknowledgements/" target="_blank" rel="noopener">acknowledgements page on the main Ticha site ↗</a>
    lists contributors to the project in full.
  </p>

  <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark mt-10 mb-4">Corrections and questions</h2>

  <p>
    If you spot an error in a transcription, a translation, or a piece of metadata — or if you have a
    document you would like to see included — please
    <a href="https://ticha.haverford.edu/en/form/" target="_blank" rel="noopener">get in touch ↗</a>.
  </p>

</div>
