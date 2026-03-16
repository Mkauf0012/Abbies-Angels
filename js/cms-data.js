/**
 * cms-data.js — Fetches Decap CMS YAML data files and injects them into the page.
 * Falls back gracefully to existing hardcoded content if fetch fails.
 */
(function () {
  'use strict';

  function parseSimpleYaml(text) {
    var result = {};
    var lines = text.split('\n');
    var i = 0;
    while (i < lines.length) {
      var line = lines[i];
      var match = line.match(/^([\w_]+):\s*(.*)$/);
      if (!match) { i++; continue; }
      var key = match[1];
      var val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        result[key] = val.slice(1, -1).replace(/\\n/g, '\n');
        i++; continue;
      }
      if (val === 'true') { result[key] = true; i++; continue; }
      if (val === 'false') { result[key] = false; i++; continue; }
      if (val === '|') {
        var indentMatch = (lines[i + 1] || '').match(/^(\s+)/);
        var baseIndent = indentMatch ? indentMatch[1].length : 2;
        var block = [];
        i++;
        while (i < lines.length && (lines[i].startsWith(' '.repeat(baseIndent)) || lines[i].trim() === '')) {
          block.push(lines[i].slice(baseIndent));
          i++;
        }
        result[key] = block.join('\n').trimEnd();
        continue;
      }
      result[key] = val;
      i++;
    }
    return result;
  }

  function fetchYaml(path) {
    return fetch(path + '?v=' + Date.now())
      .then(function (r) { return r.ok ? r.text() : Promise.reject(r.status); })
      .then(parseSimpleYaml)
      .catch(function () { return null; });
  }

  function setText(sel, val) {
    var el = document.querySelector(sel);
    if (el && val) el.textContent = val;
  }

  function setHref(sel, val) {
    var el = document.querySelector(sel);
    if (el && val) el.href = val;
  }

  function applyHero(d) {
    if (!d) return;
    setText('.hero h1', d.headline);
    setText('.hero-tagline', d.subheadline);
    setText('.hero-meta', d.hero_meta);
    var primary = document.querySelector('.hero-cta .btn-primary');
    if (primary) {
      if (d.cta_primary_text) primary.textContent = d.cta_primary_text;
      if (d.cta_primary_link) primary.href = d.cta_primary_link;
    }
    var secondary = document.querySelector('.hero-cta .btn-outline');
    if (secondary) {
      if (d.cta_secondary_text) secondary.textContent = d.cta_secondary_text;
      if (d.cta_secondary_link) secondary.href = d.cta_secondary_link;
    }
  }

  function applyMission(d) {
    if (!d) return;
    var sec = document.querySelector('#mission');
    if (!sec) return;
    if (d.heading) setText('#mission h2', d.heading);
    var paras = sec.querySelectorAll('p');
    if (d.body_1 && paras[0]) paras[0].textContent = d.body_1;
    if (d.body_2 && paras[1]) paras[1].textContent = d.body_2;
  }

  function applyWhatWeDo(d) {
    if (!d) return;
    setText('#what-we-do h2', d.heading);
    var cards = document.querySelectorAll('#what-we-do .card');
    if (cards[0]) {
      if (d.card_1_title) cards[0].querySelector('h3').textContent = d.card_1_title;
      if (d.card_1_body) cards[0].querySelector('p').textContent = d.card_1_body;
    }
    // card[1] has an image — h3 and last p
    if (cards[1]) {
      if (d.card_2_title) cards[1].querySelector('h3').textContent = d.card_2_title;
      var ps1 = cards[1].querySelectorAll('p');
      if (d.card_2_body && ps1[ps1.length - 1]) ps1[ps1.length - 1].textContent = d.card_2_body;
    }
    if (cards[2]) {
      if (d.card_3_title) cards[2].querySelector('h3').textContent = d.card_3_title;
      if (d.card_3_body) cards[2].querySelector('p').textContent = d.card_3_body;
    }
  }

  function applyEvents(d) {
    if (!d) return;
    var sec = document.querySelector('#events');
    if (!sec) return;
    if (d.heading) setText('#events > h2', d.heading);
    var col = sec.querySelector('.two-col > div:first-child');
    if (col) {
      if (d.intro) col.querySelector('p').textContent = d.intro;
      var bullets = col.querySelectorAll('li');
      if (d.bullet_1 && bullets[0]) bullets[0].textContent = d.bullet_1;
      if (d.bullet_2 && bullets[1]) bullets[1].textContent = d.bullet_2;
      if (d.bullet_3 && bullets[2]) bullets[2].textContent = d.bullet_3;
      var footerP = col.querySelectorAll('p');
      if (d.footer_note && footerP[footerP.length - 1]) footerP[footerP.length - 1].textContent = d.footer_note;
    }
    var card = sec.querySelector('.card');
    if (card) {
      if (d.featured_card_title) card.querySelector('h3').textContent = d.featured_card_title;
      var cps = card.querySelectorAll('p');
      if (d.featured_card_intro && cps[0]) cps[0].textContent = d.featured_card_intro;
      if (d.featured_card_body && cps[1]) cps[1].textContent = d.featured_card_body;
      if (d.featured_card_wexler_note && cps[2]) cps[2].textContent = d.featured_card_wexler_note;
      var links = card.querySelectorAll('a');
      if (links[0] && d.featured_card_gofundme_label) links[0].textContent = d.featured_card_gofundme_label;
      if (links[0] && d.featured_card_gofundme_url) links[0].href = d.featured_card_gofundme_url;
      if (links[1] && d.featured_card_tickets_label) links[1].textContent = d.featured_card_tickets_label;
      if (links[1] && d.featured_card_tickets_url) links[1].href = d.featured_card_tickets_url;
    }
  }

  function applySupport(d) {
    if (!d) return;
    var sec = document.querySelector('#support');
    if (!sec) return;
    if (d.heading) setText('#support > h2', d.heading);
    var col = sec.querySelector('.two-col > div:first-child');
    if (col) {
      if (d.intro) col.querySelector('p').textContent = d.intro;
      var bullets = col.querySelectorAll('li');
      if (d.bullet_1 && bullets[0]) bullets[0].textContent = d.bullet_1;
      if (d.bullet_2 && bullets[1]) bullets[1].textContent = d.bullet_2;
      if (d.bullet_3 && bullets[2]) bullets[2].textContent = d.bullet_3;
      if (d.bullet_4 && bullets[3]) bullets[3].textContent = d.bullet_4;
    }
    var card = sec.querySelector('.card');
    if (card) {
      if (d.card_title) card.querySelector('h3').textContent = d.card_title;
      var cps = card.querySelectorAll('p');
      if (d.card_body && cps[0]) cps[0].textContent = d.card_body;
      var link = card.querySelector('a');
      if (link && d.card_link_label) link.textContent = d.card_link_label;
      if (link && d.card_link_url) link.href = d.card_link_url;
    }
  }

  function applyContact(d) {
    if (!d) return;
    if (d.email) {
      var emailLink = document.querySelector('a[href^="mailto:"]');
      if (emailLink) { emailLink.href = 'mailto:' + d.email; emailLink.textContent = d.email; }
    }
    if (d.facebook) setHref('a[href*="facebook.com"]', d.facebook);
    if (d.instagram) setHref('a[href*="instagram.com"]', d.instagram);
    if (d.linkedin) setHref('a[href*="linkedin.com"]', d.linkedin);
    var addrEl = document.querySelector('#contact .card:last-child');
    if (addrEl && (d.mailing_name || d.mailing_street || d.mailing_city)) {
      var addrP = addrEl.querySelectorAll('p');
      if (addrP[1]) {
        addrP[1].innerHTML =
          (d.mailing_name || '') + '<br>' +
          (d.mailing_street || '') + '<br>' +
          (d.mailing_city || '');
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    Promise.all([
      fetchYaml('/_data/homepage/hero.yml'),
      fetchYaml('/_data/homepage/mission.yml'),
      fetchYaml('/_data/homepage/what_we_do.yml'),
      fetchYaml('/_data/sections/events.yml'),
      fetchYaml('/_data/sections/support.yml'),
      fetchYaml('/_data/settings/contact.yml')
    ]).then(function (r) {
      applyHero(r[0]);
      applyMission(r[1]);
      applyWhatWeDo(r[2]);
      applyEvents(r[3]);
      applySupport(r[4]);
      applyContact(r[5]);
    });
  });
})();
