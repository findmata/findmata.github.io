# FindMATA

Static website, no build step. Open `index.html` or serve the folder.

## Publish on GitHub Pages
1. Create a repo, upload everything in this folder to the `main` branch.
2. Settings > Pages > Source: `Deploy from a branch`, branch `main`, folder `/ (root)`.
3. The site goes live at `https://<username>.github.io/<repo>/`.

## Edit
All in `app.js`:
- `EMAIL`, `WA` (WhatsApp number, digits only with country code, e.g. 62812xxxxxxxx), `IG`.
- `O`: objects. Add `price:` (IDR number) to show prices and totals in the cart.
- `IMG` + `card` / `ph`: photos. Put the file in `assets/`, add it to `IMG`, then list its key in an object's `ph` array. More than one photo makes the slider and thumbnails use them instead of the "coming soon" slots.

