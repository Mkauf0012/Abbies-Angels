/**
 * cms-data.js — Fetches Decap CMS YAML data files and injects them into the page.
 * Falls back gracefully to existing hardcoded content if fetch fails.
 */
(function () {
  'use strict';

  // Minimal YAML parser for simple key: value and multi-line literals (|)
  function parseSimpleYaml(text) {
    const result = {};
    const lines = text.split('\n');
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const match = line.match(/^([\w_]+):\s*(.*)$/);
      if (!match) { i++; continue; }
      const key = match[1];
      let val = match[2].trim();
      // Quoted string
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        result[key] = val.slice(1, -1).replace(/\\n/g, '\n');
        i++;
        continue;
      }
      // Boolean
      if (val === 'true') { result[key] = true; i++; continue; }
      if (val === 'false') { result[key] = false; i++; continue; }
      // Block scalar (|)
      if (val === '|') {
        const indent = (lines[i + 1] || '').match(/^(\s+)/);
        const baseIndent = indent ? indent[1].length : 2;
        const block = [];
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
    if (d.heading) {
      var h = sec.querySelector('h2');
      if (h) h.textContent = d.heading;
    }
    if (d.body) {
      var paras = d.body.split(/\n\n+/);
      var existing = sec.querySelectorAll('p');
      paras.forEach(function (txt, idx) {
        if (existing[idx]) {
          existing[idx].textContent = txt.trim();
        } else {
          var p = document.createElement('p');
          p.textContent = txt.trim();
          sec.appendChild(p);
        }
      });
    }
  }

  function applyDonation(d) {
    if (!d) return;
    // Update all donate/auctria links if button_url is set
    if (d.button_url) {
      document.querySelectorAll('a[href*="auctria.events"]').forEach(function (a) {
        a.href = d.button_url;
      });
    }
  }

  function applyContact(d) {
    if (!d) return;
    if (d.email) {
      var emailLink = document.querySelector('a[href^="mailto:"]');
      if (emailLink) {
        emailLink.href = 'mailto:' + d.email;
        emailLink.textContent = d.email;
      }
    }
    if (d.facebook) setHref('a[href*="facebook.com"]', d.facebook);
    if (d.instagram) setHref('a[href*="instagram.com"]', d.instagram);
  }

  document.addEventListener('DOMContentLoaded', function () {
    Promise.all([
      fetchYaml('/_data/homepage/hero.yml'),
      fetchYaml('/_data/homepage/mission.yml'),
      fetchYaml('/_data/settings/donation.yml'),
      fetchYaml('/_data/settings/contact.yml')
    ]).then(function (results) {
      applyHero(results[0]);
      applyMission(results[1]);
      applyDonation(results[2]);
      applyContact(results[3]);
    });
  });
})();
