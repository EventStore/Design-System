# @kurrent-ui/icon-manager

Automated icon inclusion for Kurrent design system.

## Install

```shell
yarn add --dev @kurrent-ui/icon-manager
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

### Namespace

```shell
icon namespace [namespace]
```

Sets or removes the namespace of the icons in the directory.
Prefix `namespace` with `@@` to use a symbol.
Omit `namespace` to remove the currently set namespace.

**Positionals**

| Option    | Description           | Required | Type   |
| --------- | --------------------- | -------- | ------ |
| namespace | The namespace to set. | no       | string |

**Options**

| Option | Alias | Description                 | Required | Type |
| ------ | ----- | --------------------------- | -------- | ---- |
| --dir  | -d    | Where your icons are stored | yes      | path |

**Examples**

Set namespace in `./icons` to the string "myNamespace".

```shell
icon namespace myNamespace --dir=./icons
```

Set namespace in `./icons` to a symbol exported as constant MY_NAMESPACE.

```shell
icon namespace @@myNamespace --dir=./icons
```

Remove namespace in `./icons`.

```shell
icon namespace --dir=./icons
```

Display help

```shell
icon namespace --help
```

### Upgrade

```shell
icon upgrade
```

Upgrades from an earlier version on `icon-manager` & `@kurrent-ui/components`

**Options**

| Option  | Alias | Description                                       | Required | Type    |
| ------- | ----- | ------------------------------------------------- | -------- | ------- |
| --dir   | -d    | Where your icons are stored                       | yes      | path    |
| --force |       | Forces an upgrade, even if version numbers match. |          | boolean |

**Examples**

Update icon set in `./icons`

```shell
icon upgrade --dir=./icons
```

Display help

```shell
icon upgrade --help
```

### Regenerate

```shell
icon regenerate
```

Regenerate your index from icons.json

**Options**

| Option | Alias | Description                 | Required | Type |
| ------ | ----- | --------------------------- | -------- | ---- |
| --dir  | -d    | Where your icons are stored | yes      | path |

**Examples**

Regenerate icon set in `./icons`

```shell
icon upgrade --dir=./icons
```

Display help

```shell
icon regenerate --help
```

### Display

Display icons in browser.

**Options**

| Option  | Alias | Description                 | Required | Type    | Default |
| ------- | ----- | --------------------------- | -------- | ------- | ------- |
| --dir   | -d    | Where your icons are stored | yes      | path    |         |
| --port  | -p    | Which port to host on       |          | number  | 8080    |
| --watch | -w    | Watch for changes           |          | boolean | true    |

**Examples**

Launch display server for icon set in `./icons`, on localhost:2022, watching for changes.

```shell
icon display --dir=./icons --port 2022
```

Don't watch for changes.

```shell
icon display --dir=./icons --watch false
```

Display help

```shell
icon display --help
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
