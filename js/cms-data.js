/**
 * cms-data.js — Fetches Decap CMS YAML data files and injects content into the page.
 * Shared by index.html and gallery.html.
 */
(function () {
  'use strict';

  function parseSimpleYaml(text) {
    var result = {};
    var lines = text.split('\n');
    var i = 0;
    while (i < lines.length) {
      var line = lines[i];
      // list block: key followed by list items
      if (line.match(/^[\w_]+:$/) && lines[i+1] && lines[i+1].match(/^\s+-/)) {
        var key = line.replace(':', '').trim();
        result[key] = [];
        i++;
        while (i < lines.length && lines[i].match(/^\s+-/)) {
          var itemLines = [];
          var firstVal = lines[i].replace(/^\s+-\s+/, '').trim();
          var obj = {};
          if (firstVal.indexOf(':') !== -1) {
            // inline kv on same line as dash
            var kv = firstVal.match(/^([\w_]+):\s*(.*)$/);
            if (kv) obj[kv[1]] = kv[2].replace(/^"|"$/g, '').replace(/^'|'$/g, '');
          }
          i++;
          while (i < lines.length && lines[i].match(/^\s{4,}[\w_]/)) {
            var sub = lines[i].match(/^\s+([\w_]+):\s*(.*)$/);
            if (sub) obj[sub[1]] = sub[2].replace(/^"|"$/g, '').replace(/^'|'$/g, '');
            i++;
          }
          result[key].push(obj);
        }
        continue;
      }
      var match = line.match(/^([\w_]+):\s*(.*)$/);
      if (!match) { i++; continue; }
      var k = match[1];
      var v = match[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        result[k] = v.slice(1, -1).replace(/\\n/g, '\n');
        i++; continue;
      }
      if (v === 'true') { result[k] = true; i++; continue; }
      if (v === 'false') { result[k] = false; i++; continue; }
      if (v === '|') {
        var indM = (lines[i+1]||'').match(/^(\s+)/);
        var base = indM ? indM[1].length : 2;
        var block = []; i++;
        while (i < lines.length && (lines[i].startsWith(' '.repeat(base)) || lines[i].trim() === '')) {
          block.push(lines[i].slice(base)); i++;
        }
        result[k] = block.join('\n').trimEnd();
        continue;
      }
      result[k] = v;
      i++;
    }
    return result;
  }

  function fetchYaml(path) {
    return fetch(path + '?v=' + Date.now())
      .then(function(r) { return r.ok ? r.text() : Promise.reject(r.status); })
      .then(parseSimpleYaml)
      .catch(function() { return null; });
  }

  function setText(sel, val) {
    var el = document.querySelector(sel);
    if (el && val) el.textContent = val;
  }
  function setHref(sel, val) {
    var el = document.querySelector(sel);
    if (el && val) el.href = val;
  }
  function setAttr(sel, attr, val) {
    var el = document.querySelector(sel);
    if (el && val) el.setAttribute(attr, val);
  }

  // ── INDEX.HTML APPLIERS ──────────────────────────────────────────

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

  function applyHeroCard(d) {
    if (!d) return;
    var card = document.querySelector('.hero-card');
    if (!card) return;
    if (d.title) card.querySelector('h2').textContent = d.title;
    var ps = card.querySelectorAll('p');
    // p[0] = date, p[1] = time, p[2] = location, p[3] = description
    if (d.date_label && ps[0]) ps[0].innerHTML = '<strong>Date:</strong> ' + d.date_label;
    if (d.time_label && ps[1]) ps[1].innerHTML = '<strong>Time:</strong> ' + d.time_label;
    if (d.location_label && ps[2]) ps[2].innerHTML = '<strong>Location:</strong> ' + d.location_label;
    if (d.description && ps[3]) ps[3].textContent = d.description;
    var img = card.querySelector('img');
    if (img) {
      if (d.image) img.src = d.image;
      if (d.image_alt) img.alt = d.image_alt;
    }
    var link = card.querySelector('a');
    if (link && d.ticket_url) link.href = d.ticket_url;
  }

  function applyMission(d) {
    if (!d) return;
    if (d.heading) setText('#mission h2', d.heading);
    var ps = document.querySelectorAll('#mission p');
    if (d.body_1 && ps[0]) ps[0].textContent = d.body_1;
    if (d.body_2 && ps[1]) ps[1].textContent = d.body_2;
  }

  function applyWhatWeDo(d) {
    if (!d) return;
    setText('#what-we-do h2', d.heading);
    var cards = document.querySelectorAll('#what-we-do .card');
    if (cards[0]) {
      if (d.card_1_title) cards[0].querySelector('h3').textContent = d.card_1_title;
      if (d.card_1_body) cards[0].querySelector('p').textContent = d.card_1_body;
    }
    if (cards[1]) {
      if (d.card_2_title) cards[1].querySelector('h3').textContent = d.card_2_title;
      var ps1 = cards[1].querySelectorAll('p');
      if (d.card_2_body && ps1.length) ps1[ps1.length-1].textContent = d.card_2_body;
    }
    if (cards[2]) {
      if (d.card_3_title) cards[2].querySelector('h3').textContent = d.card_3_title;
      if (d.card_3_body) cards[2].querySelector('p').textContent = d.card_3_body;
    }
  }

  function applyEvents(d) {
    if (!d) return;
    if (d.heading) setText('#events > h2', d.heading);
    var col = document.querySelector('#events .two-col > div:first-child');
    if (col) {
      if (d.intro) col.querySelector('p').textContent = d.intro;
      var bullets = col.querySelectorAll('li');
      if (d.bullet_1 && bullets[0]) bullets[0].textContent = d.bullet_1;
      if (d.bullet_2 && bullets[1]) bullets[1].textContent = d.bullet_2;
      if (d.bullet_3 && bullets[2]) bullets[2].textContent = d.bullet_3;
      var fps = col.querySelectorAll('p');
      if (d.footer_note && fps.length) fps[fps.length-1].textContent = d.footer_note;
    }
    var ecard = document.querySelector('#events .card');
    if (ecard) {
      if (d.featured_card_title) ecard.querySelector('h3').textContent = d.featured_card_title;
      var cps = ecard.querySelectorAll('p');
      if (d.featured_card_intro && cps[0]) cps[0].textContent = d.featured_card_intro;
      if (d.featured_card_body && cps[1]) cps[1].textContent = d.featured_card_body;
      if (d.featured_card_wexler_note && cps[2]) cps[2].textContent = d.featured_card_wexler_note;
      var elinks = ecard.querySelectorAll('a');
      if (elinks[0] && d.featured_card_gofundme_label) elinks[0].textContent = d.featured_card_gofundme_label;
      if (elinks[0] && d.featured_card_gofundme_url) elinks[0].href = d.featured_card_gofundme_url;
      if (elinks[1] && d.featured_card_tickets_label) elinks[1].textContent = d.featured_card_tickets_label;
      if (elinks[1] && d.featured_card_tickets_url) elinks[1].href = d.featured_card_tickets_url;
    }
  }

  function applySupport(d) {
    if (!d) return;
    if (d.heading) setText('#support > h2', d.heading);
    var col = document.querySelector('#support .two-col > div:first-child');
    if (col) {
      if (d.intro) col.querySelector('p').textContent = d.intro;
      var bullets = col.querySelectorAll('li');
      if (d.bullet_1 && bullets[0]) bullets[0].textContent = d.bullet_1;
      if (d.bullet_2 && bullets[1]) bullets[1].textContent = d.bullet_2;
      if (d.bullet_3 && bullets[2]) bullets[2].textContent = d.bullet_3;
      if (d.bullet_4 && bullets[3]) bullets[3].textContent = d.bullet_4;
    }
    var scard = document.querySelector('#support .card');
    if (scard) {
      if (d.card_title) scard.querySelector('h3').textContent = d.card_title;
      var scps = scard.querySelectorAll('p');
      if (d.card_body && scps[0]) scps[0].textContent = d.card_body;
      var slink = scard.querySelector('a');
      if (slink && d.card_link_label) slink.textContent = d.card_link_label;
      if (slink && d.card_link_url) slink.href = d.card_link_url;
    }
  }

  function applyContactIntro(d) {
    if (!d) return;
    if (d.heading) setText('#contact h2', d.heading);
    var p = document.querySelector('#contact > p');
    if (p && d.intro) p.textContent = d.intro;
  }

  function applyContact(d) {
    if (!d) return;
    if (d.email) {
      var el = document.querySelector('a[href^="mailto:"]');
      if (el) { el.href = 'mailto:' + d.email; el.textContent = d.email; }
    }
    if (d.facebook) setHref('a[href*="facebook.com"]', d.facebook);
    if (d.instagram) setHref('a[href*="instagram.com"]', d.instagram);
    if (d.linkedin) setHref('a[href*="linkedin.com"]', d.linkedin);
    var addrCard = document.querySelector('#contact .card:last-child');
    if (addrCard) {
      var addrPs = addrCard.querySelectorAll('p');
      if (addrPs[1] && (d.mailing_name || d.mailing_street || d.mailing_city)) {
        addrPs[1].innerHTML =
          (d.mailing_name||'') + '<br>' +
          (d.mailing_street||'') + '<br>' +
          (d.mailing_city||'');
      }
    }
  }

  function applyTeam(board, staff) {
    function renderCards(data, containerId) {
      if (!data || !data.members) return;
      var container = document.querySelector(containerId);
      if (!container) return;
      var html = '';
      data.members.forEach(function(m) {
        html += '<div class="card">';
        if (m.image) html += '<img src="' + m.image + '" alt="' + (m.name||'') + '">';
        html += '<h3>' + (m.name||'') + '</h3>';
        html += '<p>' + (m.title||'') + '</p>';
        html += '</div>';
      });
      container.innerHTML = html;
    }
    renderCards(board, '#team .cards:first-of-type');
    renderCards(staff, '#team .cards:last-of-type');
  }

  // ── GALLERY.HTML APPLIERS ────────────────────────────────────────

  function applyGalleryPage(d) {
    if (!d) return;
    setText('main h1', d.title);
    var ps = document.querySelectorAll('main > p');
    if (d.intro && ps[0]) ps[0].textContent = d.intro;
    var h2s = document.querySelectorAll('main h2');
    if (d.highlights_heading && h2s[0]) h2s[0].textContent = d.highlights_heading;
    if (d.spotlight_heading && h2s[1]) h2s[1].textContent = d.spotlight_heading;
    var sectionPs = document.querySelectorAll('main > p');
    // second standalone p is highlights intro, third is spotlight intro
    if (d.highlights_intro && sectionPs[1]) sectionPs[1].textContent = d.highlights_intro;
    if (d.spotlight_intro && sectionPs[2]) sectionPs[2].textContent = d.spotlight_intro;
  }

  function applyGalleryTiles(d) {
    if (!d || !d.tiles) return;
    var grid = document.querySelector('.grid');
    if (!grid) return;
    var html = '';
    d.tiles.forEach(function(t) {
      html += '<div class="tile">';
      html += '<img src="' + (t.image||'') + '" alt="' + (t.alt||'') + '">';
      html += '<div class="tile-body"><h3>' + (t.title||'') + '</h3>';
      html += '<p>' + (t.caption||'') + '</p></div></div>';
    });
    grid.innerHTML = html;
  }

  function applySpotlight(d) {
    if (!d) return;
    var sp = document.querySelector('.spotlight');
    if (!sp) return;
    var img = sp.querySelector('img');
    if (img) {
      if (d.image) img.src = d.image;
      if (d.image_alt) img.alt = d.image_alt;
    }
    var inner = sp.querySelector('div');
    if (!inner) return;
    if (d.title) inner.querySelector('h3').textContent = d.title;
    var ps = inner.querySelectorAll('p');
    if (d.body_1 && ps[0]) ps[0].textContent = d.body_1;
    if (d.body_2 && ps[1]) ps[1].textContent = d.body_2;
    if (ps[2] && (d.body_3 || d.gofundme_label)) {
      ps[2].innerHTML = (d.body_3 || '') +
        (d.gofundme_url ? ' <a href="' + d.gofundme_url + '" target="_blank" rel="noopener">' + (d.gofundme_label||'GoFundMe') + '</a>.' : '');
    }
    if (d.body_4 && ps[3]) ps[3].textContent = d.body_4;
  }

  // ── BOOT ────────────────────────────────────────────────────────

  var isGallery = window.location.pathname.indexOf('gallery') !== -1;

  document.addEventListener('DOMContentLoaded', function () {
    if (isGallery) {
      Promise.all([
        fetchYaml('/_data/gallery/page.yml'),
        fetchYaml('/_data/gallery/tiles.yml'),
        fetchYaml('/_data/gallery/spotlight.yml')
      ]).then(function(r) {
        applyGalleryPage(r[0]);
        applyGalleryTiles(r[1]);
        applySpotlight(r[2]);
      });
    } else {
      Promise.all([
        fetchYaml('/_data/homepage/hero.yml'),
        fetchYaml('/_data/homepage/hero_card.yml'),
        fetchYaml('/_data/homepage/mission.yml'),
        fetchYaml('/_data/homepage/what_we_do.yml'),
        fetchYaml('/_data/sections/events.yml'),
        fetchYaml('/_data/sections/support.yml'),
        fetchYaml('/_data/sections/contact_intro.yml'),
        fetchYaml('/_data/settings/contact.yml'),
        fetchYaml('/_data/team/board.yml'),
        fetchYaml('/_data/team/staff.yml')
      ]).then(function(r) {
        applyHero(r[0]);
        applyHeroCard(r[1]);
        applyMission(r[2]);
        applyWhatWeDo(r[3]);
        applyEvents(r[4]);
        applySupport(r[5]);
        applyContactIntro(r[6]);
        applyContact(r[7]);
        applyTeam(r[8], r[9]);
      });
    }
  });
})();
