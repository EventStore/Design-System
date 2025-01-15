---
'@kurrent-ui/utils': minor
---

`HTTPError` has two new helper methods for modifying it's problem details

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
