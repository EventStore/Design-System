---
'@eventstore-ui/components': minor
---

`es-tabs`

**Features**

-   Add an icon between tabs with the `interTabIcon` and `interTabIconSize` props.
-   "header-end" slot added, for placing buttons alongside tabs

**Improvements**

-   Tab sizes are now tracked, so that the indicator resizes (without animating) when the tabs are resized.
-   Tabs will now evenly collapse, and elipsis overflowing text

**Bug fixes**

-   `activeParam` prop can now be changed after initial render
