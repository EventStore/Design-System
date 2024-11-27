# l2-theme-dropdown

<!-- Auto Generated Below -->


## Overview

A theme picker dropdown for the header

## Usage

### Example

```tsx
export default () => (
    <l2-header>
        <l2-theme-dropdown slot={'right'} />
        <l2-nav
            navTree={[
                {
                    title: 'Link 1',
                    url: '/a',
                },
                {
                    title: 'Link 2',
                    url: '/b',
                },
                {
                    title: 'Link 3',
                    url: '/c',
                },
            ]}
            slot={'under'}
        />
    </l2-header>
);
```



## Dependencies

### Depends on

- [l2-header-dropdown](../header-dropdown)
- [l2-theme-picker](../theme-picker)

### Graph
```mermaid
graph TD;
  l2-theme-dropdown --> l2-header-dropdown
  l2-theme-dropdown --> l2-theme-picker
  l2-header-dropdown --> c2-button
  l2-header-dropdown --> c2-counter
  l2-header-dropdown --> c2-badge
  l2-header-dropdown --> c2-icon
  l2-header-dropdown --> c2-popover
  c2-badge --> c2-counter
  c2-popover --> c2-popper
  c2-popover --> c2-popper-inner
  c2-popover --> c2-popper-x
  c2-popover --> c2-popper-y
  style l2-theme-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


