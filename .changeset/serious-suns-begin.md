---
'@eventstore-ui/components': minor
---

Previously, a popover would have zindex of 1000 and modals a zindex of 3100. As popovers and modals appear outside of the document flow, these zindexes are relative to the base of the document.

This usually worked out fine, as if you had an open popover and opened a modal, it would appear behind it:

```
┌────────────────┐
│ Modal          │
│                │
│ zindex: 3100   ├─────────┐
│                │ popover │
│                │         │
└───────────┬────┘         │
            │ zindex: 1000 │
            └──────────────┘
```

However, if you placed a popover inside a modal, it would appear behind it's parent modal:

```
     ┌────────────────┐
     │ Modal          │
     │                │
     │ zindex: 3100   ├─────────┐
     │                │ popover │
┌────┤                │         │
│    └─────────┬─┬────┘         │
│ popover      │ │ zindex: 1000 │
│ in modal     │ └──────────────┘
│              │
│ zindex: 4100 │
└──────────────┘
```

In this case, you would have to handle this yourself, and set the zindex manually.

This update causes nested popovers and modals to stack their zindexes:

```
     ┌────────────────┐
     │ Modal          │
     │                │
     │ zindex: 3100   ├─────────┐
     │                │ popover │
┌────┴─────────┐      │         │
│              ├─┬────┘         │
│ popover      │ │ zindex: 1000 │
│ in modal     │ └──────────────┘
│              │
│ zindex: 4100 │
└──────────────┘
```

This means that you don't need to keep track of z-indexes yourself, and allow you nest freely.

It is also possible to manually increase the z-index stack by setting the css-var `--zindex-base`. This is useful for places where you have a z-index and may want a dropdown to appear, such as a header.
