import { Component, h, Host } from '@stencil/core';
import { theme } from '@kurrent-ui/theme';
import { themes } from '@kurrent-ui/theme/dist/themes';
import type { ThemeDefinition } from '@kurrent-ui/theme/dist/types';
@Component({
    tag: 'l2-theme-picker',
    styleUrl: 'theme-picker.css',
    shadow: true,
})

/** Choose a theme from available themes */
export class ThemePicker {
    renderTheme(theme: ThemeDefinition, selectedTheme: string) {
        const selected = selectedTheme === theme.name;
        return (
            <label key={theme.name} class={{ selected }}>
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 56"
                    >
                        <rect
                            width="100"
                            height="56"
                            fill={theme.scheme.background}
                        />
                        <path
                            d="M61 5h30c1.7 0 3 1.3 3 3s-1.3 3-3 3H61c-1.7 0-3-1.3-3-3s1.3-3 3-3Z"
                            fill="transparent"
                            stroke="white"
                            stroke-linejoin="round"
                        />
                        <rect
                            x="37"
                            y="23"
                            width="57"
                            height="24"
                            fill="transparent"
                            stroke={theme.scheme.foreground}
                            stroke-linejoin="round"
                        />
                        <rect
                            x="6"
                            y="23"
                            width="26"
                            height="24"
                            fill="transparent"
                            stroke={theme.scheme.foreground}
                            stroke-linejoin="round"
                        />
                        <path
                            d="M9 5c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3Z"
                            fill="#5ab552"
                            stroke="#5ab552"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>

                <div class="selection_wrapper">
                    <input
                        type={'radio'}
                        name={'theme'}
                        value={theme.name}
                        checked={selected}
                    />
                    <span>{theme.title}</span>
                </div>
            </label>
        );
    }

    render() {
        theme.registerInterest();

        return (
            <Host>
                <div class="header_wrapper">
                    <h1>{'Themes'}</h1>
                    <button
                        class={{
                            auto: true,
                            checked: theme.selected === 'auto',
                        }}
                        onClick={this.onAutoClick}
                    >
                        {'Auto '}
                        <svg
                            xmlns={'http://www.w3.org/2000/svg'}
                            width={45}
                            height={16}
                            viewBox={'0 0 45 16'}
                            class={'switch'}
                        >
                            <line
                                class={'track'}
                                x1={4}
                                x2={41}
                                y1={9}
                                y2={9}
                                stroke-linecap={'round'}
                            />
                            <circle class={'handle'} cx={8} cy={9} r={8} />
                        </svg>
                    </button>
                </div>
                <form onChange={this.onThemeSelection}>
                    {Object.values(themes).map((themeDefinition) =>
                        this.renderTheme(themeDefinition, theme.name),
                    )}
                </form>
            </Host>
        );
    }

    private onThemeSelection = (e: Event) => {
        const { value } = e.target as HTMLInputElement;
        theme.select(value);
    };

    private onAutoClick = () => {
        if (theme.selected !== 'auto') {
            theme.select('auto');
        } else {
            theme.select(theme.autoThemeName());
        }
    };
}
