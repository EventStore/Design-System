import { Component, h, Host } from '@stencil/core';
import { theme } from '@kurrent-ui/theme';

/**
 * Displays Role illustration.
 * @part illustration - The root svg of the illustration.
 */
@Component({
    tag: 'es-illustration-role',
    styleUrl: 'role.css',
    shadow: true,
})
export class EsIllustrationRole {
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
                enable-background="new 0 0 530.4 822.5"
                viewBox="0 0 530.4 822.5"
                aria-hidden="true"
                width="100%"
                height="100%"
                focusable="false"
                role="img"
                part="illustration"
            >
                <linearGradient
                    id="role_SVGID_1_"
                    x1="487.236"
                    x2="166.025"
                    y1="100.899"
                    y2="523.729"
                    gradientTransform="matrix(1 0 0 -1 0 824)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#BBDEFB" />
                    <stop offset="1" stop-color="#FFF" />
                </linearGradient>
                <path
                    d="M527.7 676.8c0 20-7.4 33.7-19 38.8L402.5 776 227.7 568.1l-65.3-37.7c-28.8-16.6-52.2-59-52.2-94.6v-7.4L42 347.3l99-55.4c22.9-18.3 56.4-15.4 90.8 4.4 36.3 21 45.3 42.3 87.1 66.4s50.8 13.1 87.1 34.1c39.4 22.8 77.8 66.7 100.3 121 13.5 32.6 21.4 66.8 21.4 98.8v60.2z"
                    class="role_st0"
                />
                <linearGradient
                    id="role_SVGID_00000146468117251116660280000003191966957010879383_"
                    x1="404.572"
                    x2="198.842"
                    y1="504.176"
                    y2="774.986"
                    gradientTransform="matrix(1 0 0 -1 0 824)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#BBDEFB" />
                    <stop offset="1" stop-color="#FFF" />
                </linearGradient>
                <path
                    fill="url(#role_SVGID_00000146468117251116660280000003191966957010879383_)"
                    fill-rule="evenodd"
                    d="m402.5 327-108.1 61.1L128.8 72l102.1-57.6c22.2-15.9 53.4-15.7 88 4.3 67.3 38.8 121.8 137.6 121.8 220.8 0 43.1-14.7 73.6-38.2 87.5z"
                    clip-rule="evenodd"
                />
                <path
                    d="M211.7 380.8c67.3 38.8 121.8 2.9 121.8-80.3S279 118.5 211.7 79.7 89.9 76.8 89.9 160s54.5 182 121.8 220.8zm87.1 77.2c-36.3-21-45.3-10-87.1-34.1s-50.8-45.4-87.1-66.4c-39.5-22.8-77.8-23.2-100.3 5.1C10.8 379.6 3 404.7 3 436.7v60.2c0 35.6 23.4 78 52.2 94.6l313.1 180.7c28.8 16.6 52.2 1.2 52.2-34.4v-60.2c0-32-7.8-66.2-21.3-98.7-22.5-54.2-60.9-98.1-100.4-120.9z"
                    class="role_st2"
                />
                <path
                    d="m327.6 337.6 2.8 1c3.1-12.4 4.6-25.2 4.5-38 0-47.1-17.5-99.2-44.8-142.8l-2.2 2c26.9 43 44 94.4 44 140.8.2 12.5-1.3 24.9-4.3 37zM293.1 387.6c-22 12.1-50.6 9.3-80.6-8-23.7-13.7-45.7-34.8-64.4-60.2h-.4l-.5.2-1.9 1c19 25.9 41.5 47.6 65.6 61.5 18.3 10.5 36.1 15.9 52.3 15.9 10.7.1 21.3-2.5 30.7-7.5-.1-1-.4-2-.8-2.9zM209.5 80.2c.6-.8 1.3-1.6 2-2.3-16.6-9.4-32.8-14.5-47.7-15.2l.6 3c14.1.8 29.4 5.7 45.1 14.5zM156.3 382.6l2.3-2c-9.4-8.3-19.2-16.4-33.2-24.5-16.9-9.8-33.3-15.3-48.1-16.5v3c14.4 1.3 30.2 6.6 46.6 16.1 11.6 6.8 22.5 14.8 32.4 23.9zM258.2 443.9c11.6 2.8 22.5 5.4 39.8 15.4 36.8 21.3 70.6 59.7 92.7 104.7l3.1-.6c-22.3-45.8-56.7-85-94.2-106.7-17.7-10.2-28.9-12.9-40.6-15.7s-25-6-46.4-18.4c-8.9-5.1-17.4-10.8-25.4-17.1l-1.5 2.3v.3c8.1 6.3 16.6 12 25.4 17.1 21.7 12.5 34.6 15.6 47.1 18.7z"
                    class="role_st3"
                />
                <path
                    d="M503.7 602.1c0-12.8-6-27.8-15.1-38l-98-109.5c-3.5-3.9-10.7-10.5-18.9-10.9l-98-3.7c-3.3-.2-6.5 1-9 3.2l-50 28.8c-5.7 2.7-9.1 9.7-9.1 19.4 0 131.3 58.5 255.9 113.1 316.9 8.2 9.1 15.3 10.7 18.9 10.9 15.8.6 35.1-4.5 53.2-18.2l30.9-18.4c39.4-15.5 82-65.8 82-180.5z"
                    class="role_st2"
                />
                <linearGradient
                    id="role_SVGID_00000094602927013176163630000011104785178414349192_"
                    x1="455.849"
                    x2="276.229"
                    y1="68.432"
                    y2="304.882"
                    gradientTransform="matrix(1 0 0 -1 0 824)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#BBDEFB" />
                    <stop offset="1" stop-color="#FFF" />
                </linearGradient>
                <path
                    fill="url(#role_SVGID_00000094602927013176163630000011104785178414349192_)"
                    fill-rule="evenodd"
                    d="M337.6 819.3c15.8.6 35.1-4.5 53.2-18.2l30.9-18.4c39.4-15.6 82-65.9 82-180.6 0-12.8-6-27.8-15.1-38l-98-109.5c-3.3-3.8-7.2-6.9-11.7-9.1l-34.5 19.9L208.6 544c12.7 111.2 62.9 211.6 110.1 264.4 8.2 9.1 15.3 10.7 18.9 10.9z"
                    clip-rule="evenodd"
                />
                <path
                    d="m435.6 595.1-98-109.5c-3.5-3.9-10.7-10.5-18.9-10.9l-98-3.7c-9.1-.3-15.1 7.8-15.1 20.6 0 131.3 58.5 255.9 113.1 316.9 8.2 9.1 15.3 10.7 18.9 10.9 43.7 1.7 113.1-39.9 113.1-186.3 0-12.8-6-27.8-15.1-38zm-107.5 163V535.6l81.3 90.8c-4.7 99.7-51.8 129.4-81.3 131.7z"
                    class="role_st2"
                />
                <path
                    d="m436.7 594.1-98-109.5c-2.9-3.3-10.8-11-20-11.4l-98-3.7c-3.9-.2-7.6 1.2-10.4 3.9-4 3.9-6.2 10.3-6.2 18.2 0 62.7 13.4 124.1 33.4 177.7l2.6-1.5c-19.8-53.2-33-114.1-33-176.2 0-7 1.9-12.7 5.3-16 2.1-2.1 4.9-3.2 7.8-3.1h.5l98 3.7c8 .4 15.1 7.4 17.8 10.4l98 109.5c8.9 10 14.7 24.5 14.7 37 0 65.7-14 107.7-30.4 134.2l2.5 1.6c16.6-27 30.8-69.4 30.8-135.8.1-13.2-6-28.5-15.4-39z"
                    class="role_st3"
                />
                <path
                    d="M329.6 756.4V539.5l78.2 87.4c-1.9 39-10.6 67.8-22.4 88.2.5.6.9 1.2 1.3 1.9l.8.4c13.7-22.9 21.5-53.4 23.3-91.1 0-.4-.1-.8-.4-1.1l-81.3-90.8c-.4-.5-1.1-.6-1.7-.4-.6.2-1 .8-1 1.4v222.5c0 .4.2.8.5 1.1.3.3.6.4 1 .4h.1c7.7-.7 15.3-2.8 22.2-6.3-.6-.8-1-1.7-1.1-2.6-6.1 3.2-12.7 5.2-19.5 5.9zM389.5 455.6l27.7 30.9c.8-.6 1.5-1.3 2.4-1.9l-27.8-31c-2.9-3.3-10.8-11-20-11.4l-34.2-1.3-.2.3c-.2.9-.4 1.8-.7 2.7l35 1.3c7.9.3 15.1 7.3 17.8 10.4zM502.2 602.1c0 48.5-7.6 84.2-18.4 110.5l2.7 1.3c12.4-30.1 18.7-67.6 18.7-111.8 0-13.2-6.1-28.5-15.4-39l-20.4-22.8-2.1 2.2 20.2 22.6c8.9 10 14.7 24.5 14.7 37z"
                    class="role_st3"
                />
                <path
                    d="M506.3 517.8c-22.5-54.3-60.9-98.2-100.3-121-33-19.1-43.5-11.7-76.6-28.4l73.2-41.4c23.5-13.9 38.2-44.4 38.2-87.5 0-83.2-54.5-182-121.8-220.8-34.6-20-65.8-20.2-88-4.3L128.9 72c-24 13.6-39 44.3-39 87.9 0 45.2 16.1 95 41.5 137.2L42 347.3l.2.2c-7 3.7-13.1 8.9-17.9 15.1C10.8 379.6 3 404.7 3 436.7v60.2c0 35.6 23.4 78 52.2 94.6l199.2 115c19.3 42 42.1 77.2 64.3 102.1 8.2 9.1 15.3 10.7 18.9 10.9h6.1l2.8-.2h.6l2.5-.3h.4l3-.5h.5l2.7-.6h.5l3.1-.8h.2l3-.9h.4c2.2-.7 4.3-1.5 6.5-2.4h.3c2.2-.9 4.4-2 6.6-3.1h.2c2.2-1.2 4.5-2.5 6.7-3.9h.1c2.3-1.4 4.6-3 6.7-4.7l30.9-18.4c18.4-7.3 37.5-22.2 52.6-47.6l34.4-19.6c11.6-5.1 19-18.8 19-38.8v-61.1c.3-32-7.6-66.2-21.1-98.8z"
                    class="role_st5"
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
                enable-background="new 0 0 530.4 822.5"
                viewBox="0 0 530.4 822.5"
                aria-hidden="true"
                width="100%"
                height="100%"
                focusable="false"
                role="img"
                part="illustration"
            >
                <linearGradient
                    id="role_SVGID_1_"
                    x1="183.928"
                    x2="438.45"
                    y1="550.109"
                    y2="109.263"
                    gradientTransform="matrix(1 0 0 -1 0 824)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#CED4DB" />
                    <stop offset=".103" stop-color="#C5CCD4" />
                    <stop offset=".27" stop-color="#ADB7C2" />
                    <stop offset=".482" stop-color="#8593A5" />
                    <stop offset=".729" stop-color="#4E637D" />
                    <stop offset="1" stop-color="#09264A" />
                </linearGradient>
                <path
                    d="M527.7 676.8c0 20-7.4 33.7-19 38.8L402.5 776 227.7 568.1l-65.3-37.7c-28.8-16.6-52.2-59-52.2-94.6v-7.4L42 347.3l99-55.4c22.9-18.3 56.4-15.4 90.8 4.4 36.3 21 45.3 42.3 87.1 66.4s50.8 13.1 87.1 34.1c39.4 22.8 77.8 66.7 100.3 121 13.5 32.6 21.4 66.8 21.4 98.8v60.2z"
                    class="role_st0"
                />
                <linearGradient
                    id="role_SVGID_00000012440013383898456760000010984636872628342429_"
                    x1="219.675"
                    x2="384.499"
                    y1="799.026"
                    y2="513.543"
                    gradientTransform="matrix(1 0 0 -1 0 824)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#CED4DB" />
                    <stop offset=".103" stop-color="#C5CCD4" />
                    <stop offset=".27" stop-color="#ADB7C2" />
                    <stop offset=".482" stop-color="#8593A5" />
                    <stop offset=".729" stop-color="#4E637D" />
                    <stop offset="1" stop-color="#09264A" />
                </linearGradient>
                <path
                    fill="url(#role_SVGID_00000012440013383898456760000010984636872628342429_)"
                    fill-rule="evenodd"
                    d="m402.5 327-108.1 61.1L128.8 72l102.1-57.6c22.2-15.9 53.4-15.7 88 4.3 67.3 38.8 121.8 137.6 121.8 220.8 0 43.1-14.7 73.6-38.2 87.5z"
                    clip-rule="evenodd"
                />
                <path
                    d="M211.7 380.8c67.3 38.8 121.8 2.9 121.8-80.3S279 118.5 211.7 79.7 89.9 76.8 89.9 160s54.5 182 121.8 220.8zm87.1 77.2c-36.3-21-45.3-10-87.1-34.1s-50.8-45.4-87.1-66.4c-39.5-22.8-77.8-23.2-100.3 5.1C10.8 379.6 3 404.7 3 436.7v60.2c0 35.6 23.4 78 52.2 94.6l313.1 180.7c28.8 16.6 52.2 1.2 52.2-34.4v-60.2c0-32-7.8-66.2-21.3-98.7-22.5-54.2-60.9-98.1-100.4-120.9z"
                    class="role_st2"
                />
                <path
                    d="m327.6 337.6 2.8 1c3.1-12.4 4.6-25.2 4.5-38 0-47.1-17.5-99.2-44.8-142.8l-2.2 2c26.9 43 44 94.4 44 140.8.2 12.5-1.3 24.9-4.3 37zM293.1 387.6c-22 12.1-50.6 9.3-80.6-8-23.7-13.7-45.7-34.8-64.4-60.2h-.4l-.5.2-1.9 1c19 25.9 41.5 47.6 65.6 61.5 18.3 10.5 36.1 15.9 52.3 15.9 10.7.1 21.3-2.5 30.7-7.5-.1-1-.4-2-.8-2.9zM209.5 80.2c.6-.8 1.3-1.6 2-2.3-16.6-9.4-32.8-14.5-47.7-15.2l.6 3c14.1.8 29.4 5.7 45.1 14.5zM156.3 382.6l2.3-2c-9.4-8.3-19.2-16.4-33.2-24.5-16.9-9.8-33.3-15.3-48.1-16.5v3c14.4 1.3 30.2 6.6 46.6 16.1 11.6 6.8 22.5 14.8 32.4 23.9zM258.2 443.9c11.6 2.8 22.5 5.4 39.8 15.4 36.8 21.3 70.6 59.7 92.7 104.7l3.1-.6c-22.3-45.8-56.7-85-94.2-106.7-17.7-10.2-28.9-12.9-40.6-15.7s-25-6-46.4-18.4c-8.9-5.1-17.4-10.8-25.4-17.1l-1.5 2.3v.3c8.1 6.3 16.6 12 25.4 17.1 21.7 12.5 34.6 15.6 47.1 18.7z"
                    class="role_st3"
                />
                <path
                    d="M503.7 602.1c0-12.8-6-27.8-15.1-38l-98-109.5c-3.5-3.9-10.7-10.5-18.9-10.9l-98-3.7c-3.3-.2-6.5 1-9 3.2l-50 28.8c-5.7 2.7-9.1 9.7-9.1 19.4 0 131.3 58.5 255.9 113.1 316.9 8.2 9.1 15.3 10.7 18.9 10.9 15.8.6 35.1-4.5 53.2-18.2l30.9-18.4c39.4-15.5 82-65.8 82-180.5z"
                    class="role_st2"
                />
                <linearGradient
                    id="role_SVGID_00000154419979986361030930000012346732004963812507_"
                    x1="292.849"
                    x2="437.789"
                    y1="323.969"
                    y2="72.925"
                    gradientTransform="matrix(1 0 0 -1 0 824)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#CED4DB" />
                    <stop offset="1" stop-color="#09264A" />
                </linearGradient>
                <path
                    fill="url(#role_SVGID_00000154419979986361030930000012346732004963812507_)"
                    fill-rule="evenodd"
                    d="M337.6 819.3c15.8.6 35.1-4.5 53.2-18.2l30.9-18.4c39.4-15.6 82-65.9 82-180.6 0-12.8-6-27.8-15.1-38l-98-109.5c-3.3-3.8-7.2-6.9-11.7-9.1l-34.5 19.9L208.6 544c12.7 111.2 62.9 211.6 110.1 264.4 8.2 9.1 15.3 10.7 18.9 10.9z"
                    clip-rule="evenodd"
                />
                <path
                    d="m435.6 595.1-98-109.5c-3.5-3.9-10.7-10.5-18.9-10.9l-98-3.7c-9.1-.3-15.1 7.8-15.1 20.6 0 131.3 58.5 255.9 113.1 316.9 8.2 9.1 15.3 10.7 18.9 10.9 43.7 1.7 113.1-39.9 113.1-186.3 0-12.8-6-27.8-15.1-38zm-107.5 163V535.6l81.3 90.8c-4.7 99.7-51.8 129.4-81.3 131.7z"
                    class="role_st2"
                />
                <path
                    d="m436.7 594.1-98-109.5c-2.9-3.3-10.8-11-20-11.4l-98-3.7c-3.9-.2-7.6 1.2-10.4 3.9-4 3.9-6.2 10.3-6.2 18.2 0 62.7 13.4 124.1 33.4 177.7l2.6-1.5c-19.8-53.2-33-114.1-33-176.2 0-7 1.9-12.7 5.3-16 2.1-2.1 4.9-3.2 7.8-3.1h.5l98 3.7c8 .4 15.1 7.4 17.8 10.4l98 109.5c8.9 10 14.7 24.5 14.7 37 0 65.7-14 107.7-30.4 134.2l2.5 1.6c16.6-27 30.8-69.4 30.8-135.8.1-13.2-6-28.5-15.4-39z"
                    class="role_st3"
                />
                <path
                    d="M329.6 756.4V539.5l78.2 87.4c-1.9 39-10.6 67.8-22.4 88.2.5.6.9 1.2 1.3 1.9l.8.4c13.7-22.9 21.5-53.4 23.3-91.1 0-.4-.1-.8-.4-1.1l-81.3-90.8c-.4-.5-1.1-.6-1.7-.4-.6.2-1 .8-1 1.4v222.5c0 .4.2.8.5 1.1.3.3.6.4 1 .4h.1c7.7-.7 15.3-2.8 22.2-6.3-.6-.8-1-1.7-1.1-2.6-6.1 3.2-12.7 5.2-19.5 5.9zM389.5 455.6l27.7 30.9c.8-.6 1.5-1.3 2.4-1.9l-27.8-31c-2.9-3.3-10.8-11-20-11.4l-34.2-1.3-.2.3c-.2.9-.4 1.8-.7 2.7l35 1.3c7.9.3 15.1 7.3 17.8 10.4zM502.2 602.1c0 48.5-7.6 84.2-18.4 110.5l2.7 1.3c12.4-30.1 18.7-67.6 18.7-111.8 0-13.2-6.1-28.5-15.4-39l-20.4-22.8-2.1 2.2 20.2 22.6c8.9 10 14.7 24.5 14.7 37z"
                    class="role_st3"
                />
                <path
                    d="M506.3 517.8c-22.5-54.3-60.9-98.2-100.3-121-33-19.1-43.5-11.7-76.6-28.4l73.2-41.4c23.5-13.9 38.2-44.4 38.2-87.5 0-83.2-54.5-182-121.8-220.8-34.6-20-65.8-20.2-88-4.3L128.9 72c-24 13.6-39 44.3-39 87.9 0 45.2 16.1 95 41.5 137.2L42 347.3l.2.2c-7 3.7-13.1 8.9-17.9 15.1C10.8 379.6 3 404.7 3 436.7v60.2c0 35.6 23.4 78 52.2 94.6l199.2 115c19.3 42 42.1 77.2 64.3 102.1 8.2 9.1 15.3 10.7 18.9 10.9h6.1l2.8-.2h.6l2.5-.3h.4l3-.5h.5l2.7-.6h.5l3.1-.8h.2l3-.9h.4c2.2-.7 4.3-1.5 6.5-2.4h.3c2.2-.9 4.4-2 6.6-3.1h.2c2.2-1.2 4.5-2.5 6.7-3.9h.1c2.3-1.4 4.6-3 6.7-4.7l30.9-18.4c18.4-7.3 37.5-22.2 52.6-47.6l34.4-19.6c11.6-5.1 19-18.8 19-38.8v-61.1c.3-32-7.6-66.2-21.1-98.8z"
                    class="role_st5"
                />
            </svg>
        );
    }
}
