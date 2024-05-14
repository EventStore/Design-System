---
'@eventstore-ui/components': minor
---

Previously, when passing data directly to a table's rows (rather than passing strings and using `getCellData`), the data objects were being used as keys, causing unnecessary re-renders.

`es-table` will now warn when this is happening, and exposes a new prop `getRowKey` to allow you to convert the data into a stable key.

`renderExpansion` is now more accurately typed to have the passed row as `any` and and additionally recieves this converted key, as well as the index of the row.
`rowClass` is also more accurately typed to have the passed row as `any`.

`es-table-nested` exposes both `getRowKey` and `getNestedRowKey` for the nested table.
