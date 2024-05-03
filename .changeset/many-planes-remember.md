---
'@eventstore-ui/layout': minor
---

Collapsable panels

New Components:

-   `es-layout-auto-label`: Attaches a popover label to selected children
-   `es-layout-hr`: A horizontal rule, for dividing vertical panels

Improvements:

-   `es-panel` will now share it's panel mode with it's decendants, allowing them to change in response.
-   `es-layout-button` & `es-layout-link` will change to a "collapsed" mode an ancestral `es-panel` is collapsed.
-   `es-layout-section` will apply a popover label to collapsed `es-layout-button` & `es-layout-link`, and style itself for collapsing.
-   `es-icon` can now be used as an ouroboros, without text.

Bug fixes:

-   `es-sized-panel` will correctly reset it's layout area on dismount.
