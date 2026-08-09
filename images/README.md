# Images

- `gallery/` — general campus-life photos shown in the **Gallery** section (`#gallery`).
- `instagram/` — photos pulled from **@nvm.patasang** shown in the **Follow along on Instagram** section (`#instagram`).

## Adding a real photo

Drop the file in the right folder, then in `index.html` swap a placeholder tile for one with an `<img>`, e.g.:

```html
<!-- Gallery tile -->
<button class="gallery-tile" data-lightbox data-caption="Annual Day 2026">
  <img src="images/gallery/annual-day-2026.jpg" alt="Annual Day 2026" loading="lazy">
  <span>Annual Day</span>
</button>

<!-- Instagram tile -->
<button class="insta-tile" data-lightbox data-caption="Caption text from the post goes here.">
  <img src="images/instagram/post-01.jpg" alt="Caption text from the post goes here." loading="lazy">
</button>
```

Keep filenames short and kebab-case. Compress photos before adding them (aim under ~300KB each) so the page stays fast.
