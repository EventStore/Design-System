import { Component, h, Host } from '@stencil/core';
import { theme } from '@kurrent-ui/theme';

/**
 * Displays Peering illustration.
 * @part illustration - The root svg of the illustration.
 */
@Component({
    tag: 'es-illustration-peering',
    styleUrl: 'peering.css',
    shadow: true,
})
export class EsIllustrationPeering {
    render() {
        const isDark = theme.isDark();

        return (
            <Host dark={isDark} light={!isDark}>
                {isDark ? this.renderDark() : this.renderLight()}
            </Host>
        );
    }

    renderLight() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 795 858.9"
                aria-hidden="true"
                width="100%"
                height="100%"
                focusable="false"
                role="img"
                part="illustration"
            >
                <defs>
                    <linearGradient
                        id="peering_b"
                        x1="632.1"
                        x2="231.9"
                        y1="26.1"
                        y2="552.8"
                        gradientTransform="matrix(1 0 0 -1 0 860)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stop-color="#bbdefb" />
                        <stop offset="1" stop-color="#fff" />
                    </linearGradient>
                    <linearGradient
                        id="peering_c"
                        x1="750.8"
                        x2="565.6"
                        y1="390.4"
                        y2="634.3"
                        gradientTransform="matrix(1 0 0 -1 0 860)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stop-color="#bbdefb" />
                        <stop offset="1" stop-color="#fff" />
                    </linearGradient>
                </defs>
                <path
                    fill="#bbdefb"
                    fill-rule="evenodd"
                    d="M137.1 553.2 274.9 639.2 176.9 697 113 553.2 137.1 553.2z"
                />
                <path
                    fill="#bbdefb"
                    fill-rule="evenodd"
                    d="M778.1 781.7c8.4-2.3 13.9-11.4 13.9-25.2v-26.6c0-2.8-.2-5.7-.7-8.5l-138.2 81.5-6 46.9 6.5 4.1 124.5-72.2Z"
                />
                <path
                    fill="url(#peering_b)"
                    fill-rule="evenodd"
                    d="M790.7 725.2s-1.4-8.6-3.2-18.7c-5.4-14.6-15.3-27.9-26.5-34.4L267.3 387l39.4-23.3c9.2-5.9 11.8-21 7.9-37.6l-77.5-62s-.1 0-.1-.1l-.6-.5-80.7 45.9-34.9 23.4c-11.3 16.4-42.9 62.3-59.8 87l587.3 386.1 142.4-80.7Z"
                />
                <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="m544.1 377.9-16.2-145 126.6-74c-9.1-6.6-18.6-8.2-25.6-3.3l-.8.6-106 59-361-208.4c-7.2-4.2-14-4.8-19.3-2.4l-.3-.2L11.9 79.1l33.6 45.3 415.6 253.5h83Z"
                />
                <path
                    fill="url(#peering_c)"
                    fill-rule="evenodd"
                    d="m779.9 379.5-107-198.6c-5.4-10-12.2-17.7-19.2-22.6L621 177.2l-118.9 69.5 150.8 281.7 133-79.8c9.8-14.9 7.8-43.3-6-69.1Z"
                />
                <path
                    fill="#bbdefb"
                    fill-rule="evenodd"
                    d="M539.7 604.5 678 527.9l109.7-78.7c.8-.7 0-2-.9-1.5l-137.5 78.5-109.8 78c-.2 0 0 .4.2.3Z"
                />
                <path
                    fill="#fff"
                    d="m633.9 745.7-493.7-285 39.4-23.3c12.7-8.1 13-33.8.6-56.8l-14-26.1c-12.1-22.6-31.8-33.9-43.9-25.3l-107.1 75c-16.2 11.4-16.2 45.1 0 75.2l107.1 198.5c12.1 22.6 31.8 33.9 43.9 25.3l14-9.9c12.4-8.7 12.1-34.8-.6-57.5L140.2 567 634 852.1c17.1 9.9 31 0 31-22v-26.6c0-22-13.9-47.9-31.1-57.8ZM652.9 453.2l-107-198.6c-12.1-22.6-31.8-33.9-44-25.3l-14 9.9c-12.4 8.7-12 34.8.6 57.5l39.4 68.8L34.1 80.2c-17.1-9.9-31 0-31 22v26.6c0 22 13.9 47.9 31 57.8l493.8 285-39.5 23.3c-12.7 8.1-13 33.8-.5 56.8l14 26.1c12 22.6 31.7 33.9 43.9 25.3l107.1-75c16.1-11.2 16.1-44.8 0-74.9Z"
                />
                <path
                    fill="#1a4e85"
                    d="m563.3 590.5-.8-.6-17.5 12.3c-3.5 2.5-7.9 3.2-12.7 2.1-10.3-2.4-21.4-12.7-29-26.9l-6.2-11.6-2.8 1 6.4 12c8 14.9 19.8 25.8 30.9 28.4 1.6.4 3.3.6 5 .6 3.6 0 7.1-1.1 10.1-3.1l17.7-12.4c-.4-.6-.8-1.2-1.1-1.8ZM115.1 125.5l-2.1 2.3 266.6 154 1.6-2.6-266.1-153.7ZM581.8 318.2l-34.7-64.3c-8-14.9-19.8-25.8-31-28.4-5.7-1.3-10.9-.5-15 2.5l-14 9.9c-13 9.2-13 35.9.2 59.5l36.6 64-71.5-41.3c-.8.8-1.3 1.5-2 2.3l81.5 47.1-42.1-73.6c-12.2-21.9-12.7-47.3-1.1-55.6l14-9.9c3.5-2.5 7.9-3.2 12.7-2.1 10.3 2.4 21.4 12.7 29 26.9l34.7 64.4c.9-.4 1.8-.9 2.7-1.4ZM654.1 452.5l-24.4-45.3-2.4 1.9 24.2 44.9c8.1 15.1 12.1 31.2 12 44.7h2.9c.2-14.2-3.9-30.7-12.3-46.2ZM240.1 304l-1.5 2.6 44.7 25.8 1.4-2.6-44.6-25.8ZM144.2 571.1l74 42.7c.2-1 .8-1.9 1.6-2.5l-83.7-48.4 42.1 73.6c3 5.4 5.4 11.1 7 17.1h3.2c-1.7-6.5-4.3-12.7-7.6-18.6l-36.6-63.9ZM299.4 550.9c-.3 1-.8 1.9-1.1 2.8l143.3 82.7c.3-1 .8-1.8 1.5-2.5l-143.7-83ZM178.8 436l-41.6 24.6 71.9 41.5v-.3c0-1 .3-1.9.8-2.7l-66.8-38.4 37.2-22.1c13.4-8.6 13.9-34.9 1.1-58.8l-14-26.1c-2.1-3.9-4.5-7.6-7.3-11.1l-2.7 1.4c2.8 3.5 5.3 7.2 7.4 11.2l14 26.1c11.9 22 11.9 47.2 0 54.7ZM634.6 744.4l-44.4-25.6-.7.6-.7.6v1.5l44.3 25.6c16.7 9.6 30.3 35 30.3 56.5v19.8l3-.8v-19c.2-22.6-14.2-49.1-31.7-59.2Z"
                />
                <path
                    fill="none"
                    stroke="#1a4e85"
                    stroke-miterlimit="10"
                    stroke-width="6"
                    d="m761 672.1-168.5-97.3s79.4-44.4 80.3-45.1l107.1-75c16.2-11.4 16.2-45.1 0-75.2l-107-198.6c-12.1-22.6-31.8-33.9-44-25.3l-106.8 59.6-361-208.4C153.9 2.6 147 2 141.8 4.4L12.1 79.5C6.5 83.5 3 91.4 3 102.4V129c0 22 13.9 47.9 31 57.8l167.4 96.6s-78.5 45.3-79.1 45.8l-107.2 75c-16.1 11.4-16.1 45.1 0 75.2l107.2 198.5c11.1 20.7 28.6 31.9 40.7 27L270.1 642l363.8 210c9.5 5.6 18.2 4.9 23.9-.7l120.3-69.8c8.4-2.3 13.9-11.4 13.9-25.2v-26.6c0-21.9-13.9-47.7-31-57.6ZM527.9 471.8l-39.5 23.3c-4.5 2.9-7.5 8-8.8 14.5L267.3 387l39.4-23.3c4.4-2.9 7.4-8 8.8-14.5l212.4 122.6Z"
                />
            </svg>
        );
    }

    renderDark() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 795 858.9"
                aria-hidden="true"
                width="100%"
                height="100%"
                focusable="false"
                role="img"
                part="illustration"
            >
                <defs>
                    <linearGradient
                        id="peering_b"
                        x1="632.1"
                        x2="231.9"
                        y1="26.1"
                        y2="552.8"
                        gradientTransform="matrix(1 0 0 -1 0 860)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stop-color="#09264a" />
                        <stop offset="1" stop-color="#ced4db" />
                    </linearGradient>
                    <linearGradient
                        id="peering_c"
                        x1="750.8"
                        x2="565.6"
                        y1="390.4"
                        y2="634.3"
                        gradientTransform="matrix(1 0 0 -1 0 860)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stop-color="#09264a" />
                        <stop offset="1" stop-color="#ced4db" />
                    </linearGradient>
                </defs>
                <path
                    fill="#09264a"
                    fill-rule="evenodd"
                    d="M137.1 553.2 274.9 639.2 176.9 697 113 553.2 137.1 553.2z"
                />
                <path
                    fill="#09264a"
                    fill-rule="evenodd"
                    d="M778.1 781.7c8.4-2.3 13.9-11.4 13.9-25.2v-26.6c0-2.8-.2-5.7-.7-8.5l-138.2 81.5-6 46.9 6.5 4.1 124.5-72.2Z"
                />
                <path
                    fill="url(#peering_b)"
                    fill-rule="evenodd"
                    d="M790.7 725.2s-1.4-8.6-3.2-18.7c-5.4-14.6-15.3-27.9-26.5-34.4L267.3 387l39.4-23.3c9.2-5.9 11.8-21 7.9-37.6l-77.5-62s-.1 0-.1-.1l-.6-.5-80.7 45.9-34.9 23.4c-11.3 16.4-42.9 62.3-59.8 87l587.3 386.1 142.4-80.7Z"
                />
                <path
                    fill="#ced4db"
                    fill-rule="evenodd"
                    d="m544.1 377.9-16.2-145 126.6-74c-9.1-6.6-18.6-8.2-25.6-3.3l-.8.6-106 59-361-208.4c-7.2-4.2-14-4.8-19.3-2.4l-.3-.2L11.9 79.1l33.6 45.3 415.6 253.5h83Z"
                />
                <path
                    fill="url(#peering_c)"
                    fill-rule="evenodd"
                    d="m779.9 379.5-107-198.6c-5.4-10-12.2-17.7-19.2-22.6L621 177.2l-118.9 69.5 150.8 281.7 133-79.8c9.8-14.9 7.8-43.3-6-69.1Z"
                />
                <path
                    fill="#09264a"
                    fill-rule="evenodd"
                    d="M539.7 604.5 678 527.9l109.7-78.7c.8-.7 0-2-.9-1.5l-137.5 78.5-109.8 78c-.2 0 0 .4.2.3Z"
                />
                <path
                    fill="#ced4db"
                    d="m633.9 745.7-493.7-285 39.4-23.3c12.7-8.1 13-33.8.6-56.8l-14-26.1c-12.1-22.6-31.8-33.9-43.9-25.3l-107.1 75c-16.2 11.4-16.2 45.1 0 75.2l107.1 198.5c12.1 22.6 31.8 33.9 43.9 25.3l14-9.9c12.4-8.7 12.1-34.8-.6-57.5L140.2 567 634 852.1c17.1 9.9 31 0 31-22v-26.6c0-22-13.9-47.9-31.1-57.8ZM652.9 453.2l-107-198.6c-12.1-22.6-31.8-33.9-44-25.3l-14 9.9c-12.4 8.7-12 34.8.6 57.5l39.4 68.8L34.1 80.2c-17.1-9.9-31 0-31 22v26.6c0 22 13.9 47.9 31 57.8l493.8 285-39.5 23.3c-12.7 8.1-13 33.8-.5 56.8l14 26.1c12 22.6 31.7 33.9 43.9 25.3l107.1-75c16.1-11.2 16.1-44.8 0-74.9Z"
                />
                <path
                    fill="#09264a"
                    d="m563.3 590.5-.8-.6-17.5 12.3c-3.5 2.5-7.9 3.2-12.7 2.1-10.3-2.4-21.4-12.7-29-26.9l-6.2-11.6-2.8 1 6.4 12c8 14.9 19.8 25.8 30.9 28.4 1.6.4 3.3.6 5 .6 3.6 0 7.1-1.1 10.1-3.1l17.7-12.4c-.4-.6-.8-1.2-1.1-1.8ZM115.1 125.5l-2.1 2.3 266.6 154 1.6-2.6-266.1-153.7ZM581.8 318.2l-34.7-64.3c-8-14.9-19.8-25.8-31-28.4-5.7-1.3-10.9-.5-15 2.5l-14 9.9c-13 9.2-13 35.9.2 59.5l36.6 64-71.5-41.3c-.8.8-1.3 1.5-2 2.3l81.5 47.1-42.1-73.6c-12.2-21.9-12.7-47.3-1.1-55.6l14-9.9c3.5-2.5 7.9-3.2 12.7-2.1 10.3 2.4 21.4 12.7 29 26.9l34.7 64.4c.9-.4 1.8-.9 2.7-1.4ZM654.1 452.5l-24.4-45.3-2.4 1.9 24.2 44.9c8.1 15.1 12.1 31.2 12 44.7h2.9c.2-14.2-3.9-30.7-12.3-46.2ZM240.1 304l-1.5 2.6 44.7 25.8 1.4-2.6-44.6-25.8ZM144.2 571.1l74 42.7c.2-1 .8-1.9 1.6-2.5l-83.7-48.4 42.1 73.6c3 5.4 5.4 11.1 7 17.1h3.2c-1.7-6.5-4.3-12.7-7.6-18.6l-36.6-63.9ZM299.4 550.9c-.3 1-.8 1.9-1.1 2.8l143.3 82.7c.3-1 .8-1.8 1.5-2.5l-143.7-83ZM178.8 436l-41.6 24.6 71.9 41.5v-.3c0-1 .3-1.9.8-2.7l-66.8-38.4 37.2-22.1c13.4-8.6 13.9-34.9 1.1-58.8l-14-26.1c-2.1-3.9-4.5-7.6-7.3-11.1l-2.7 1.4c2.8 3.5 5.3 7.2 7.4 11.2l14 26.1c11.9 22 11.9 47.2 0 54.7ZM634.6 744.4l-44.4-25.6-.7.6-.7.6v1.5l44.3 25.6c16.7 9.6 30.3 35 30.3 56.5v19.8l3-.8v-19c.2-22.6-14.2-49.1-31.7-59.2Z"
                />
                <path
                    fill="none"
                    stroke="#fff"
                    stroke-miterlimit="10"
                    stroke-width="6"
                    d="m761 672.1-168.5-97.3s79.4-44.4 80.3-45.1l107.1-75c16.2-11.4 16.2-45.1 0-75.2l-107-198.6c-12.1-22.6-31.8-33.9-44-25.3l-106.8 59.6-361-208.4C153.9 2.6 147 2 141.8 4.4L12.1 79.5C6.5 83.5 3 91.4 3 102.4V129c0 22 13.9 47.9 31 57.8l167.4 96.6s-78.5 45.3-79.1 45.8l-107.2 75c-16.1 11.4-16.1 45.1 0 75.2l107.2 198.5c11.1 20.7 28.6 31.9 40.7 27L270.1 642l363.8 210c9.5 5.6 18.2 4.9 23.9-.7l120.3-69.8c8.4-2.3 13.9-11.4 13.9-25.2v-26.6c0-21.9-13.9-47.7-31-57.6ZM527.9 471.8l-39.5 23.3c-4.5 2.9-7.5 8-8.8 14.5L267.3 387l39.4-23.3c4.4-2.9 7.4-8 8.8-14.5l212.4 122.6Z"
                />
            </svg>
        );
    }
}
