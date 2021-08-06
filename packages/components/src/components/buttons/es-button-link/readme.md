# es-button-link



<!-- Auto Generated Below -->


## Usage

### Example

```tsx
import { randomIcon } from 'helpers';

export default () =>
    ['filled', 'outline', 'minimal', 'link'].map((variant) =>
        ['primary', 'secondary', 'white', 'text'].map((color) => (
            <es-button-link
                variant={variant}
                color={color}
                forceRefresh
                target={'_blank'}
                url={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
            >
                {`${variant} ${color}`}
                <es-icon icon={randomIcon()} slot={'after'} />
            </es-button-link>
        )),
    );
```

```css
:host {
    display: grid;
    grid-template-columns: auto auto;
    gap: 20px;
    align-items: center;
    justify-items: center;
}
```



## Properties

| Property         | Attribute          | Description                                                                                                                    | Type                                            | Default     |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- | ----------- |
| `anchorClass`    | `anchor-class`     | Class for the contained anchor element                                                                                         | `string \| undefined`                           | `undefined` |
| `anchorId`       | `anchor-id`        | Id for the contained anchor element                                                                                            | `string \| undefined`                           | `undefined` |
| `anchorRole`     | `anchor-role`      | Role for the contained anchor element                                                                                          | `string \| undefined`                           | `undefined` |
| `anchorTabIndex` | `anchor-tab-index` | Tab Index for the contained anchor element                                                                                     | `string \| undefined`                           | `undefined` |
| `anchorTitle`    | `anchor-title`     | Title for the contained anchor element                                                                                         | `string \| undefined`                           | `undefined` |
| `ariaHaspopup`   | `aria-haspopup`    | Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. | `string \| undefined`                           | `undefined` |
| `ariaLabel`      | `aria-label`       | Fefines a string value that labels the current element.                                                                        | `string \| undefined`                           | `undefined` |
| `ariaPosinset`   | `aria-posinset`    | Defines an element's number or position in the current set of listitems or treeitems.                                          | `string \| undefined`                           | `undefined` |
| `ariaSetsize`    | `aria-setsize`     | Defines the number of items in the current set of listitems or treeitems.                                                      | `number \| undefined`                           | `undefined` |
| `color`          | `color`            | Which color pair the button should use                                                                                         | `"primary" \| "secondary" \| "text" \| "white"` | `'primary'` |
| `disabled`       | `disabled`         | If the link is disabled. Prevents the user from interacting with the link: it cannot be pressed or focused.                    | `boolean \| undefined`                          | `undefined` |
| `forceRefresh`   | `force-refresh`    | If the button should navigate within the router context, or force a refresh.                                                   | `boolean \| undefined`                          | `undefined` |
| `target`         | `target`           | Target for link (eg: target="_blank")                                                                                          | `string \| undefined`                           | `undefined` |
| `url`            | `url`              | Where the button should link to.                                                                                               | `string \| undefined`                           | `undefined` |
| `variant`        | `variant`          | Which styling variant to use                                                                                                   | `"filled" \| "link" \| "minimal" \| "outline"`  | `'filled'`  |


## Slots

| Slot       | Description                                          |
| ---------- | ---------------------------------------------------- |
| `"after"`  | Placed after the main content with correct padding.  |
| `"before"` | Placed before the main content with correct padding. |


## CSS Custom Properties

| Name                    | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| `--align-inner`         | The flex align of the button content.                       |
| `--background-color`    | Directly control the background color of the button.        |
| `--border-radius`       | The border radius of the button.                            |
| `--border-width`        | The border width of the button.                             |
| `--contrast-color`      | The background color of the button. (text, border, icon).   |
| `--current-color`       | The foreground color of the button. (text, border, icon).   |
| `--spacing`             | Internal spacing of the button (padding and between slots). |
| `--text-color`          | Directly control the text color of the button.              |
| `--text-decoration`     | The text decoration of the button.                          |
| `--transition-duration` | The transition duration of the button.                      |


----------------------------------------------


