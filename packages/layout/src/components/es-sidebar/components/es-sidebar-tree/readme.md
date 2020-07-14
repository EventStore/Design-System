# es-sidebar-tree

## Example

<es-sidebar-tree root name={'Getting Started'}>
<es-sidebar-tree
name={'install, run and write your first event'}
urlMatch={'/level_1'} >
<es-sidebar-link url={'/level_1/a'}>
{'install and run Event Store'}
</es-sidebar-link>
<es-sidebar-link url={'/level_1/b'}>
{'Interacting with an Event Store server'}
</es-sidebar-link>
<es-sidebar-link url={'/level_1/level_1_2/a'}>
{'First call to HTTP API'}
</es-sidebar-link>
<es-sidebar-link url={'/level_1/level_1_2/a'}>
{'Connecting to Event Store'}
</es-sidebar-link>
<es-sidebar-link url={'/level_1/level_1_2/a'}>
{'Writing events to an Event Stream'}
</es-sidebar-link>
<es-sidebar-link url={'/level_1/level_1_2/a'}>
{'Next step'}
</es-sidebar-link>
</es-sidebar-tree>
<es-sidebar-tree
name={'install, run and write your first event'}
urlMatch={'/level_1'} >
<es-sidebar-link url={'/level_1/level_1_2/a'}>
{'Next step'}
</es-sidebar-link>
</es-sidebar-tree>
</es-sidebar-tree>

```tsx
<es-sidebar-tree root name={'Getting Started'}>
    <es-sidebar-tree
        name={'install, run and write your first event'}
        urlMatch={'/level_1'}
    >
        <es-sidebar-link url={'/level_1/a'}>
            {'install and run Event Store'}
        </es-sidebar-link>
        <es-sidebar-link url={'/level_1/b'}>
            {'Interacting with an Event Store server'}
        </es-sidebar-link>
        <es-sidebar-link url={'/level_1/level_1_2/a'}>
            {'First call to HTTP API'}
        </es-sidebar-link>
        <es-sidebar-link url={'/level_1/level_1_2/a'}>
            {'Connecting to Event Store'}
        </es-sidebar-link>
        <es-sidebar-link url={'/level_1/level_1_2/a'}>
            {'Writing events to an Event Stream'}
        </es-sidebar-link>
        <es-sidebar-link url={'/level_1/level_1_2/a'}>
            {'Next step'}
        </es-sidebar-link>
    </es-sidebar-tree>
    <es-sidebar-tree
        name={'install, run and write your first event'}
        urlMatch={'/level_1'}
    >
        <es-sidebar-link url={'/level_1/level_1_2/a'}>
            {'Next step'}
        </es-sidebar-link>
    </es-sidebar-tree>
</es-sidebar-tree>
```

<!-- Auto Generated Below -->


## Properties

| Property            | Attribute   | Description | Type                  | Default     |
| ------------------- | ----------- | ----------- | --------------------- | ----------- |
| `icon`              | `icon`      |             | `string \| undefined` | `undefined` |
| `name` _(required)_ | `name`      |             | `string`              | `undefined` |
| `root`              | `root`      |             | `boolean`             | `false`     |
| `url`               | `url`       |             | `string \| undefined` | `undefined` |
| `urlMatch`          | `url-match` |             | `string \| undefined` | `undefined` |


## Dependencies

### Depends on

- [es-sidebar-link](../es-sidebar-link)

### Graph
```mermaid
graph TD;
  es-sidebar-tree --> es-sidebar-link
  style es-sidebar-tree fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


