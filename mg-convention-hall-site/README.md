
# M.G Convention Hall — Phase 1 Website

Premium static launch website — V2 visual redesign — built with:

- HTML5
- Tailwind CSS via Play CDN
- Custom CSS for the visual system and responsive behavior
- Vanilla JavaScript
- IntersectionObserver reveal animations
- Scroll + pointer hero parallax
- Responsive mobile navigation
- Filterable gallery + lightbox
- WhatsApp / email enquiry handoff
- Google Maps query embed

## Source material used

The supplied documents were used as the visual/content foundation:

1. `02.002.2026 -MG CONVENTION CENTRE LANDSCAPE VIEWS.pdf`
2. `16-03-2026 ROOMSTAY .pdf`

The site uses representative rendered images from those PDFs. No unsupported phone number, email, exact postal address, capacity, pricing, or amenity claim has been invented.

## Important before launch

Edit:

`js/config.js`

Replace:

- phoneDisplay
- phoneHref
- whatsappNumber
- email
- address
- mapsQuery

Also verify every operational facility/amenity before publishing it as a factual claim.

## Structure

```text
mg-convention-hall-site/
├── index.html
├── README.md
├── assets/
│   └── images/
│       ├── landscape/
│       └── rooms/
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── components.js
│   ├── config.js
│   ├── contact.js
│   └── gallery.js
└── pages/
    ├── about.html
    ├── gallery.html
    └── contact.html
```

## Run locally

Because this is a static site, use any local HTTP server.

### Python

```bash
python3 -m http.server 5500
```

Open:

`http://localhost:5500`

### VS Code

Use Live Server or any static server extension.

## Production recommendation

For the final production build, replace Tailwind Play CDN with a compiled Tailwind pipeline (Vite + Tailwind or another build system), convert images to WebP/AVIF, add real SEO/Open Graph metadata, connect the enquiry form to a backend/API, and add analytics/consent handling.


## V2 Homepage flow

1. Hero Banner
2. About the Venue
3. Key Highlights
4. Convention Hall
5. Dining
6. Rooms
7. Garden / Outdoor Area
8. Facilities
9. Gallery
10. Location
11. Enquiry / Contact

## V2 visual system

Section headings are intentionally kept at **32px** with a lighter typographic hierarchy. Body copy uses lighter 300/400 weights, while 500 is reserved for labels, navigation and actions. The palette has been moved to a warmer luxury direction: deep charcoal, ivory/cream, stone/sand, muted olive and restrained antique-gold accents.

The homepage is image-led and uses the supplied project visualizations rather than generic stock imagery.
