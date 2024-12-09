import { Component, h, Host } from '@stencil/core';
import { theme } from '@kurrent-ui/theme';

/**
 * Displays Scheduled Backups illustration.
 * @part illustration - The root svg of the illustration.
 */
@Component({
    tag: 'es-illustration-scheduled-backups',
    styleUrl: 'scheduled-backups.css',
    shadow: true,
})
export class EsIllustrationScheduledBackups {
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
                x="0"
                y="0"
                enable-background="new 0 0 681.6 865.6"
                viewBox="0 0 681.6 865.6"
                aria-hidden="true"
                width="100%"
                height="100%"
                focusable="false"
                role="img"
                part="illustration"
            >
                <path
                    d="M3 197.8 340.8 3l337.8 194.8-338.2 195.4L3 197.8z"
                    class="scheduled_backups_st0"
                />
                <path
                    d="m3.3 198 338.2 195.4v424.4L3.3 622.4V198z"
                    class="scheduled_backups_st0"
                />
                <path
                    d="m168.8 293.5 337.6-195 7.1 4.1-337.5 195-7.2-4.1z"
                    class="scheduled_backups_st1"
                />
                <path
                    d="m342.2 392-302-174.5-1.8 2.4L340 394.2c.7-.8 1.4-1.5 2.2-2.2z"
                    class="scheduled_backups_st2"
                />
                <path
                    d="M678.6 197.8 340.4 393.2v424.4l338.2-195.4V197.8z"
                    class="scheduled_backups_st1"
                />
                <path
                    d="m595.9 243.9-150.4 86.9c1.2.4 2.3.9 3.3 1.5l148.4-85.8c-.4-.9-.9-1.7-1.3-2.6zM341.9 452.6v-58.5l56.7-32.8c-.6-.8-1.1-1.7-1.6-2.5l-57.4 33.1c-.4.3-.7.8-.7 1.3v59.6h2.8c0-.2.1-.2.2-.2z"
                    class="scheduled_backups_st2"
                />
                <linearGradient
                    id="scheduled_backups_SVGID_1_"
                    x1="414.023"
                    x2="189.933"
                    y1="789.37"
                    y2="494.38"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#BBDEFB" />
                    <stop offset="1" stop-color="#FFF" />
                </linearGradient>
                <path
                    d="M387.7 569.1c-25.7-48.7-56.9-83.7-93.6-104.9-28.6-16.5-53.9-20.7-75.8-12.8l-65.9 38.5 13.8 29.6c-2.8 12.7-4.1 26.9-4.1 42.8 0 30.8 5.2 61.7 15.6 92.7l98 145.8c5.9 4.4 12 8.4 18.4 12.1 3.8 2.2 7.5 4.1 11.1 5.9l16.9 36.1 52-30.8c4.8-2.2 9.4-4.9 13.6-8 25.7-19.1 38.6-52.9 38.5-101.3-.1-48.4-12.9-97-38.5-145.7z"
                    class="scheduled_backups_st3"
                />
                <path
                    d="M389 568.4c-25.7-48.7-57.3-84.2-94.1-105.5s-69.1-22.4-95.2-3.1l-.6.5-.3.2-15.4 8.8 1.3 1.7.7.7 15-8.6h.1l.4-.3.6-.4c25-18.6 55.9-17.5 91.9 3.2s67.5 56.1 93 104.3 38.3 97.1 38.3 145c0 8.7-.5 17.4-1.4 26l3 .2c.9-8.7 1.4-17.4 1.4-26.2 0-48.5-13-97.8-38.7-146.5z"
                    class="scheduled_backups_st2"
                />
                <path
                    d="M105.4 595.3c0 48.4 12.8 97 38.5 145.7 25.7 48.7 56.9 83.7 93.6 104.9 36.7 21.2 67.9 22.3 93.5 3.2s38.5-52.8 38.6-101.3c0-48.4-12.9-97-38.6-145.7s-56.9-83.7-93.5-104.9c-36.7-21.2-67.9-22.3-93.6-3.2-25.7 19.1-38.5 52.8-38.5 101.3z"
                    class="scheduled_backups_st0"
                />
                <path
                    d="M238.2 495.9c-37.1-21.4-69.1-22.4-95.2-3.1s-38.4 52-39.1 98.8h3c.7-45.8 13.4-78.2 37.9-96.4 11.3-8.5 25.1-13.1 39.3-13.1 16.1 0 33.6 5.4 52.6 16.4 15.6 9.1 29.8 20.3 42.4 33.2l2.3-1.9c-12.8-13.2-27.3-24.6-43.2-33.9zM344 625.5l-2.4 2.1c17.6 40.1 26.5 80.5 26.5 120.2 0 24.1-3.3 44.5-9.8 61.4l2.9.8c6.6-17.1 9.9-37.8 9.9-62.2 0-40.5-9.1-81.5-27.1-122.3z"
                    class="scheduled_backups_st2"
                />
                <path
                    d="M678.6 197.8 340.8 3 3 197.8l.3.2v424.4L122 690.9c6 17.2 13.4 34 21.9 50.1 25.7 48.7 56.9 83.7 93.6 104.9 32.5 18.7 60.6 21.6 84.5 8.9h.1l52-30.8c4.8-2.2 9.4-4.9 13.6-8 13.7-10.2 23.8-24.6 30.2-43.3l260.7-150.5V197.8z"
                    class="scheduled_backups_st4"
                />
                <path
                    d="M251.9 660.5v-67c0-8.2-3.1-14.1-9.3-17.7l-11.1-6.4c-6.2-3.6-9.2-1.2-9.2 7v94.2c0 8.3 3 14.2 9.2 17.7l55.6 32.1c6.2 3.6 9.3 1.2 9.3-7v-14.9c0-8.2-3.1-14.2-9.3-17.7l-35.2-20.3z"
                    class="scheduled_backups_st5"
                />
            </svg>
        );
    }

    renderDark() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0"
                y="0"
                enable-background="new 0 0 681.6 865.6"
                viewBox="0 0 681.6 865.6"
                aria-hidden="true"
                width="100%"
                height="100%"
                focusable="false"
                role="img"
                part="illustration"
            >
                <path
                    d="M3 197.8 340.8 3l337.8 194.8-338.2 195.4L3 197.8z"
                    class="scheduled_backups_st0"
                />
                <path
                    d="m3.3 198 338.2 195.4v424.4L3.3 622.4V198z"
                    class="scheduled_backups_st0"
                />
                <path
                    d="m168.8 293.5 337.6-195 7.1 4.1-337.5 195-7.2-4.1z"
                    class="scheduled_backups_st1"
                />
                <path
                    d="m342.2 392-302-174.5-1.8 2.4L340 394.2c.7-.8 1.4-1.5 2.2-2.2z"
                    class="scheduled_backups_st2"
                />
                <path
                    d="M678.6 197.8 340.4 393.2v424.4l338.2-195.4V197.8z"
                    class="scheduled_backups_st1"
                />
                <path
                    d="m595.9 243.9-150.4 86.9c1.2.4 2.3.9 3.3 1.5l148.4-85.8c-.4-.9-.9-1.7-1.3-2.6zM341.9 452.6v-58.5l56.7-32.8c-.6-.8-1.1-1.7-1.6-2.5l-57.4 33.1c-.4.3-.7.8-.7 1.3v59.6h2.8c0-.2.1-.2.2-.2z"
                    class="scheduled_backups_st2"
                />
                <linearGradient
                    id="scheduled_backups_SVGID_1_"
                    x1="414.023"
                    x2="189.933"
                    y1="789.37"
                    y2="494.38"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#09264A" />
                    <stop offset=".103" stop-color="#122E51" />
                    <stop offset=".27" stop-color="#2A4363" />
                    <stop offset=".482" stop-color="#526780" />
                    <stop offset=".729" stop-color="#8997A8" />
                    <stop offset="1" stop-color="#CED4DB" />
                </linearGradient>
                <path
                    d="M387.7 569.1c-25.7-48.7-56.9-83.7-93.6-104.9-28.6-16.5-53.9-20.7-75.8-12.8l-65.9 38.5 13.8 29.6c-2.8 12.7-4.1 26.9-4.1 42.8 0 30.8 5.2 61.7 15.6 92.7l98 145.8c5.9 4.4 12 8.4 18.4 12.1 3.8 2.2 7.5 4.1 11.1 5.9l16.9 36.1 52-30.8c4.8-2.2 9.4-4.9 13.6-8 25.7-19.1 38.6-52.9 38.5-101.3-.1-48.4-12.9-97-38.5-145.7z"
                    class="scheduled_backups_st3"
                />
                <path
                    d="M389 568.4c-25.7-48.7-57.3-84.2-94.1-105.5s-69.1-22.4-95.2-3.1l-.6.5-.3.2-15.4 8.8 1.3 1.7.7.7 15-8.6h.1l.4-.3.6-.4c25-18.6 55.9-17.5 91.9 3.2s67.5 56.1 93 104.3 38.3 97.1 38.3 145c0 8.7-.5 17.4-1.4 26l3 .2c.9-8.7 1.4-17.4 1.4-26.2 0-48.5-13-97.8-38.7-146.5z"
                    class="scheduled_backups_st2"
                />
                <path
                    d="M105.4 595.3c0 48.4 12.8 97 38.5 145.7 25.7 48.7 56.9 83.7 93.6 104.9 36.7 21.2 67.9 22.3 93.5 3.2s38.5-52.8 38.6-101.3c0-48.4-12.9-97-38.6-145.7s-56.9-83.7-93.5-104.9c-36.7-21.2-67.9-22.3-93.6-3.2-25.7 19.1-38.5 52.8-38.5 101.3z"
                    class="scheduled_backups_st0"
                />
                <path
                    d="M238.2 495.9c-37.1-21.4-69.1-22.4-95.2-3.1s-38.4 52-39.1 98.8h3c.7-45.8 13.4-78.2 37.9-96.4 11.3-8.5 25.1-13.1 39.3-13.1 16.1 0 33.6 5.4 52.6 16.4 15.6 9.1 29.8 20.3 42.4 33.2l2.3-1.9c-12.8-13.2-27.3-24.6-43.2-33.9zM344 625.5l-2.4 2.1c17.6 40.1 26.5 80.5 26.5 120.2 0 24.1-3.3 44.5-9.8 61.4l2.9.8c6.6-17.1 9.9-37.8 9.9-62.2 0-40.5-9.1-81.5-27.1-122.3z"
                    class="scheduled_backups_st2"
                />
                <path
                    d="M678.6 197.8 340.8 3 3 197.8l.3.2v424.4L122 690.9c6 17.2 13.4 34 21.9 50.1 25.7 48.7 56.9 83.7 93.6 104.9 32.5 18.7 60.6 21.6 84.5 8.9h.1l52-30.8c4.8-2.2 9.4-4.9 13.6-8 13.7-10.2 23.8-24.6 30.2-43.3l260.7-150.5V197.8z"
                    class="scheduled_backups_st4"
                />
                <path
                    d="M251.9 660.5v-67c0-8.2-3.1-14.1-9.3-17.7l-11.1-6.4c-6.2-3.6-9.2-1.2-9.2 7v94.2c0 8.3 3 14.2 9.2 17.7l55.6 32.1c6.2 3.6 9.3 1.2 9.3-7v-14.9c0-8.2-3.1-14.2-9.3-17.7l-35.2-20.3z"
                    class="scheduled_backups_st5"
                />
            </svg>
        );
    }
}
