---
section: Explore
title: 'Documents by Town'
description: >-
  The documents collected here were written in towns across the Valley of Oaxaca and
  beyond. Choose a town to find it on the map, then open the documents written there.
layout: 'page'
permalink: '/explore/towns.html'
---

<div class="my-6">
  <div class="container mx-auto">
    <div class="flex md:flex-nowrap gap-12 xl:gap-18 flex-wrap-reverse w-full">
      <div class="basis-full md:basis-1/3">
        <h2 class="md:text-2xl text-xl font-medium title-font text-text-dark mb-4">Towns in the collection</h2>
        <p class="mb-6 text-sm">
          Select a town to move the map to it. Its marker opens a link to every document written there.
          Town names are given in their modern official form; documents may name the same place differently.
        </p>
        <ul>
          {% for town in api.towns %}
            <li class="my-2">
              <span aria-hidden="true">📍</span>
              <a id="{{ town.id }}-link" class="text-accent-light hover:text-accent-dark hover:underline font-bold pb-1" href="#" data-gps="{{ town.gps_coordinates | escape }}" aria-label="Show {{ town.town_modern_official | escape }} on the map">{{ town.town_modern_official }}</a>
            </li>
          {% endfor %}
        </ul>
      </div>
      <div class="basis-full md:basis-2/3">
        {% include "components/map.html" %}
      </div>
    </div>
  </div>
</div>

<script>
  function setupTownClickHandlers() {
    if (!window.map || !window.townMarkers) {
      setTimeout(setupTownClickHandlers, 100);
      return;
    }

    const townLinks = document.querySelectorAll('a[data-gps]');
    townLinks.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        const coords = JSON.parse(link.dataset.gps);
        if (Array.isArray(coords) && coords.length === 2) {
          const [lng, lat] = coords;
          
          // Calculate distance for smoother animation
          const currentCenter = window.map.getCenter();
          const distance = Math.sqrt(
            Math.pow(lat - currentCenter.lat, 2) + Math.pow(lng - currentCenter.lng, 2)
          );
          const duration = Math.min(1 + (distance * 0.5), 3);
          
          window.map.flyTo([lat, lng], 13, { duration: duration });

          const townId = link.id ? link.id.replace(/-link$/, '') : null;
          if (townId && window.townMarkers[townId]) {
            const marker = window.townMarkers[townId];
            setTimeout(() => {
              marker.openPopup();
            }, duration * 500);
          }
        }
      });
    });
    
    // Check for town query parameter on page load
    const urlParams = new URLSearchParams(window.location.search);
    const townParam = urlParams.get('town');
    if (townParam && window.townMarkers[townParam] && window.townData[townParam]) {
      const townInfo = window.townData[townParam];
      window.map.flyTo([townInfo.lat, townInfo.lng], 13, { duration: 0.5 });
      setTimeout(() => {
        window.townMarkers[townParam].openPopup();
      }, 500);
    }
  }

  setupTownClickHandlers();
</script>
