import { Component, h, Host } from '@stencil/core';
import { theme } from '@eventstore-ui/theme';

/**
 * Displays Integration illustration.
 * @part illustration - The root svg of the illustration.
 */
@Component({
    tag: 'es-illustration-integration',
    styleUrl: 'integration.css',
    shadow: true,
})
export class EsIllustrationIntegration {
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
                enable-background="new 0 0 832 650.7"
                viewBox="0 0 832 650.7"
                aria-hidden="true"
                width="100%"
                height="100%"
                focusable="false"
                role="img"
                part="illustration"
            >
                <path
                    d="m608.3 201.9-182.7-105h-.2c-4.2-2.4-10-2.5-13-.1-30.5 25.1-49.5 73.4-49.5 139s19 135.8 49.5 196c3 5.8 8.8 12.4 13 14.8h.2l182.7 105h.2c4.2 2.4 10 2.5 13 .1 30.5-25 49.5-73.2 49.5-138.9s-19-135.8-49.5-196c-3-5.7-8.8-12.4-13-14.8l-.2-.1z"
                    class="integration_st0"
                />
                <linearGradient
                    id="integration_SVGID_1_"
                    x1="428.101"
                    x2="491.431"
                    y1="-240.65"
                    y2="-130.969"
                    gradientTransform="translate(0 452)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#BBDEFB" />
                    <stop offset="1" stop-color="#FFF" />
                </linearGradient>
                <path
                    d="M478.8 320.3c0 9.6-5.7 14-12.7 10l-12.7-7.3c-7-4.1-12.7-15.1-12.7-24.6v-86.3c0-9.6 5.7-14 12.7-10l12.7 7.3c7 4 12.7 15 12.7 24.6v86.3z"
                    class="integration_st1"
                />
                <linearGradient
                    id="integration_SVGID_00000168106793601667607130000015526365665255199873_"
                    x1="542.171"
                    x2="596.971"
                    y1="-174.932"
                    y2="-80.032"
                    gradientTransform="translate(0 452)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#BBDEFB" />
                    <stop offset="1" stop-color="#FFF" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000168106793601667607130000015526365665255199873_)"
                    fill-rule="evenodd"
                    d="M592.9 299.7c-.1-9.6-5.8-20.6-12.7-24.6l-12.7-7.3c-7-4-12.7.4-12.7 10v86.3c0 9.5 5.7 20.5 12.7 24.6h.2l25.2-14.9v-74.1z"
                    clip-rule="evenodd"
                />
                <linearGradient
                    id="integration_SVGID_00000167376025810194856430000002189016363076143771_"
                    x1="496.959"
                    x2="536.739"
                    y1="-74.553"
                    y2="-5.643"
                    gradientTransform="translate(0 452)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#BBDEFB" />
                    <stop offset="1" stop-color="#FFF" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000167376025810194856430000002189016363076143771_)"
                    fill-rule="evenodd"
                    d="M516.8 376.7c-14-8.1-25.3.9-25.3 19.9v17.3l50.7 29.2v-17.3c-.1-19.1-11.4-41.1-25.4-49.1z"
                    clip-rule="evenodd"
                />
                <path
                    d="M621.4 216.8c-3-5.7-8.8-12.4-13-14.8h-.2L425.5 96.9h-.2c-4.2-2.4-10-2.5-13-.1-21.3 17.5-37 46.3-44.5 84.4l-23.7-11.5-11-9.9-19.7 47-17.6 60.3 12.2 101 41.7 104.2 187.5 96.5 26.6-42.9 44.5 25.6h.2c4.2 2.4 10 2.5 13 .1 30.5-25.1 49.5-73.3 49.5-139s-19-135.7-49.6-195.8zm-16.1 298.1L428.5 413.2c-25.8-52.5-40-110.2-40-162.8s14.2-94 40-116.9l176.8 101.6c25.8 52.5 40 110.1 40 162.8s-14.2 94.1-40 117z"
                    class="integration_st0"
                />
                <linearGradient
                    id="integration_SVGID_00000181780883903318099760000014110427789064616085_"
                    x1="501.687"
                    x2="379.896"
                    y1="370.757"
                    y2="159.808"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#FFF" />
                    <stop offset="1" stop-color="#BBDEFB" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000181780883903318099760000014110427789064616085_)"
                    d="m428.5 133.5 176.8 101.6c9.5 19.4 17.5 39.5 23.7 59.9l20-11.7c-7.6-23-16.9-45.3-27.6-66.4-3-5.7-8.8-12.4-13-14.8h-.2L459 116.2l-87.5 49.2c-1.4 5.1-2.7 10.3-3.7 15.8l-13.1-6.3-36.6 20.6-4.8 11.3-17.6 60.3 12.2 101 37.2 93 83-48.6c-25.6-52.3-39.7-109.8-39.7-162.1.1-52.6 14.3-94 40.1-116.9z"
                />
                <path
                    d="M779.5 124.7c-3-5.7-8.8-12.4-13-14.8h-.2L583.6 4.8h-.2c-3.5-2-7.8-2.4-11.6-1h-.1l-232.3 134 8.1 19.9 190.4 99.5c8.2 28.5 19.1 56.1 32.5 82.5 1 1.9 2.2 3.8 3.5 5.5 0 0 251-86.5 243.5-117.6-8.6-35.6-21.4-70.2-37.9-102.9z"
                    class="integration_st0"
                />
                <path
                    d="m580.1 375 7.6 36.1 3.3 54.8-9.9 45-24.1 43.7-12 40.1 232.7-134 1.8-1c30.5-25.1 49.5-73.3 49.5-139 0-9.9-.4-19.8-1.3-29.8C823 234.2 580.1 375 580.1 375z"
                    class="integration_st5"
                />
                <linearGradient
                    id="integration_SVGID_00000021093328737330353850000008811249073453642422_"
                    x1="632.292"
                    x2="733.105"
                    y1="-112.619"
                    y2="62.025"
                    gradientTransform="translate(0 311.8)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#FFF" />
                    <stop offset="1" stop-color="#BBDEFB" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000021093328737330353850000008811249073453642422_)"
                    fill-rule="evenodd"
                    d="M779.5 124.7c-.9-1.8-2-3.5-3.2-5.1L534.9 255.4l3 1.6c8.2 28.5 19.1 56.1 32.5 82.5 1 1.9 2.2 3.8 3.5 5.5l13.8 65.9 2.7 45.3L829 316.6c-.8-64.5-19.6-133-49.5-191.9z"
                    clip-rule="evenodd"
                />
                <path
                    d="M533.2 244 350.5 139h-.2c-4.2-2.4-10-2.5-13-.1-30.5 25.1-49.5 73.4-49.5 139s19 135.8 49.5 196c3 5.8 8.8 12.4 13 14.8h.2l182.7 105h.2c4.2 2.4 10 2.5 13 .1 30.5-25.1 49.5-73.3 49.5-139s-19-135.8-49.5-196c-3-5.7-8.8-12.4-13-14.8h-.2zm-3 313L353.4 455.3c-25.8-52.5-40-110.2-40-162.8s14.2-94 40-116.9l176.8 101.6c25.8 52.5 40 110.1 40 162.8s-14.1 94.1-40 117z"
                    class="integration_st0"
                />
                <path
                    d="M404.6 487.6c.2-.3.4-.5.7-.7-1.6-.5-3.1-1.2-4.6-1.9l2 1.4 1.9 1.2z"
                    class="integration_st0"
                />
                <path
                    d="m531.6 276.6-.2-.4-177.2-101.9-.9-.5-.8.7c-7.2 6.4-13.3 13.9-18.2 22.2l2.7 1.3c4.5-7.6 10.2-14.5 16.7-20.5l175.5 100.9c7 14.2 13.1 28.8 18.3 43.8h.9l1.8-1.4c-5.3-15.1-11.6-29.8-18.6-44.2zM558.8 511.1l-1.1.2c-6.5 18.2-15.8 33-27.7 43.8l-72.9-41.9c-.2.6-.4 1.3-.7 1.9l-.4.9 73.4 42.2.4.2h1l.4-.4c12.7-11.2 22.6-26.9 29.4-46.2-.6-.1-1.2-.4-1.8-.7z"
                    class="integration_st7"
                />
                <path
                    d="M585.9 361.7c-8.7-35.9-21.5-70.6-38.2-103.5-3.1-6.1-9.1-12.8-13.6-15.4h-.2L490.8 218l-.9 2.9 42.5 24.4h.2c3.9 2.3 9.6 8.7 12.4 14.2 16.7 32.9 29.5 67.6 38.1 103.5.8-.7 1.8-1.2 2.8-1.3zM421 177.8 358.8 142c-.4.9-.9 1.8-1.4 2.7l62.6 36c.1-1 .4-2 1-2.9z"
                    class="integration_st7"
                />
                <path
                    d="M331.9 301.1 216 332v105.2l38 21.9 67.5-38.9c6.8-3.9 10.4-9 10.4-13.7V301.1z"
                    class="integration_st5"
                />
                <path
                    d="M216 332 253.9 313.4 253.9 399 216 369.5z"
                    class="integration_st8"
                />
                <path
                    d="M445.9 472.7V367.4L330 397.8V503l38 21.9 67.5-38.9c6.6-3.8 10.2-8.7 10.4-13.3z"
                    class="integration_st5"
                />
                <path
                    d="M330 397.8 367.9 383.6 367.9 532 330 532z"
                    class="integration_st8"
                />
                <path
                    d="M377.5 453.9s-219.2-99.8-219.8-102.3-41.2-2.5-41.2-2.5v25.2l-60.4 69v53.8L3 520.6v105.2l38 21.9 69.7-40.2c52.1 18.3 135.5 9.5 186.2-19.7l22.5-13 9.5 5.5c5.2 3 14.5 2.6 20.8-1l22.5-13c3.7-2.1 5.5-4.9 5.2-7.4v-105h.1z"
                    class="integration_st5"
                />
                <path
                    d="M41 503.8 3 520.6 3 625.8 41 647.7 41 503.8z"
                    class="integration_st0"
                />
                <path
                    d="M319.5 459.3v115.5l9.4 5.5 1.1.5V459.3h-10.5z"
                    class="integration_st0"
                />
                <path
                    d="M41 503.8 3 520.6 3 625.8 41 647.7 41 503.8z"
                    class="integration_st0"
                />
                <path
                    d="M129 490.6V349.2h-10.5v141.4H129z"
                    class="integration_st0"
                />
                <linearGradient
                    id="integration_SVGID_00000110470159009203969500000006920998408312791452_"
                    x1="110.5"
                    x2="319.3"
                    y1="215.322"
                    y2="215.322"
                    gradientTransform="translate(0 311.8)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#FFF" />
                    <stop offset="1" stop-color="#BBDEFB" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000110470159009203969500000006920998408312791452_)"
                    fill-rule="evenodd"
                    d="M110.5 437.1v170.5h.2c52.1 18.3 135.5 9.5 186.2-19.7l22.4-13V437.1H110.5z"
                    clip-rule="evenodd"
                />
                <linearGradient
                    id="integration_SVGID_00000043458804703369858230000009036161978251011203_"
                    x1="342.87"
                    x2="345"
                    y1="126.75"
                    y2="126.75"
                    gradientTransform="translate(0 311.8)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#FFF" />
                    <stop offset="1" stop-color="#BBDEFB" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000043458804703369858230000009036161978251011203_)"
                    fill-rule="evenodd"
                    d="M345 438.1h-2.1l2.1.9v-.9z"
                    clip-rule="evenodd"
                />
                <linearGradient
                    id="integration_SVGID_00000096777974879342054130000000698827727752552369_"
                    x1="327.709"
                    x2="345"
                    y1="198.372"
                    y2="198.372"
                    gradientTransform="translate(0 311.8)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#FFF" />
                    <stop offset="1" stop-color="#BBDEFB" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000096777974879342054130000000698827727752552369_)"
                    fill-rule="evenodd"
                    d="M342.9 438.1h-15.2v142.7c4 1.8 12.2 1.9 17.3.4V439l-2.1-.9z"
                    clip-rule="evenodd"
                />
                <linearGradient
                    id="integration_SVGID_00000129885231934549317440000002963825604170260389_"
                    x1="114.7"
                    x2="118.48"
                    y1="54.5"
                    y2="54.5"
                    gradientTransform="translate(0 311.8)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#FFF" />
                    <stop offset="1" stop-color="#BBDEFB" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000129885231934549317440000002963825604170260389_)"
                    fill-rule="evenodd"
                    d="M118.5 383.5v-34.4h-2v25.2l-1.8 2v7.2h3.8z"
                    clip-rule="evenodd"
                />
                <linearGradient
                    id="integration_SVGID_00000067923324739448961080000017641793794134577059_"
                    x1="56.1"
                    x2="72.7"
                    y1="146.28"
                    y2="146.28"
                    gradientTransform="translate(0 311.92)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#FFF" />
                    <stop offset="1" stop-color="#BBDEFB" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000067923324739448961080000017641793794134577059_)"
                    fill-rule="evenodd"
                    d="M72.7 424.3 56.1 443.3 56.1 492.1 72.7 492.1z"
                    clip-rule="evenodd"
                />
                <path
                    d="M435.5 380.6c12.4-7.2 14-17.9 3.5-23.9s-29.1-5.1-41.5 2L330 397.6l38 21.9 67.5-38.9zM374 448.9 165 328.3c-5.2-3-14.5-2.6-20.7 1l-22.5 13c-6.2 3.6-7 8.9-1.7 12l9.5 5.5-22.5 13c-50.7 29.2-66 77.4-34.2 107.4L3 520.4l38 21.9 69.7-40.2c52.1 18.3 135.6 9.5 186.3-19.7l22.5-13 9.5 5.5c5.2 3 14.5 2.6 20.8-1l22.5-13c6.2-3.6 6.9-9 1.7-12zm-52.5-134.1c12.4-7.2 14-17.9 3.5-23.9s-29.1-5.1-41.5 2L216 331.8l38 21.9 67.5-38.9z"
                    class="integration_st0"
                />
                <path
                    d="M6.4 518.4 3 520.3l1.4.8c.7-.8 1.3-1.8 2-2.7z"
                    class="integration_st8"
                />
                <path
                    d="M325.7 289.6c-4.9-2.8-11.5-4.2-18.4-4.2v.7c0 .7-.1 1.5-.2 2.2 6.4 0 12.5 1.2 17 3.8s6.2 5.4 6.2 8.8-3.5 9-9.7 12.5L254 352l-17.6-10.2c-.3.9-.7 1.7-1.1 2.5l-.2.3 18.8 10.9 68.2-39.4c7.1-4.1 11.2-9.6 11.2-15.1s-2.6-8.6-7.6-11.4zM439.7 355.3c-8.8-5.1-22.9-5.4-34.8-1.5.4.9.9 1.8 1.4 2.7 11-3.5 23.9-3.1 31.9 1.5 4.1 2.3 6.2 5.4 6.2 8.8s-3.5 9-9.7 12.5L368 417.7l-14.7-8.5c-.3.4-.7.7-1.1.9l-1.9.9 17.7 10.2 68.2-39.4c7.1-4.1 11.2-9.6 11.2-15.1s-2.7-8.5-7.7-11.4zM329.8 473.5l-10.2-5.9-23.2 13.4c-39.4 22.7-98.9 33.1-147.7 27.7.3 1 .2 2.1-.2 3 49.4 5.4 109.5-5.1 149.4-28.1l21.8-12.5 8.8 5 .3.2 1-.9.3-1.8c-.3 0-.3 0-.3-.1zM101.6 505.6l-60.6 35-6.6-3.8-1.1 1.6-.7.9 8.4 4.8 61.8-35.6-1.2-2.9zM374.7 447.6l-108.3-62.5-2.1 2.3 108.9 62.8c1.2.7 2.7 2 2.7 3.8s-1.7 4-4.5 5.6l-3.9 2.2c.8.6 1.5 1.4 2 2.3l3.4-1.9c3.8-2.2 6-5.2 6-8.2s-1.4-4.8-4.2-6.4z"
                    class="integration_st7"
                />
                <path
                    d="M779.5 124.7c-3-5.7-8.8-12.4-13-14.8h-.2L583.6 4.8h-.2c-3.5-2-7.8-2.4-11.6-1h-.1l-232.3 134h0c-.7.2-1.4.6-2 1.1-30.5 25.1-49.5 73.4-49.5 139 0 4.3.1 12.9.1 12.9l-72 41 .3.2h-.3v25.8l-51-29.4c-5.2-3-14.5-2.6-20.7 1l-22.5 13c-3.4 2-5.2 4.5-5.2 6.8h0v18.1l-9.5 5.5c-32.8 19-50.8 45.9-50.8 70.6h-.1v46.4L3 520.4h0v105.4l38 21.9 69.7-40.2c52.1 18.3 135.5 9.5 186.2-19.7l22.5-13 9.5 5.5c5.2 3 14.5 2.6 20.8-1l22.5-13c3.7-2.1 5.5-4.9 5.2-7.4h0v-39.4l13.4-7.7 142.4 81.8h.2c3.6 2.1 8.5 2.4 11.7.9h0c.4-.2 233.9-134.6 234.4-135 30.5-25.1 49.5-73.3 49.5-139s-19-135.6-49.5-195.8z"
                    class="integration_st14"
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
                enable-background="new 0 0 832 650.7"
                viewBox="0 0 832 650.7"
                aria-hidden="true"
                width="100%"
                height="100%"
                focusable="false"
                role="img"
                part="illustration"
            >
                <path
                    d="m608.3 201.9-182.7-105h-.2c-4.2-2.4-10-2.5-13-.1-30.5 25.1-49.5 73.4-49.5 139s19 135.8 49.5 196c3 5.8 8.8 12.4 13 14.8h.2l182.7 105h.2c4.2 2.4 10 2.5 13 .1 30.5-25 49.5-73.2 49.5-138.9s-19-135.8-49.5-196c-3-5.7-8.8-12.4-13-14.8l-.2-.1z"
                    class="integration_st0"
                />
                <linearGradient
                    id="integration_SVGID_1_"
                    x1="428.101"
                    x2="491.431"
                    y1="-240.65"
                    y2="-130.969"
                    gradientTransform="translate(0 452)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#09264A" />
                    <stop offset="1" stop-color="#CED4DB" />
                </linearGradient>
                <path
                    d="M478.8 320.3c0 9.6-5.7 14-12.7 10l-12.7-7.3c-7-4.1-12.7-15.1-12.7-24.6v-86.3c0-9.6 5.7-14 12.7-10l12.7 7.3c7 4 12.7 15 12.7 24.6v86.3z"
                    class="integration_st1"
                />
                <linearGradient
                    id="integration_SVGID_00000114057500653040994810000002445779408111074455_"
                    x1="542.171"
                    x2="596.971"
                    y1="-174.932"
                    y2="-80.032"
                    gradientTransform="translate(0 452)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#09264A" />
                    <stop offset="1" stop-color="#CED4DB" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000114057500653040994810000002445779408111074455_)"
                    fill-rule="evenodd"
                    d="M592.9 299.7c-.1-9.6-5.8-20.6-12.7-24.6l-12.7-7.3c-7-4-12.7.4-12.7 10v86.3c0 9.5 5.7 20.5 12.7 24.6h.2l25.2-14.9v-74.1z"
                    clip-rule="evenodd"
                />
                <linearGradient
                    id="integration_SVGID_00000123413441819497249640000005238915406077149060_"
                    x1="496.959"
                    x2="536.739"
                    y1="-74.553"
                    y2="-5.643"
                    gradientTransform="translate(0 452)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#09264A" />
                    <stop offset="1" stop-color="#CED4DB" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000123413441819497249640000005238915406077149060_)"
                    fill-rule="evenodd"
                    d="M516.8 376.7c-14-8.1-25.3.9-25.3 19.9v17.3l50.7 29.2v-17.3c-.1-19.1-11.4-41.1-25.4-49.1z"
                    clip-rule="evenodd"
                />
                <path
                    d="M621.4 216.8c-3-5.7-8.8-12.4-13-14.8h-.2L425.5 96.9h-.2c-4.2-2.4-10-2.5-13-.1-21.3 17.5-37 46.3-44.5 84.4l-23.7-11.5-11-9.9-19.7 47-17.6 60.3 12.2 101 41.7 104.2 187.5 96.5 26.6-42.9 44.5 25.6h.2c4.2 2.4 10 2.5 13 .1 30.5-25.1 49.5-73.3 49.5-139s-19-135.7-49.6-195.8zm-16.1 298.1L428.5 413.2c-25.8-52.5-40-110.2-40-162.8s14.2-94 40-116.9l176.8 101.6c25.8 52.5 40 110.1 40 162.8s-14.2 94.1-40 117z"
                    class="integration_st0"
                />
                <linearGradient
                    id="integration_SVGID_00000091737569724050987280000010630732415680238245_"
                    x1="501.687"
                    x2="379.896"
                    y1="370.757"
                    y2="159.808"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#CED4DB" />
                    <stop offset="1" stop-color="#09264A" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000091737569724050987280000010630732415680238245_)"
                    d="m428.5 133.5 176.8 101.6c9.5 19.4 17.5 39.5 23.7 59.9l20-11.7c-7.6-23-16.9-45.3-27.6-66.4-3-5.7-8.8-12.4-13-14.8h-.2L459 116.2l-87.5 49.2c-1.4 5.1-2.7 10.3-3.7 15.8l-13.1-6.3-36.6 20.6-4.8 11.3-17.6 60.3 12.2 101 37.2 93 83-48.6c-25.6-52.3-39.7-109.8-39.7-162.1.1-52.6 14.3-94 40.1-116.9z"
                />
                <path
                    d="M779.5 124.7c-3-5.7-8.8-12.4-13-14.8h-.2L583.6 4.8h-.2c-3.5-2-7.8-2.4-11.6-1h-.1l-232.3 134 8.1 19.9 190.4 99.5c8.2 28.5 19.1 56.1 32.5 82.5 1 1.9 2.2 3.8 3.5 5.5 0 0 251-86.5 243.5-117.6-8.6-35.6-21.4-70.2-37.9-102.9z"
                    class="integration_st0"
                />
                <path
                    d="m580.1 375 7.6 36.1 3.3 54.8-9.9 45-24.1 43.7-12 40.1 232.7-134 1.8-1c30.5-25.1 49.5-73.3 49.5-139 0-9.9-.4-19.8-1.3-29.8C823 234.2 580.1 375 580.1 375z"
                    class="integration_st5"
                />
                <linearGradient
                    id="integration_SVGID_00000089559034185549631760000003644279120985536442_"
                    x1="632.292"
                    x2="733.105"
                    y1="-112.619"
                    y2="62.025"
                    gradientTransform="translate(0 311.8)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#CED4DB" />
                    <stop offset="1" stop-color="#09264A" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000089559034185549631760000003644279120985536442_)"
                    fill-rule="evenodd"
                    d="M779.5 124.7c-.9-1.8-2-3.5-3.2-5.1L534.9 255.4l3 1.6c8.2 28.5 19.1 56.1 32.5 82.5 1 1.9 2.2 3.8 3.5 5.5l13.8 65.9 2.7 45.3L829 316.6c-.8-64.5-19.6-133-49.5-191.9z"
                    clip-rule="evenodd"
                />
                <path
                    d="M533.2 244 350.5 139h-.2c-4.2-2.4-10-2.5-13-.1-30.5 25.1-49.5 73.4-49.5 139s19 135.8 49.5 196c3 5.8 8.8 12.4 13 14.8h.2l182.7 105h.2c4.2 2.4 10 2.5 13 .1 30.5-25.1 49.5-73.3 49.5-139s-19-135.8-49.5-196c-3-5.7-8.8-12.4-13-14.8h-.2zm-3 313L353.4 455.3c-25.8-52.5-40-110.2-40-162.8s14.2-94 40-116.9l176.8 101.6c25.8 52.5 40 110.1 40 162.8s-14.1 94.1-40 117z"
                    class="integration_st0"
                />
                <path
                    d="M404.6 487.6c.2-.3.4-.5.7-.7-1.6-.5-3.1-1.2-4.6-1.9l2 1.4 1.9 1.2z"
                    class="integration_st7"
                />
                <path
                    d="m531.6 276.6-.2-.4-177.2-101.9-.9-.5-.8.7c-7.2 6.4-13.3 13.9-18.2 22.2l2.7 1.3c4.5-7.6 10.2-14.5 16.7-20.5l175.5 100.9c7 14.2 13.1 28.8 18.3 43.8h.9l1.8-1.4c-5.3-15.1-11.6-29.8-18.6-44.2zM558.8 511.1l-1.1.2c-6.5 18.2-15.8 33-27.7 43.8l-72.9-41.9c-.2.6-.4 1.3-.7 1.9l-.4.9 73.4 42.2.4.2h1l.4-.4c12.7-11.2 22.6-26.9 29.4-46.2-.6-.1-1.2-.4-1.8-.7z"
                    class="integration_st8"
                />
                <path
                    d="M585.9 361.7c-8.7-35.9-21.5-70.6-38.2-103.5-3.1-6.1-9.1-12.8-13.6-15.4h-.2L490.8 218l-.9 2.9 42.5 24.4h.2c3.9 2.3 9.6 8.7 12.4 14.2 16.7 32.9 29.5 67.6 38.1 103.5.8-.7 1.8-1.2 2.8-1.3zM421 177.8 358.8 142c-.4.9-.9 1.8-1.4 2.7l62.6 36c.1-1 .4-2 1-2.9z"
                    class="integration_st8"
                />
                <path
                    d="M331.9 301.1 216 332v105.2l38 21.9 67.5-38.9c6.8-3.9 10.4-9 10.4-13.7V301.1z"
                    class="integration_st5"
                />
                <path
                    d="M216 332 253.9 313.4 253.9 399 216 369.5z"
                    class="integration_st9"
                />
                <path
                    d="M445.9 472.7V367.4L330 397.8V503l38 21.9 67.5-38.9c6.6-3.8 10.2-8.7 10.4-13.3z"
                    class="integration_st5"
                />
                <path
                    d="M330 397.8 367.9 383.6 367.9 532 330 532z"
                    class="integration_st9"
                />
                <path
                    d="M377.5 453.9s-219.2-99.8-219.8-102.3-41.2-2.5-41.2-2.5v25.2l-60.4 69v53.8L3 520.6v105.2l38 21.9 69.7-40.2c52.1 18.3 135.5 9.5 186.2-19.7l22.5-13 9.5 5.5c5.2 3 14.5 2.6 20.8-1l22.5-13c3.7-2.1 5.5-4.9 5.2-7.4v-105h.1z"
                    class="integration_st5"
                />
                <path
                    d="M41 503.8 3 520.6 3 625.8 41 647.7 41 503.8z"
                    class="integration_st7"
                />
                <path
                    d="M319.5 459.3v115.5l9.4 5.5 1.1.5V459.3h-10.5z"
                    class="integration_st0"
                />
                <path
                    d="M41 503.8 3 520.6 3 625.8 41 647.7 41 503.8z"
                    class="integration_st0"
                />
                <path
                    d="M129 490.6V349.2h-10.5v141.4H129z"
                    class="integration_st7"
                />
                <linearGradient
                    id="integration_SVGID_00000058561693385460197390000009989644982504479653_"
                    x1="110.5"
                    x2="319.3"
                    y1="215.322"
                    y2="215.322"
                    gradientTransform="translate(0 311.8)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#CED4DB" />
                    <stop offset="1" stop-color="#09264A" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000058561693385460197390000009989644982504479653_)"
                    fill-rule="evenodd"
                    d="M110.5 437.1v170.5h.2c52.1 18.3 135.5 9.5 186.2-19.7l22.4-13V437.1H110.5z"
                    clip-rule="evenodd"
                />
                <linearGradient
                    id="integration_SVGID_00000098189337818534720160000011027003419104997790_"
                    x1="342.87"
                    x2="345"
                    y1="126.75"
                    y2="126.75"
                    gradientTransform="translate(0 311.8)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#FFF" />
                    <stop offset="1" stop-color="#BBDEFB" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000098189337818534720160000011027003419104997790_)"
                    fill-rule="evenodd"
                    d="M345 438.1h-2.1l2.1.9v-.9z"
                    clip-rule="evenodd"
                />
                <linearGradient
                    id="integration_SVGID_00000146500778915801222950000004416384932196251269_"
                    x1="329.98"
                    x2="345"
                    y1="198.372"
                    y2="198.372"
                    gradientTransform="translate(0 311.8)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#CED4DB" />
                    <stop offset="1" stop-color="#09264A" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000146500778915801222950000004416384932196251269_)"
                    fill-rule="evenodd"
                    d="M342.9 438.1H330v142.7c4 1.8 9.9 1.9 15 .4V439l-2.1-.9z"
                    clip-rule="evenodd"
                />
                <linearGradient
                    id="integration_SVGID_00000180368474329697188320000007303510409226220985_"
                    x1="114.7"
                    x2="118.48"
                    y1="54.5"
                    y2="54.5"
                    gradientTransform="translate(0 311.8)"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stop-color="#FFF" />
                    <stop offset="1" stop-color="#BBDEFB" />
                </linearGradient>
                <path
                    fill="url(#integration_SVGID_00000180368474329697188320000007303510409226220985_)"
                    fill-rule="evenodd"
                    d="M118.5 383.5v-34.4h-2v25.2l-1.8 2v7.2h3.8z"
                    clip-rule="evenodd"
                />
                <path
                    d="M72.7 424.3 56.1 443.3 56.1 492.1 72.7 492.1z"
                    class="integration_st0"
                />
                <path
                    d="M435.5 380.6c12.4-7.2 14-17.9 3.5-23.9s-29.1-5.1-41.5 2L330 397.6l38 21.9 67.5-38.9zM374 448.9 165 328.3c-5.2-3-14.5-2.6-20.7 1l-22.5 13c-6.2 3.6-7 8.9-1.7 12l9.5 5.5-22.5 13c-50.7 29.2-66 77.4-34.2 107.4L3 520.4l38 21.9 69.7-40.2c52.1 18.3 135.6 9.5 186.3-19.7l22.5-13 9.5 5.5c5.2 3 14.5 2.6 20.8-1l22.5-13c6.2-3.6 6.9-9 1.7-12zm-52.5-134.1c12.4-7.2 14-17.9 3.5-23.9s-29.1-5.1-41.5 2L216 331.8l38 21.9 67.5-38.9z"
                    class="integration_st0"
                />
                <path
                    d="M6.4 518.4 3 520.3l1.4.8c.7-.8 1.3-1.8 2-2.7z"
                    class="integration_st14"
                />
                <path
                    d="M325.7 289.6c-4.9-2.8-11.5-4.2-18.4-4.2v.7c0 .7-.1 1.5-.2 2.2 6.4 0 12.5 1.2 17 3.8s6.2 5.4 6.2 8.8-3.5 9-9.7 12.5L254 352l-17.6-10.2c-.3.9-.7 1.7-1.1 2.5l-.2.3 18.8 10.9 68.2-39.4c7.1-4.1 11.2-9.6 11.2-15.1s-2.6-8.6-7.6-11.4zM439.7 355.3c-8.8-5.1-22.9-5.4-34.8-1.5.4.9.9 1.8 1.4 2.7 11-3.5 23.9-3.1 31.9 1.5 4.1 2.3 6.2 5.4 6.2 8.8s-3.5 9-9.7 12.5L368 417.7l-14.7-8.5c-.3.4-.7.7-1.1.9l-1.9.9 17.7 10.2 68.2-39.4c7.1-4.1 11.2-9.6 11.2-15.1s-2.7-8.5-7.7-11.4zM329.8 473.5l-10.2-5.9-23.2 13.4c-39.4 22.7-98.9 33.1-147.7 27.7.3 1 .2 2.1-.2 3 49.4 5.4 109.5-5.1 149.4-28.1l21.8-12.5 8.8 5 .3.2 1-.9.3-1.8c-.3 0-.3 0-.3-.1zM101.6 505.6l-60.6 35-6.6-3.8-1.1 1.6-.7.9 8.4 4.8 61.8-35.6-1.2-2.9zM374.7 447.6l-108.3-62.5-2.1 2.3 108.9 62.8c1.2.7 2.7 2 2.7 3.8s-1.7 4-4.5 5.6l-3.9 2.2c.8.6 1.5 1.4 2 2.3l3.4-1.9c3.8-2.2 6-5.2 6-8.2s-1.4-4.8-4.2-6.4z"
                    class="integration_st8"
                />
                <path
                    d="M779.5 124.7c-3-5.7-8.8-12.4-13-14.8h-.2L583.6 4.8h-.2c-3.5-2-7.8-2.4-11.6-1h-.1l-232.3 134h0c-.7.2-1.4.6-2 1.1-30.5 25.1-49.5 73.4-49.5 139 0 4.3.1 8.6.2 12.9l-4.6 2.2-67.5 38.8.3.2h-.3v25.8l-51-29.4c-5.2-3-14.5-2.6-20.7 1l-22.5 13c-3.4 2-5.2 4.5-5.2 6.8h0v18.1l-9.5 5.5c-32.8 19-50.8 45.9-50.8 70.6h-.1v46.4L3 520.4h0v105.4l38 21.9 69.7-40.2c52.1 18.3 135.5 9.5 186.2-19.7l22.5-13 9.5 5.5c5.2 3 14.5 2.6 20.8-1l22.5-13c3.7-2.1 5.5-4.9 5.2-7.4h0v-39.4l13.4-7.7 142.4 81.8h.2c3.6 2.1 8.5 2.4 11.7.9h0c.4-.2 233.9-134.6 234.4-135 30.5-25.1 49.5-73.3 49.5-139s-19-135.6-49.5-195.8z"
                    class="integration_st15"
                />
            </svg>
        );
    }
}
