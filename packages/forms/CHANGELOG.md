# @kurrent-ui/forms

## 2.1.0

### Minor Changes

-   [`2f6239c9`](https://github.com/EventStore/Design-System/commit/2f6239c9f88192f88af1df12ef2300cadcf58ce6) - `createValidatedForm` has a new option `shouldValidateBranch` for helping to create branching forms.

    When a parent validated form is validated, it will only call validation on a nested validated form if `shouldValidateBranch` returns true (or is `undefined`).
    `shouldValidateBranch` is passed the data of the top level form which had validation called on it, it's own data, and the reason for validating.

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
        pizzaToppings: createValidatedForm<
            DinnerForm['pizzaToppings'],
            DinnerForm
        >(
            {
                pepperoni: true,
                pineapple: true,
            },
            {
                shouldValidateBranch: (root) => root.mealType === 'pizza',
            },
        ),
    });
    ```

## 2.0.0

### Major Changes

-   [`e0c7cfdf`](https://github.com/EventStore/Design-System/commit/e0c7cfdf8c14e5bb5183e0c9f8c947e44fb8f368) - Move to @kurrent-ui namespace

## 1.0.3

### Patch Changes

-   [`13df770`](https://github.com/EventStore/Design-System/commit/13df7704117fdc1fc483bd2d3c05925e6229b061) - Fix publishing

## 1.0.2

### Patch Changes

-   [`20dcceb`](https://github.com/EventStore/Design-System/commit/20dccebe11067986fd5eb31aa7f9e5bf03063017) - Standardization of builds across design system libraries.

## 1.0.1

### Patch Changes

-   [`3098fc9`](https://github.com/EventStore/Design-System/commit/3098fc9c968278353a08c843fecf4a44368453a4) - Improve ValidatedForm connection typing to support Map and Set.

## 1.0.0

### Minor Changes

-   [`1069a5d`](https://github.com/EventStore/Design-System/commit/1069a5d3af7986c56fd616049402315a59bc438c) - Update stencil to v4.0.2

### Patch Changes

-   Updated dependencies [[`1069a5d`](https://github.com/EventStore/Design-System/commit/1069a5d3af7986c56fd616049402315a59bc438c)]:
    -   @eventstore-ui/components@1.0.0
    -   @eventstore-ui/stores@1.0.0
