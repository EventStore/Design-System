import { Component, h, Host } from '@stencil/core';
import { theme } from '@kurrent-ui/theme';

/**
 * Displays Policy illustration.
 * @part illustration - The root svg of the illustration.
 */
@Component({
    tag: 'es-illustration-policy',
    styleUrl: 'policy.css',
    shadow: true,
})
export class EsIllustrationPolicy {
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
                viewBox="0 0 653 837.4"
                aria-hidden="true"
                width="100%"
                height="100%"
                focusable="false"
                role="img"
                part="illustration"
            >
                <defs>
                    <linearGradient
                        id="policy_b"
                        x1="320.9"
                        x2="394.6"
                        y1="597"
                        y2="724.7"
                        gradientTransform="matrix(1 0 0 -1 0 840)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stop-color="#fff" />
                        <stop offset="1" stop-color="#dceefd" />
                    </linearGradient>
                    <linearGradient
                        id="policy_c"
                        x1="328.8"
                        x2="254.5"
                        y1="249.3"
                        y2="120.6"
                        gradientTransform="matrix(1 0 0 -1 0 840)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stop-color="#fff" />
                        <stop offset="1" stop-color="#dceefd" />
                    </linearGradient>
                </defs>
                <path
                    fill="#bbdefb"
                    fill-rule="evenodd"
                    d="M650 307.3 254.7 80.5s-1.1-57.3-26-71.9L625 236.4s25 15.2 25 70.9Z"
                />
                <path
                    fill="#fff"
                    fill-rule="evenodd"
                    d="M606.3 225.4 220 3.8s-32-10.3-64 44c0 0-27 47.7-27 104v307s-2.7 56-19 86-31.3 62.3-72 61l380 219s29.7 31.7 68-20 38.3-119 38.3-119v-307s1-59 28.7-105c19.6-32.6 38.5-42.9 52.8-43.5.2-1.6.4-3.3.5-4.9Z"
                />
                <path
                    fill="url(#policy_b)"
                    fill-rule="evenodd"
                    d="M605.8 230.3c.2-1.6.4-3.3.5-4.9L220 3.8s-32-10.3-64 44c0 0-20.6 36.4-25.8 83.1 31.5 21.2 394.4 232.2 395.2 232.7 2.2-20.6 8.6-58.3 27.6-89.8s38.5-42.9 52.8-43.5Z"
                />
                <path
                    fill="url(#policy_c)"
                    fill-rule="evenodd"
                    d="M127.6 475.7c-2.1 19-7 49.5-17.6 69.1-16.3 30-31.3 62.3-72 61l380 219s29.7 31.7 68-20c25.7-34.7 34.2-76.4 36.9-100.1-42.3-27.4-393.2-231.4-393.2-231.4l-2.1 2.4Z"
                />
                <path
                    fill="#1a4e85"
                    d="M571.3 251.4c10-10.7 19.6-16.5 28.2-18.6l-.9-2.9c-2.4.6-4.8 1.4-7.1 2.4-7.6 3.3-15 9-22.2 16.8.7.7 1.4 1.5 2 2.3Z"
                />
                <path
                    fill="#bbdefb"
                    fill-rule="evenodd"
                    d="m3 529.8 395 227s1.1 57.4 26 72l-396-228s-25-15.2-25-71Z"
                />
                <path
                    fill="#1a4e85"
                    d="m225.4 655.9-98.6-56.7c-.4.9-.7 1.9-1.1 2.8l97.7 56.1 2-2.2ZM401.8 794.7l2.9-1.1c-3-12.1-4.7-24.4-5.2-36.8 0-.5-.3-1-.8-1.3l-89.5-51.4c-.4.9-.8 1.8-1.3 2.7l88.6 50.9c.6 12.5 2.3 24.9 5.3 37Z"
                />
                <path
                    fill="none"
                    stroke="#1a4e85"
                    stroke-miterlimit="10"
                    stroke-width="6"
                    d="M650 307.3c0-55.7-25-70.9-25-70.9l-7-4 3 1.4-240.6-138L228.7 8.6l2.3 1.5-11-6.3s-32-10.3-64 44c0 0-27 47.7-27 104v307s-2.7 56-19 86c-6.5 11.9-12.8 24.3-20.6 34.7L3 529.8c0 55.8 25 71 25 71l391.6 225.5c6.6 5.6 33.3 23.2 66.4-21.5 38.3-51.7 38.3-119 38.3-119v-307s1-59 28.7-105c3.3-5.5 6.9-10.8 10.8-15.9l86.2 49.4Z"
                />
            </svg>
        );
    }

    renderDark() {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 653 837.4"
                aria-hidden="true"
                width="100%"
                height="100%"
                focusable="false"
                role="img"
                part="illustration"
            >
                <defs>
                    <linearGradient
                        id="policy_b"
                        x1="320.9"
                        x2="394.6"
                        y1="597"
                        y2="724.7"
                        gradientTransform="matrix(1 0 0 -1 0 840)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stop-color="#ced4db" />
                        <stop offset=".1" stop-color="#c9d0d7" />
                        <stop offset=".3" stop-color="#bdc5cf" />
                        <stop
                            offset=".4"
                            stop-color="#a9b3c0"
                            stop-opacity=".9"
                        />
                        <stop
                            offset=".6"
                            stop-color="#8d9aab"
                            stop-opacity=".8"
                        />
                        <stop
                            offset=".7"
                            stop-color="#687a90"
                            stop-opacity=".7"
                        />
                        <stop
                            offset=".9"
                            stop-color="#3c536f"
                            stop-opacity=".6"
                        />
                        <stop
                            offset="1"
                            stop-color="#09264a"
                            stop-opacity=".5"
                        />
                    </linearGradient>
                    <linearGradient
                        id="policy_c"
                        x1="328.8"
                        x2="254.5"
                        y1="249.3"
                        y2="120.6"
                        gradientTransform="matrix(1 0 0 -1 0 840)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0" stop-color="#ced4db" />
                        <stop offset=".1" stop-color="#c9d0d7" />
                        <stop offset=".3" stop-color="#bdc5cf" />
                        <stop
                            offset=".4"
                            stop-color="#a9b3c0"
                            stop-opacity=".9"
                        />
                        <stop
                            offset=".6"
                            stop-color="#8d9aab"
                            stop-opacity=".8"
                        />
                        <stop
                            offset=".7"
                            stop-color="#687a90"
                            stop-opacity=".7"
                        />
                        <stop
                            offset=".9"
                            stop-color="#3c536f"
                            stop-opacity=".6"
                        />
                        <stop
                            offset="1"
                            stop-color="#09264a"
                            stop-opacity=".5"
                        />
                    </linearGradient>
                </defs>
                <path
                    fill="#09264a"
                    fill-rule="evenodd"
                    d="M650 307.3 254.7 80.5s-1.1-57.3-26-71.9L625 236.4s25 15.2 25 70.9Z"
                />
                <path
                    fill="#ced4db"
                    fill-rule="evenodd"
                    d="M606.3 225.4 220 3.8s-32-10.3-64 44c0 0-27 47.7-27 104v307s-2.7 56-19 86-31.3 62.3-72 61l380 219s29.7 31.7 68-20 38.3-119 38.3-119v-307s1-59 28.7-105c19.6-32.6 38.5-42.9 52.8-43.5.2-1.6.4-3.3.5-4.9Z"
                />
                <path
                    fill="url(#policy_b)"
                    fill-rule="evenodd"
                    d="M605.8 230.3c.2-1.6.4-3.3.5-4.9L220 3.8s-32-10.3-64 44c0 0-20.6 36.4-25.8 83.1 31.5 21.2 394.4 232.2 395.2 232.7 2.2-20.6 8.6-58.3 27.6-89.8s38.5-42.9 52.8-43.5Z"
                />
                <path
                    fill="url(#policy_c)"
                    fill-rule="evenodd"
                    d="M127.6 475.7c-2.1 19-7 49.5-17.6 69.1-16.3 30-31.3 62.3-72 61l380 219s29.7 31.7 68-20c25.7-34.7 34.2-76.4 36.9-100.1-42.3-27.4-393.2-231.4-393.2-231.4l-2.1 2.4Z"
                />
                <path
                    fill="#09264a"
                    d="M571.3 251.4c10-10.7 19.6-16.5 28.2-18.6l-.9-2.9c-2.4.6-4.8 1.4-7.1 2.4-7.6 3.3-15 9-22.2 16.8.7.7 1.4 1.5 2 2.3Z"
                />
                <path
                    fill="#09264a"
                    fill-rule="evenodd"
                    d="m3 529.8 395 227s1.1 57.4 26 72l-396-228s-25-15.2-25-71Z"
                />
                <path
                    fill="#09264a"
                    d="m225.4 655.9-98.6-56.7c-.4.9-.7 1.9-1.1 2.8l97.7 56.1 2-2.2ZM401.8 794.7l2.9-1.1c-3-12.1-4.7-24.4-5.2-36.8 0-.5-.3-1-.8-1.3l-89.5-51.4c-.4.9-.8 1.8-1.3 2.7l88.6 50.9c.6 12.5 2.3 24.9 5.3 37Z"
                />
                <path
                    fill="none"
                    stroke="#fff"
                    stroke-miterlimit="10"
                    stroke-width="6"
                    d="M650 307.3c0-55.7-25-70.9-25-70.9l-7-4 3 1.4-240.6-138L228.7 8.6l2.3 1.5-11-6.3s-32-10.3-64 44c0 0-27 47.7-27 104v307s-2.7 56-19 86c-6.5 11.9-12.8 24.3-20.6 34.7L3 529.8c0 55.8 25 71 25 71l391.6 225.5c6.6 5.6 33.3 23.2 66.4-21.5 38.3-51.7 38.3-119 38.3-119v-307s1-59 28.7-105c3.3-5.5 6.9-10.8 10.8-15.9l86.2 49.4Z"
                />
            </svg>
        );
    }
}
