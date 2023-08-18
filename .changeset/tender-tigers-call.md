---
'@eventstore-ui/layout': minor
---

`es-panel` can now be placed in any layout area, with a custom start and end position.
You can also set a `closedMode`to allow the panel to collapse when dragged past the`closedSize`.
It remains backwards compatible with previous usage.

The following new props have been added:

| Property       | Attribute       | Description                                                                 | Type                                                                                         | Default     |
| -------------- | --------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------- |
| `area`         | `area`          | Where to place the panel.                                                   | `"banner" \| "cookie" \| "panel" \| "sidebar" \| "toolbar"`                                  | `'panel'`   |
| `closeAt`      | `close-at`      | When to snap the panel closed (if a closed mode is set).                    | `number`                                                                                     | `100`       |
| `closedMode`   | `closed-mode`   | How the panel should respond to being closed.                               | `"collapsed" \| "none"`                                                                      | `'none'`    |
| `closedSize`   | `closed-size`   | How large the panel should be when closed.                                  | `number`                                                                                     | `34`        |
| `defaultSize`  | `default-size`  | What size to default to.                                                    | `number`                                                                                     | `200`       |
| `end`          | `end`           | Where to end the panel, inclusive. Must be the opposite axis to the area.   | `"banner" \| "body" \| "cookie" \| "edge" \| "panel" \| "sidebar" \| "toolbar" \| undefined` | `undefined` |
| `minimumSize`  | `minimum-size`  | The minimum possible size to resize to.                                     | `number`                                                                                     | `100`       |
| `rememberMode` | `remember-mode` | If the last mode of the panel should be kept in local storage.              | `boolean \| string \| undefined`                                                             | `undefined` |
| `rememberSize` | `remember-size` | If the size of the panel should be kept in local storage.                   | `boolean \| string \| undefined`                                                             | `undefined` |
| `start`        | `start`         | Where to start the panel, inclusive. Must be the opposite axis to the area. | `"banner" \| "body" \| "cookie" \| "edge" \| "panel" \| "sidebar" \| "toolbar" \| undefined` | `undefined` |
