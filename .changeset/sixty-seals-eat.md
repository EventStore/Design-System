---
'@eventstore-ui/layout': minor
---

Allow `es-panel` and `es-sized-panel` to target the header area

Previously, the `header` area was considered a special case, as it would always contain the header.
We now allow the area to be targetted by panels and is treated like any other layout area.
