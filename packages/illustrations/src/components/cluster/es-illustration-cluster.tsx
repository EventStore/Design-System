import { Component, h, Host } from '@stencil/core';
import { theme } from '@kurrent-ui/theme';

/**
 * Displays Cluster illustration.
 * @part illustration - The root svg of the illustration.
 */
@Component({
    tag: 'es-illustration-cluster',
    styleUrl: 'cluster.css',
    shadow: true,
})
export class EsIllustrationCluster {
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
                viewBox="0 0 849.8 988.9"
                aria-hidden="true"
                width="100%"
                height="100%"
                focusable="false"
                role="img"
                part="illustration"
            >
                <defs>
                    <linearGradient
                        id="cluster_b"
                        x1="769"
                        x2="792.8"
                        y1="29.4"
                        y2="70.7"
                        gradientTransform="translate(-165 689.2)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stop-color="#fff" />
                        <stop offset="1" stop-color="#bbdefb" />
                    </linearGradient>
                    <linearGradient
                        id="cluster_c"
                        x1="769"
                        x2="792.8"
                        y1="-155.6"
                        y2="-114.3"
                        gradientTransform="translate(-165 689.2)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stop-color="#fff" />
                        <stop offset="1" stop-color="#bbdefb" />
                    </linearGradient>
                    <linearGradient
                        id="cluster_d"
                        x1="769"
                        x2="792.8"
                        y1="-340.6"
                        y2="-299.3"
                        gradientTransform="translate(-165 689.2)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stop-color="#fff" />
                        <stop offset="1" stop-color="#bbdefb" />
                    </linearGradient>
                </defs>
                <path
                    fill="#bbdefb"
                    fill-rule="evenodd"
                    d="M818.7 590.9 451.2 378.7c-6.4-3.7-12.3-3.9-16.9-1.1l-.4-.3-420 243 402 361 421-242-.6-.5c5.3-3.7 8.6-11.5 8.6-22.3v-73.6c0-20.4-11.7-43.6-26.2-52Z"
                />
                <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M836.8 611.6c-4.7-9-11.1-16.6-18.1-20.7L451.2 378.7c-6.4-3.7-12.3-3.9-16.9-1.1l-.4-.3-420 243 21.8 19.6 371.2 223.4 429.9-251.7Z"
                />
                <path
                    fill="url(#cluster_b)"
                    fill-rule="evenodd"
                    d="m415.9 882.3 427.9-250.5c-2.5-13.4-9.1-26.6-17.6-35L382.9 846.3l33 36Z"
                />
                <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M398.7 980.2c14.5 8.4 26.2-1.3 26.2-21.7v-73.6c0-20.3-11.8-43.6-26.2-52L31.2 620.7C16.7 612.3 5 622 5 642.4V716c0 20.3 11.8 43.6 26.2 52l367.5 212.2Zm-39.4-124c10.9 6.3 19.7 23.7 19.7 39s-8.8 22.5-19.7 16.2-19.7-23.7-19.7-39 8.8-22.5 19.7-16.2Zm-52.5-30.3c10.9 6.3 19.7 23.7 19.7 39s-8.8 22.5-19.7 16.2-19.7-23.7-19.7-39 8.8-22.5 19.7-16.2Z"
                />
                <path
                    fill="#1a4e85"
                    d="M380.2 890.3c-1.3-10.4-5.5-20.3-12.1-28.4-.2.9-.4 1.8-.7 2.7l-.3.7c5.4 7.2 8.8 15.6 10 24.5l3.1.5ZM368.8 911.9c-2.6.6-5.6 0-8.8-1.8-10.4-6-18.9-22.9-18.9-37.7v-1.5l-2.6.5h-.4v.9c0 15.7 9.2 33.8 20.4 40.3 2.5 1.6 5.4 2.4 8.3 2.5l2-.2v-3ZM235.7 738.6c0-.4.2-.9.4-1.3L43 625.9l-1.5 2-.4.4 194.3 112.2.3-1.9Z"
                />
                <path
                    fill="#1a4e85"
                    d="M423.4 884.9V944c1-.2 2-.2 3-.2v-58.9c0-20.8-12.1-44.7-27-53.3l-110.7-63.9-1.6 2.6 110.8 64c14.1 8 25.5 30.8 25.5 50.6ZM389.7 973.3 31.9 766.7C17.8 758.6 6.4 735.8 6.4 716v-73.6c0-2.9.3-5.8.9-8.7a30.6 30.6 0 0 1-3.6 3.6c-.2 1.7-.3 3.3-.3 5v73.6c0 20.8 12.1 44.7 27 53.3l356.2 205.6 3.1-1.5ZM320.7 882.9c-.8-.6-1.4-1.5-1.8-2.4 0 .1-.2.2-.4.2-3.1 1.8-6.9 1.4-11-.9-9-5.2-16.6-18.5-18.5-31.6h-1.9c-.3.2-.6.4-1 .5 2.1 13.8 10.2 28 19.9 33.6 2.5 1.6 5.4 2.4 8.3 2.5 2 0 4-.5 5.8-1.5l.6-.4ZM304.9 826.6l1.1.6c8.2 4.7 15.2 16.2 17.8 28.1l2.8-1.2c-2.9-12.5-10.4-24.5-19.1-29.5-1.1-.7-2.3-1.3-3.6-1.7.7.9 1 1.9 1 3v.7Z"
                />
                <path
                    fill="#bbdefb"
                    fill-rule="evenodd"
                    d="M818.7 405.9 451.2 193.7c-6.4-3.7-12.3-3.9-16.9-1.1l-.4-.3-420 243 402 361 421-242-.6-.5c5.3-3.7 8.6-11.5 8.6-22.3v-73.6c0-20.4-11.7-43.6-26.2-52Z"
                />
                <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M836.8 426.6c-4.7-9-11.1-16.6-18.1-20.7L451.2 193.7c-6.4-3.7-12.3-3.9-16.9-1.1l-.4-.3-420 243 21.8 19.6 371.2 223.4 429.9-251.7Z"
                />
                <path
                    fill="url(#cluster_c)"
                    fill-rule="evenodd"
                    d="m415.9 697.3 427.9-250.5c-2.5-13.4-9.1-26.6-17.6-35L382.9 661.3l33 36Z"
                />
                <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M398.7 795.2c14.5 8.4 26.2-1.3 26.2-21.7v-73.6c0-20.3-11.8-43.6-26.2-52L31.2 435.7C16.7 427.3 5 437 5 457.4V531c0 20.3 11.8 43.6 26.2 52l367.5 212.2Zm-39.4-124c10.9 6.3 19.7 23.7 19.7 39s-8.8 22.5-19.7 16.2-19.7-23.7-19.7-39 8.8-22.5 19.7-16.2Zm-52.5-30.3c10.9 6.3 19.7 23.7 19.7 39s-8.8 22.5-19.7 16.2-19.7-23.7-19.7-39 8.8-22.5 19.7-16.2Z"
                />
                <path
                    fill="#1a4e85"
                    d="M178.8 522.3c.1-.6.1-1.1.2-1.7l.3-1.1-138.6-80c-.5.7-1 1.4-1.6 2v.5l139.4 80.5c.3 0 .4 0 .4-.2ZM401.1 651.3l1.8-2.4c-1.1-.9-2.3-1.7-3.5-2.3l-167.6-96.7-.6 1.3-.4 1.6 167 96.4c1.2.6 2.3 1.3 3.3 2.1ZM53.2 594l-21.3-12.3C17.8 573.6 6.4 550.8 6.4 531v-57c-.8.9-1.8 1.4-3 1.5V531c0 20.8 12.1 44.7 27 53.3l21.5 12.4c.4-.9.8-1.8 1.3-2.7ZM426.4 698.3l-3 .4v74.8c0 10.5-3.2 18.4-8.8 21.6s-9.5 2-15.2-1.2L105.1 624l-1.2 2.8 294 169.7c3.3 2 7 3.1 10.8 3.2 2.6 0 5.2-.6 7.4-2 6.6-3.8 10.3-12.6 10.3-24.2v-75.2Z"
                />
                <path
                    fill="#1a4e85"
                    d="M347.5 671.5c1.3-.8 2.8-1.1 4.3-1.1 2.4 0 4.7.8 6.7 2.1 10.4 6 18.9 22.9 18.9 37.7v.4l3 1v-1.4c0-15.7-9.2-33.8-20.4-40.3-5-2.9-10-3.2-14-.9s-6.2 6.3-7.3 11.8h3c1-4.4 3-7.6 5.8-9.3ZM353.3 719.4c-5.3-6.3-9.1-13.8-10.9-21.8h-3.1c2.2 9.7 7.1 19.1 13.3 25.4-.3-1.2 0-2.5.7-3.6ZM323.6 669h3.1c-2.9-12.4-10.4-24.4-19.1-29.4l-.6-.3c-.1.5-.1.9-.2 1.4 0 .6-.3 1.2-.7 1.6 7.9 4.5 14.6 15.3 17.5 26.7ZM321.7 692.8c-.9 1.2-2 2.2-3.2 2.9-3.1 1.8-6.9 1.4-11-.9-10-5.8-18.3-21.7-18.9-36l-3-.6c.4 15.4 9.4 32.8 20.4 39.1 2.5 1.6 5.4 2.4 8.3 2.5 3.8 0 7.4-1.9 9.6-5-.8-.6-1.5-1.3-2.2-2Z"
                />
                <path
                    fill="#bbdefb"
                    fill-rule="evenodd"
                    d="M818.7 220.9 451.2 8.7c-6.4-3.7-12.3-3.9-16.9-1.1l-.4-.3-420 243 402 361 421-242-.6-.5c5.3-3.7 8.6-11.5 8.6-22.3v-73.6c0-20.4-11.7-43.7-26.2-52Z"
                />
                <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M836.9 241.6c-4.8-9.1-11.1-16.6-18.2-20.7L451.2 8.7c-6.4-3.7-12.3-3.9-16.9-1.1l-.4-.3-420 243 21.8 19.6 371.2 223.4 430-251.7Z"
                />
                <path
                    fill="url(#cluster_d)"
                    fill-rule="evenodd"
                    d="m415.9 512.3 427.9-250.5c-2.5-13.4-9.1-26.6-17.6-35L382.9 476.3l33 36Z"
                />
                <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M398.7 610.1c14.5 8.4 26.2-1.3 26.2-21.7v-73.6c0-20.3-11.8-43.6-26.2-52L31.2 250.7C16.7 242.3 5 252 5 272.4V346c0 20.3 11.8 43.6 26.2 52l367.5 212.1Zm-39.4-123.9c10.9 6.3 19.7 23.7 19.7 39s-8.8 22.5-19.7 16.2-19.7-23.7-19.7-39 8.8-22.5 19.7-16.2Zm-52.5-30.3c10.9 6.3 19.7 23.7 19.7 39s-8.8 22.5-19.7 16.2-19.7-23.7-19.7-39 8.8-22.5 19.7-16.2Z"
                />
                <path
                    fill="#1a4e85"
                    d="m55.8 410.5-23.9-13.8C17.8 388.6 6.4 365.8 6.4 346v-56.8c-.8.4-1.6.7-2.5.9h-.5v55.8c0 20.8 12.1 44.7 27 53.3l25.1 14.5.3-3.2ZM70.5 422.4l31.7 18.3.9-2.9-31.6-18.3c-.3 1-.7 2-1 2.9ZM159.5 470.3l-1.2 2.8 148.6 85.8 1.5-2.6-148.9-86ZM423.4 514.3c1-.3 2-.5 3-.6-.4-20.5-12.4-43.7-27-52.2L43.9 256.3l-.6.6-.6 2.2 355.2 205.1c13.9 8 25.3 30.4 25.5 50.1ZM423.4 569.2v19.3c0 10.5-3.2 18.4-8.8 21.6s-9.5 2-15.2-1.2l-49.9-28.8c-.2 1-.5 2-.8 3l49.2 28.4c3.3 2 7 3.1 10.8 3.2 2.6 0 5.2-.6 7.4-2 6.6-3.8 10.3-12.6 10.3-24.2v-19.9c-.9.4-2 .6-3 .6ZM288.6 472.1c0-2.6.3-5.2.9-7.7 0-.1-.1-.1-.1-.2l-1.4-.6c-.4-.2-.8-.5-1.1-.9-.9 3-1.4 6.2-1.3 9.4 0 12.3 5.7 26.1 13.6 34.6.5-.9 1.3-1.6 2.2-2-7.5-7.9-12.8-20.9-12.8-32.6ZM313.5 459.3c-.7.7-1.5 1.4-2.3 1.9 7.9 7.8 13.8 21.4 13.8 33.7s-2.2 13.2-6.1 15.7l.4.3.8.5 1.2 1.2c4.3-3.2 6.7-9.6 6.7-17.7 0-12.9-6.1-27.2-14.5-35.6ZM360.6 485.2l-.4.3v3c9.6 6.8 17.2 22.6 17.2 36.6s-2.3 13.5-6.4 15.9-6.9 1.4-11-.9c-10.4-6-18.9-22.9-18.9-37.7v-1.7c-.4-.8-.7-1.6-1-2.5-.6 0-1.2-.2-1.8-.5-.2 1.5-.3 3.1-.3 4.6 0 15.7 9.2 33.8 20.4 40.3 2.5 1.6 5.4 2.4 8.3 2.5 2 0 4-.5 5.8-1.5 5-2.9 7.9-9.6 7.9-18.5 0-15.4-8.8-33.1-19.8-39.9Z"
                />
                <path
                    fill="none"
                    stroke="#1a4e85"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="8"
                    d="M844.9 346.5v-73.6c0-20.3-11.8-43.6-26.3-52L451.2 8.7c-6.4-3.7-12.3-3.9-16.9-1.1L17.6 248.2C10 250.3 4.9 259 4.9 272.4V346c0 20.3 11.8 43.6 26.2 52l23.7 13.7-37.2 21.5C10 435.3 4.9 444 4.9 457.4V531c0 20.3 11.8 43.6 26.2 52l23.7 13.7-37.2 21.5C10 620.3 4.9 629 4.9 642.4V716c0 20.3 11.8 43.6 26.2 52l367.5 212.2c6.5 3.8 12.5 3.9 17.1 1l420.6-242.4c5.3-3.7 8.6-11.5 8.6-22.3v-73.6c0-20.3-11.8-43.6-26.3-52l-22.7-13.1 40.3-24c5.3-3.7 8.6-11.5 8.6-22.3v-73.6c0-20.3-11.8-43.6-26.3-52l-22.7-13.1 40.3-24c5.5-3.7 8.8-11.5 8.8-22.3Z"
                />
            </svg>
        );
    }

    renderDark() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 849.8 988.9"
                aria-hidden="true"
                width="100%"
                height="100%"
                focusable="false"
                role="img"
                part="illustration"
            >
                <defs>
                    <linearGradient
                        id="cluster_b"
                        x1="792.8"
                        x2="769"
                        y1="70.7"
                        y2="29.4"
                        gradientTransform="translate(-165 689.2)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stop-color="#09264a" />
                        <stop offset="1" stop-color="#ced4db" />
                    </linearGradient>
                    <linearGradient
                        id="cluster_c"
                        x1="792.8"
                        x2="769"
                        y1="-114.3"
                        y2="-155.6"
                        href="#cluster_b"
                    />
                    <linearGradient
                        id="cluster_d"
                        x1="792.8"
                        x2="769"
                        y1="-299.3"
                        y2="-340.6"
                        href="#cluster_b"
                    />
                </defs>
                <path
                    fill="#09264a"
                    fill-rule="evenodd"
                    d="M818.7 590.9 451.2 378.7c-6.4-3.7-12.3-3.9-16.9-1.1l-.4-.3-420 243 402 361 421-242-.6-.5c5.3-3.7 8.6-11.5 8.6-22.3v-73.6c0-20.4-11.7-43.6-26.2-52Z"
                />
                <path
                    fill="#ced4db"
                    fill-rule="evenodd"
                    d="M836.8 611.6c-4.7-9-11.1-16.6-18.1-20.7L451.2 378.7c-6.4-3.7-12.3-3.9-16.9-1.1l-.4-.3-420 243 21.8 19.6 371.2 223.4 429.9-251.7Z"
                />
                <path
                    fill="url(#cluster_b)"
                    fill-rule="evenodd"
                    d="m415.9 882.3 427.9-250.5c-2.5-13.4-9.1-26.6-17.6-35L382.9 846.3l33 36Z"
                />
                <path
                    fill="#ced4db"
                    fill-rule="evenodd"
                    d="M398.7 980.2c14.5 8.4 26.2-1.3 26.2-21.7v-73.6c0-20.3-11.8-43.6-26.2-52L31.2 620.7C16.7 612.3 5 622 5 642.4V716c0 20.3 11.8 43.6 26.2 52l367.5 212.2Zm-39.4-124c10.9 6.3 19.7 23.7 19.7 39s-8.8 22.5-19.7 16.2-19.7-23.7-19.7-39 8.8-22.5 19.7-16.2Zm-52.5-30.3c10.9 6.3 19.7 23.7 19.7 39s-8.8 22.5-19.7 16.2-19.7-23.7-19.7-39 8.8-22.5 19.7-16.2Z"
                />
                <path
                    fill="#09264a"
                    d="M380.2 890.3c-1.3-10.4-5.5-20.3-12.1-28.4-.2.9-.4 1.8-.7 2.7l-.3.7c5.4 7.2 8.8 15.6 10 24.5l3.1.5ZM368.8 911.9c-2.6.6-5.6 0-8.8-1.8-10.4-6-18.9-22.9-18.9-37.7v-1.5l-2.6.5h-.4v.9c0 15.7 9.2 33.8 20.4 40.3 2.5 1.6 5.4 2.4 8.3 2.5l2-.2v-3ZM235.7 738.6c0-.4.2-.9.4-1.3L43 625.9l-1.5 2-.4.4 194.3 112.2.3-1.9Z"
                />
                <path
                    fill="#09264a"
                    d="M423.4 884.9V944c1-.2 2-.2 3-.2v-58.9c0-20.8-12.1-44.7-27-53.3l-110.7-63.9-1.6 2.6 110.8 64c14.1 8 25.5 30.8 25.5 50.6Z"
                />
                <path
                    fill="#1a4e85"
                    d="M389.7 973.3 31.9 766.7C17.8 758.6 6.4 735.8 6.4 716v-73.6c0-2.9.3-5.8.9-8.7a30.6 30.6 0 0 1-3.6 3.6c-.2 1.7-.3 3.3-.3 5v73.6c0 20.8 12.1 44.7 27 53.3l356.2 205.6 3.1-1.5Z"
                />
                <path
                    fill="#09264a"
                    d="M320.7 882.9c-.8-.6-1.4-1.5-1.8-2.4 0 .1-.2.2-.4.2-3.1 1.8-6.9 1.4-11-.9-9-5.2-16.6-18.5-18.5-31.6h-1.9c-.3.2-.6.4-1 .5 2.1 13.8 10.2 28 19.9 33.6 2.5 1.6 5.4 2.4 8.3 2.5 2 0 4-.5 5.8-1.5l.6-.4ZM304.9 826.6l1.1.6c8.2 4.7 15.2 16.2 17.8 28.1l2.8-1.2c-2.9-12.5-10.4-24.5-19.1-29.5-1.1-.7-2.3-1.3-3.6-1.7.7.9 1 1.9 1 3v.7Z"
                />
                <path
                    fill="#09264a"
                    fill-rule="evenodd"
                    d="M818.7 405.9 451.2 193.7c-6.4-3.7-12.3-3.9-16.9-1.1l-.4-.3-420 243 402 361 421-242-.6-.5c5.3-3.7 8.6-11.5 8.6-22.3v-73.6c0-20.4-11.7-43.6-26.2-52Z"
                />
                <path
                    fill="#ced4db"
                    fill-rule="evenodd"
                    d="M836.8 426.6c-4.7-9-11.1-16.6-18.1-20.7L451.2 193.7c-6.4-3.7-12.3-3.9-16.9-1.1l-.4-.3-420 243 21.8 19.6 371.2 223.4 429.9-251.7Z"
                />
                <path
                    fill="url(#cluster_c)"
                    fill-rule="evenodd"
                    d="m415.9 697.3 427.9-250.5c-2.5-13.4-9.1-26.6-17.6-35L382.9 661.3l33 36Z"
                />
                <path
                    fill="#ced4db"
                    fill-rule="evenodd"
                    d="M398.7 795.2c14.5 8.4 26.2-1.3 26.2-21.7v-73.6c0-20.3-11.8-43.6-26.2-52L31.2 435.7C16.7 427.3 5 437 5 457.4V531c0 20.3 11.8 43.6 26.2 52l367.5 212.2Zm-39.4-124c10.9 6.3 19.7 23.7 19.7 39s-8.8 22.5-19.7 16.2-19.7-23.7-19.7-39 8.8-22.5 19.7-16.2Zm-52.5-30.3c10.9 6.3 19.7 23.7 19.7 39s-8.8 22.5-19.7 16.2-19.7-23.7-19.7-39 8.8-22.5 19.7-16.2Z"
                />
                <path
                    fill="#09264a"
                    d="M178.8 522.3c.1-.6.1-1.1.2-1.7l.3-1.1-138.6-80c-.5.7-1 1.4-1.6 2v.5l139.4 80.5c.3 0 .4 0 .4-.2ZM401.1 651.3l1.8-2.4c-1.1-.9-2.3-1.7-3.5-2.3l-167.6-96.7-.6 1.3-.4 1.6 167 96.4c1.2.6 2.3 1.3 3.3 2.1Z"
                />
                <path
                    fill="#1a4e85"
                    d="m53.2 594-21.3-12.3C17.8 573.6 6.4 550.8 6.4 531v-57c-.8.9-1.8 1.4-3 1.5V531c0 20.8 12.1 44.7 27 53.3l21.5 12.4c.4-.9.8-1.8 1.3-2.7Z"
                />
                <path
                    fill="#09264a"
                    d="m426.4 698.3-3 .4v74.8c0 10.5-3.2 18.4-8.8 21.6s-9.5 2-15.2-1.2L105.1 624l-1.2 2.8 294 169.7c3.3 2 7 3.1 10.8 3.2 2.6 0 5.2-.6 7.4-2 6.6-3.8 10.3-12.6 10.3-24.2v-75.2Z"
                />
                <path
                    fill="#09264a"
                    d="M347.5 671.5c1.3-.8 2.8-1.1 4.3-1.1 2.4 0 4.7.8 6.7 2.1 10.4 6 18.9 22.9 18.9 37.7v.4l3 1v-1.4c0-15.7-9.2-33.8-20.4-40.3-5-2.9-10-3.2-14-.9s-6.2 6.3-7.3 11.8h3c1-4.4 3-7.6 5.8-9.3ZM353.3 719.4c-5.3-6.3-9.1-13.8-10.9-21.8h-3.1c2.2 9.7 7.1 19.1 13.3 25.4-.3-1.2 0-2.5.7-3.6ZM323.6 669h3.1c-2.9-12.4-10.4-24.4-19.1-29.4l-.6-.3c-.1.5-.1.9-.2 1.4 0 .6-.3 1.2-.7 1.6 7.9 4.5 14.6 15.3 17.5 26.7ZM321.7 692.8c-.9 1.2-2 2.2-3.2 2.9-3.1 1.8-6.9 1.4-11-.9-10-5.8-18.3-21.7-18.9-36l-3-.6c.4 15.4 9.4 32.8 20.4 39.1 2.5 1.6 5.4 2.4 8.3 2.5 3.8 0 7.4-1.9 9.6-5-.8-.6-1.5-1.3-2.2-2Z"
                />
                <path
                    fill="#09264a"
                    fill-rule="evenodd"
                    d="M818.7 220.9 451.2 8.7c-6.4-3.7-12.3-3.9-16.9-1.1l-.4-.3-420 243 402 361 421-242-.6-.5c5.3-3.7 8.6-11.5 8.6-22.3v-73.6c0-20.4-11.7-43.7-26.2-52Z"
                />
                <path
                    fill="#ced4db"
                    fill-rule="evenodd"
                    d="M836.9 241.6c-4.8-9.1-11.1-16.6-18.2-20.7L451.2 8.7c-6.4-3.7-12.3-3.9-16.9-1.1l-.4-.3-420 243 21.8 19.6 371.2 223.4 430-251.7Z"
                />
                <path
                    fill="url(#cluster_d)"
                    fill-rule="evenodd"
                    d="m415.9 512.3 427.9-250.5c-2.5-13.4-9.1-26.6-17.6-35L382.9 476.3l33 36Z"
                />
                <path
                    fill="#ced4db"
                    fill-rule="evenodd"
                    d="M398.7 610.1c14.5 8.4 26.2-1.3 26.2-21.7v-73.6c0-20.3-11.8-43.6-26.2-52L31.2 250.7C16.7 242.3 5 252 5 272.4V346c0 20.3 11.8 43.6 26.2 52l367.5 212.1Zm-39.4-123.9c10.9 6.3 19.7 23.7 19.7 39s-8.8 22.5-19.7 16.2-19.7-23.7-19.7-39 8.8-22.5 19.7-16.2Zm-52.5-30.3c10.9 6.3 19.7 23.7 19.7 39s-8.8 22.5-19.7 16.2-19.7-23.7-19.7-39 8.8-22.5 19.7-16.2Z"
                />
                <path
                    fill="#1a4e85"
                    d="m55.8 410.5-23.9-13.8C17.8 388.6 6.4 365.8 6.4 346v-56.8c-.8.4-1.6.7-2.5.9h-.5v55.8c0 20.8 12.1 44.7 27 53.3l25.1 14.5.3-3.2Z"
                />
                <path
                    fill="#09264a"
                    d="m70.5 422.4 31.7 18.3.9-2.9-31.6-18.3c-.3 1-.7 2-1 2.9ZM159.5 470.3l-1.2 2.8 148.6 85.8 1.5-2.6-148.9-86ZM423.4 514.3c1-.3 2-.5 3-.6-.4-20.5-12.4-43.7-27-52.2L43.9 256.3l-.6.6-.6 2.2 355.2 205.1c13.9 8 25.3 30.4 25.5 50.1ZM423.4 569.2v19.3c0 10.5-3.2 18.4-8.8 21.6s-9.5 2-15.2-1.2l-49.9-28.8c-.2 1-.5 2-.8 3l49.2 28.4c3.3 2 7 3.1 10.8 3.2 2.6 0 5.2-.6 7.4-2 6.6-3.8 10.3-12.6 10.3-24.2v-19.9c-.9.4-2 .6-3 .6ZM288.6 472.1c0-2.6.3-5.2.9-7.7 0-.1-.1-.1-.1-.2l-1.4-.6c-.4-.2-.8-.5-1.1-.9-.9 3-1.4 6.2-1.3 9.4 0 12.3 5.7 26.1 13.6 34.6.5-.9 1.3-1.6 2.2-2-7.5-7.9-12.8-20.9-12.8-32.6ZM313.5 459.3c-.7.7-1.5 1.4-2.3 1.9 7.9 7.8 13.8 21.4 13.8 33.7s-2.2 13.2-6.1 15.7l.4.3.8.5 1.2 1.2c4.3-3.2 6.7-9.6 6.7-17.7 0-12.9-6.1-27.2-14.5-35.6ZM360.6 485.2l-.4.3v3c9.6 6.8 17.2 22.6 17.2 36.6s-2.3 13.5-6.4 15.9-6.9 1.4-11-.9c-10.4-6-18.9-22.9-18.9-37.7v-1.7c-.4-.8-.7-1.6-1-2.5-.6 0-1.2-.2-1.8-.5-.2 1.5-.3 3.1-.3 4.6 0 15.7 9.2 33.8 20.4 40.3 2.5 1.6 5.4 2.4 8.3 2.5 2 0 4-.5 5.8-1.5 5-2.9 7.9-9.6 7.9-18.5 0-15.4-8.8-33.1-19.8-39.9Z"
                />
                <path
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="8"
                    d="M844.9 346.5v-73.6c0-20.3-11.8-43.6-26.3-52L451.2 8.7c-6.4-3.7-12.3-3.9-16.9-1.1L17.6 248.2C10 250.3 4.9 259 4.9 272.4V346c0 20.3 11.8 43.6 26.2 52l23.7 13.7-37.2 21.5C10 435.3 4.9 444 4.9 457.4V531c0 20.3 11.8 43.6 26.2 52l23.7 13.7-37.2 21.5C10 620.3 4.9 629 4.9 642.4V716c0 20.3 11.8 43.6 26.2 52l367.5 212.2c6.5 3.8 12.5 3.9 17.1 1l420.6-242.4c5.3-3.7 8.6-11.5 8.6-22.3v-73.6c0-20.3-11.8-43.6-26.3-52l-22.7-13.1 40.3-24c5.3-3.7 8.6-11.5 8.6-22.3v-73.6c0-20.3-11.8-43.6-26.3-52l-22.7-13.1 40.3-24c5.5-3.7 8.8-11.5 8.8-22.3Z"
                />
            </svg>
        );
    }
}
