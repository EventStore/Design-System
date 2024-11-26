## Using favicons

Add the favicons to your asset serving.

Insert the following into the `<head>`

```html
<link
    rel="icon"
    type="image/png"
    href="/assets/favicons/favicon-96x96.png"
    sizes="96x96"
/>
<link rel="icon" type="image/svg+xml" href="/assets/favicons/favicon.svg" />
<link rel="shortcut icon" href="/assets/favicons/favicon.ico" />
<link
    rel="apple-touch-icon"
    sizes="180x180"
    href="/assets/favicons/apple-touch-icon.png"
/>
<link rel="manifest" href="/assets/site.webmanifest" />
```

Create a `site.manifest` with the following:

```json
{
    "name": "MyWebSite",
    "short_name": "MySite",
    "icons": [
        {
            "src": "/assets/favicons/web-app-manifest-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
        },
        {
            "src": "/assets/favicons/web-app-manifest-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
        }
    ],
    "theme_color": "#ffffff",
    "background_color": "#ffffff",
    "display": "standalone"
}
```
