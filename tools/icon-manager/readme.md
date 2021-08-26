# @eventstore/icon-manager

Automated icon inclusion for Event Store design system.

## Install

```shell
yarn add --dev @eventstore/icon-manager
```

## Usage

**Global options**

| Option    | Description                   |
| --------- | ----------------------------- |
| --help    | Display help for this command |
| --version | Display the current version   |

### Add

```shell
icon add [name]
```

Adds an icon with the specified name to the specified directory, updating the index file

**Positionals**

| Option | Description                                              | Required | Type   |
| ------ | -------------------------------------------------------- | -------- | ------ |
| name   | The name of your icon (Will be converted to pascal case) | yes      | string |

**Options**

| Option      | Alias | Description                                                                            | Required | Type    |
| ----------- | ----- | -------------------------------------------------------------------------------------- | -------- | ------- |
| --dir       | -d    | Where to store your icons                                                              | yes      | path    |
| --file      | -f    | Take the SVG from a file path. Absolute, or relative to the current working directory. |          | path    |
| --clipboard | -c    | Take the SVG from the clipboard. Can have a file in your clipboard, or the svg data.   |          | boolean |
| --force     |       | Overwrite existing icons or aliases                                                    |          | boolean |

**Examples**

Add `MyIcon.tsx` to `./icons` from `./svg-icon.svg`

```shell
icon add MyIcon --dir=./icons --file=./svg-icon.svg
```

Add `MyIcon.tsx` to `./icons` from clipboard

```shell
icon add MyIcon --dir=./icons -c
```

Display help

```shell
icon add --help
```

### Remove

```shell
icon remove [name]
```

Removes the icon or alias with the specified name from specified directory, updating the index file

**Positionals**

| Option | Description                 | Required | Type   |
| ------ | --------------------------- | -------- | ------ |
| name   | The name the icon to remove | yes      | string |

**Options**

| Option | Alias | Description                 | Required | Type |
| ------ | ----- | --------------------------- | -------- | ---- |
| --dir  | -d    | Where your icons are stored | yes      | path |

**Examples**

Remove `MyIcon` from `./icons`

```shell
icon remove MyIcon --dir=./icons
```

Display help

```shell
icon remove --help
```

### Alias

```shell
icon alias [name] [alias]
```

Aliases the icon with the specified name from specified directory, updating the index file

**Positionals**

| Option | Description                | Required | Type   |
| ------ | -------------------------- | -------- | ------ |
| name   | The name the icon to alias | yes      | string |
| alias  | The name you want to alias | yes      | string |

**Options**

| Option | Alias | Description                 | Required | Type |
| ------ | ----- | --------------------------- | -------- | ---- |
| --dir  | -d    | Where your icons are stored | yes      | path |

**Examples**

Remove `MyIcon` from `./icons`

```shell
icon alias MyIcon YourIcon --dir=./icons
```

Display help

```shell
icon alias --help
```

## Pro tip

Add `icon` as a script in your package.json, set the directory for your project

**package.json**

```json
{
    "scripts": {
        "icon": "icon --dir=./src/icons"
    }
}
```

**usage**

```shell
yarn icon add MyIcon -c
```
