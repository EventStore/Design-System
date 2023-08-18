---
'@eventstore-ui/layout': minor
---

New component `es-sized-panel` has been added that can be placed in any layout area, with a custom start and end position. It will set the size of the corresponding area to its own size, much like how `es-sidebar` works.

The following props are available:

| Property | Attribute | Description                                                                 | Type                                                                                         | Default     |
| -------- | --------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------- |
| `area`   | `area`    | Where to place the panel.                                                   | `"banner" \| "cookie" \| "panel" \| "sidebar" \| "toolbar"`                                  | `'panel'`   |
| `end`    | `end`     | Where to end the panel, inclusive. Must be the opposite axis to the area.   | `"banner" \| "body" \| "cookie" \| "edge" \| "panel" \| "sidebar" \| "toolbar" \| undefined` | `undefined` |
| `start`  | `start`   | Where to start the panel, inclusive. Must be the opposite axis to the area. | `"banner" \| "body" \| "cookie" \| "edge" \| "panel" \| "sidebar" \| "toolbar" \| undefined` | `undefined` |
