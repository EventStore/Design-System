---
'@kurrent-ui/fields': minor
---

`FieldChangeEvent` is now more flexible.

Previously, it only took the complete form type, and a key to the form:

```ts
interface MyForm {
    something: number;
    another: string;
}

const handleSomethingChange = (e: FieldChangeEvent<MyForm, 'something'>) => {
    // e.details is now `{ name: "something", value: number }`
};
```

Now, you can also pass a typing as a single value, so it is easier to use outside of a validatedForm context:

```ts
const handleSomethingChange = (e: FieldChangeEvent<number>) => {
    // e.details is now `{ name: string, value: number }`
};
```
