# @kurrent-ui/utils

## 1.2.2

### Patch Changes

-   [`13df770`](https://github.com/EventStore/Design-System/commit/13df7704117fdc1fc483bd2d3c05925e6229b061) - Fix publishing

## 1.2.1

### Patch Changes

-   [`20dcceb`](https://github.com/EventStore/Design-System/commit/20dccebe11067986fd5eb31aa7f9e5bf03063017) - Standardization of builds across design system libraries.

## 1.2.0

### Minor Changes

-   [`e1ee71d`](https://github.com/EventStore/Design-System/commit/e1ee71dcc4f3c6769d20ef247f5cb1f6d4d470f8) - New helpers:

    -   `piercingQuerySelectorAll` will select elements with a selector while piercing inside the shadowDOM.
    -   `slottedQuerySelectorAll` will select elements that a slotted in a slot, optionally piercing inside their shadowDOM.

## 1.1.1

### Patch Changes

-   [`dee32f4`](https://github.com/EventStore/Design-System/commit/dee32f4bf51e48e909423e36709905cce58fc5fe) - BUGFIX: don't select `display: contents;` or `display: hidden;` elements as scroll parent, as they cannot scroll.

## 1.1.0

### Minor Changes

-   [`e54766e`](https://github.com/EventStore/Design-System/commit/e54766ee33543eedbe591f2a56a089a19e800afd) - New utility function getScrollParent
    Traverses the dom tree including shadow doms to find the first element that scrolls.
