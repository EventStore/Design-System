---
'@kurrent-ui/forms': minor
---

`createValidatedForm` has a new option `branchIsActive` for helping to create branching forms.

When a parent validated form is validated, it will only call validation on a nested validated form if `branchIsActive` returns true (or is `undefined`).
`branchIsActive` is passed the data of the top level form which had validation called on it, it's own data, and the reason for validating.

Example usage

```ts
interface DinnerForm {
    mealType: string;
    pizzaToppings: {
        pepperoni: boolean;
        pineapple: boolean;
    };
}

const form = createValidatedForm<DinnerForm, DinnerForm>({
    mealType: '',
    pizzaToppings: createValidatedForm<DinnerForm['pizzaToppings'], DinnerForm>(
        {
            pepperoni: true,
            pineapple: true,
        },
        {
            branchIsActive: (root) => root.mealType === 'pizza',
        },
    ),
});
```
