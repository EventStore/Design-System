# @eventstore-ui/utils

## 1.1.1

### Patch Changes

-   [`dee32f4`](https://github.com/EventStore/Design-System/commit/dee32f4bf51e48e909423e36709905cce58fc5fe) - BUGFIX: don't select `display: contents;` or `display: hidden;` elements as scroll parent, as they cannot scroll.

## 1.1.0

### Minor Changes

-   [`e54766e`](https://github.com/EventStore/Design-System/commit/e54766ee33543eedbe591f2a56a089a19e800afd) - New utility function getScrollParent
    Traverses the dom tree including shadow doms to find the first element that scrolls.
