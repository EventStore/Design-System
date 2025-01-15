# @kurrent-ui/utils

## 2.1.0

### Minor Changes

-   [`818bf6a1`](https://github.com/EventStore/Design-System/commit/818bf6a1bbdf723a40609524d7d6ee3bfe0c790d) - `HTTPError` has two new helper methods for modifying it's problem details

    ### `HTTPError.mapProblemDetails`

    Allows you to create a new HTTPError that will call the passed mapping function on it's details.

    Example usage:

    ```ts
    try {
        await callAPI();
    } catch (e) {
        if (HTTPError.isHTTPError(error)) {
            throw error.mapProblemDetails((details) => ({
                ...details,
                title: "Its's okay..",
            }));
        }

        throw error;
    }
    ```

    ### `HTTPError.mapFieldKeys`

    Allows you to create a new HTTPError that will call the passed mapping function on it's detail's field keys.

    Example usage:

    ```ts
    try {
    	await callAPI();
    } catch (e) {
    	if (HTTPError.isHTTPError(error)) {
    	    throw throw error.mapFieldKeys((key) =>
                key.replace(/^chicken/, 'turkey'),
            );
    	}

    	throw error;
    }

    ```

## 2.0.0

### Major Changes

-   [`e0c7cfdf`](https://github.com/EventStore/Design-System/commit/e0c7cfdf8c14e5bb5183e0c9f8c947e44fb8f368) - Move to @kurrent-ui namespace

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
