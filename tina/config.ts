import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: "f20ee16d-b53a-4382-bff0-7fe8adf96472",
  token: "9da37bda035d1a40011b21dd8f4eb28a247fe65a",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // ── Homepage: Hero ──────────────────────────────────────────
      {
        name: "hero",
        label: "Homepage – Hero",
        path: "_data/homepage",
        match: { include: "hero" },
        format: "yaml",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "headline",           label: "Headline",            required: true },
          { type: "string", name: "subheadline",         label: "Subheadline",          ui: { component: "textarea" } },
          { type: "string", name: "cta_primary_text",    label: "Primary CTA Text" },
          { type: "string", name: "cta_primary_link",    label: "Primary CTA Link" },
          { type: "string", name: "cta_secondary_text",  label: "Secondary CTA Text" },
          { type: "string", name: "cta_secondary_link",  label: "Secondary CTA Link" },
          { type: "string", name: "hero_meta",           label: "Hero Meta Text",       ui: { component: "textarea" } },
        ],
      },

      // ── Homepage: Hero Card (Event Callout) ────────────────────
      {
        name: "hero_card",
        label: "Homepage – Hero Card",
        path: "_data/homepage",
        match: { include: "hero_card" },
        format: "yaml",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string",  name: "title",         label: "Title" },
          { type: "string",  name: "date_label",     label: "Date" },
          { type: "string",  name: "time_label",     label: "Time" },
          { type: "string",  name: "location_label", label: "Location" },
          { type: "string",  name: "description",    label: "Description",  ui: { component: "textarea" } },
          { type: "image",   name: "image",          label: "Image" },
          { type: "string",  name: "image_alt",      label: "Image Alt Text" },
          { type: "string",  name: "ticket_url",     label: "Ticket URL" },
        ],
      },

      // ── Homepage: Mission ──────────────────────────────────────
      {
        name: "mission",
        label: "Homepage – Mission",
        path: "_data/homepage",
        match: { include: "mission" },
        format: "yaml",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "heading", label: "Heading" },
          { type: "string", name: "body_1",  label: "Body Paragraph 1", ui: { component: "textarea" } },
          { type: "string", name: "body_2",  label: "Body Paragraph 2", ui: { component: "textarea" } },
        ],
      },

      // ── Homepage: What We Do ───────────────────────────────────
      {
        name: "what_we_do",
        label: "Homepage – What We Do",
        path: "_data/homepage",
        match: { include: "what_we_do" },
        format: "yaml",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "heading",    label: "Heading" },
          { type: "string", name: "card_1_title", label: "Card 1 Title" },
          { type: "string", name: "card_1_body",  label: "Card 1 Body",  ui: { component: "textarea" } },
          { type: "string", name: "card_2_title", label: "Card 2 Title" },
          { type: "string", name: "card_2_body",  label: "Card 2 Body",  ui: { component: "textarea" } },
          { type: "string", name: "card_3_title", label: "Card 3 Title" },
          { type: "string", name: "card_3_body",  label: "Card 3 Body",  ui: { component: "textarea" } },
        ],
      },

      // ── Section: Events ────────────────────────────────────────
      {
        name: "events",
        label: "Section – Events",
        path: "_data/sections",
        match: { include: "events" },
        format: "yaml",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "heading",    label: "Heading" },
          { type: "string", name: "intro",      label: "Intro",       ui: { component: "textarea" } },
          { type: "string", name: "bullet_1",   label: "Bullet 1" },
          { type: "string", name: "bullet_2",   label: "Bullet 2" },
          { type: "string", name: "bullet_3",   label: "Bullet 3" },
          { type: "string", name: "footer_note",label: "Footer Note", ui: { component: "textarea" } },
          { type: "string", name: "featured_card_title",         label: "Featured Card Title" },
          { type: "string", name: "featured_card_intro",         label: "Featured Card Intro",        ui: { component: "textarea" } },
          { type: "string", name: "featured_card_body",          label: "Featured Card Body",         ui: { component: "textarea" } },
          { type: "string", name: "featured_card_wexler_note",   label: "Featured Card Wexler Note",  ui: { component: "textarea" } },
          { type: "string", name: "featured_card_gofundme_label",label: "GoFundMe Link Label" },
          { type: "string", name: "featured_card_gofundme_url",  label: "GoFundMe URL" },
          { type: "string", name: "featured_card_tickets_label", label: "Tickets Link Label" },
          { type: "string", name: "featured_card_tickets_url",   label: "Tickets URL" },
        ],
      },

      // ── Section: Support ───────────────────────────────────────
      {
        name: "support",
        label: "Section – Ways to Help",
        path: "_data/sections",
        match: { include: "support" },
        format: "yaml",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "heading",       label: "Heading" },
          { type: "string", name: "intro",         label: "Intro",         ui: { component: "textarea" } },
          { type: "string", name: "bullet_1",      label: "Bullet 1" },
          { type: "string", name: "bullet_2",      label: "Bullet 2" },
          { type: "string", name: "bullet_3",      label: "Bullet 3" },
          { type: "string", name: "bullet_4",      label: "Bullet 4" },
          { type: "string", name: "card_title",    label: "Card Title" },
          { type: "string", name: "card_body",     label: "Card Body",     ui: { component: "textarea" } },
          { type: "string", name: "card_link_label",label: "Card Link Label" },
          { type: "string", name: "card_link_url",  label: "Card Link URL" },
        ],
      },

      // ── Section: Contact Intro ─────────────────────────────────
      {
        name: "contact_intro",
        label: "Section – Contact Intro",
        path: "_data/sections",
        match: { include: "contact_intro" },
        format: "yaml",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "heading", label: "Heading" },
          { type: "string", name: "intro",   label: "Intro", ui: { component: "textarea" } },
        ],
      },

      // ── Settings: Contact ──────────────────────────────────────
      {
        name: "contact",
        label: "Settings – Contact",
        path: "_data/settings",
        match: { include: "contact" },
        format: "yaml",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "email",         label: "Email" },
          { type: "string", name: "phone",         label: "Phone" },
          { type: "string", name: "facebook",      label: "Facebook URL" },
          { type: "string", name: "instagram",     label: "Instagram URL" },
          { type: "string", name: "linkedin",      label: "LinkedIn URL" },
          { type: "string", name: "mailing_name",  label: "Mailing Name" },
          { type: "string", name: "mailing_street",label: "Mailing Street" },
          { type: "string", name: "mailing_city",  label: "Mailing City" },
        ],
      },

      // ── Settings: Donation ─────────────────────────────────────
      {
        name: "donation",
        label: "Settings – Donation",
        path: "_data/settings",
        match: { include: "donation" },
        format: "yaml",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "url",   label: "Donation URL" },
          { type: "string", name: "label", label: "Donation Button Label" },
        ],
      },

      // ── Team: Board Members ────────────────────────────────────
      {
        name: "board",
        label: "Team – Board Members",
        path: "_data/team",
        match: { include: "board" },
        format: "yaml",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "members",
            label: "Members",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name }) },
            fields: [
              { type: "string", name: "name",  label: "Name",  required: true },
              { type: "string", name: "title", label: "Title" },
              { type: "image",  name: "image", label: "Photo" },
            ],
          },
        ],
      },

      // ── Team: Staff & Partners ─────────────────────────────────
      {
        name: "staff",
        label: "Team – Staff & Partners",
        path: "_data/team",
        match: { include: "staff" },
        format: "yaml",
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object",
            name: "members",
            label: "Members",
            list: true,
            ui: { itemProps: (item) => ({ label: item?.name }) },
            fields: [
              { type: "string", name: "name",  label: "Name",  required: true },
              { type: "string", name: "title", label: "Title" },
              { type: "image",  name: "image", label: "Photo" },
            ],
          },
        ],
      },
    ],
  },
});
