---
'@eventstore-ui/layout': minor
---

Improve styleability of `es-layout-link` and `es-layout-button`.

Changed:

-   Use `focus-visible` rather than `focus`.

Added parts:

-   `counter` - The counter element, if rendered.
-   `badge` - The badge element, if rendered.
-   `icon` - The icon element, if rendered.

Added css variables:

-   `--icon-gap` - The space between the icon and the text
-   `--icon-size` - The size of the icon.
-   `--vertical-spacing` - The total space between one button and another.
-   `--highlight-color` - The text color when the button is focused or hovered.
-   `--highlight-background-color` - The background color when the button is focused or hovered.
-   `--highlight-decoration` - The text decoration when the button is focused or hovered.
