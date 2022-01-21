import { Component, h } from '@stencil/core';
import { theme } from '@eventstore/theme';
import { themes } from '@eventstore/theme/dist/themes';
import type { ThemeDefinition } from '@eventstore/theme/dist/types';

@Component({
    tag: 'es-theme-picker',
    styleUrl: 'es-theme-picker.css',
    shadow: true,
})
export class ThemePicker {
    renderTheme(theme: ThemeDefinition, selectedTheme: string) {
        const selected = selectedTheme === theme.name;
        return (
            <label
                key={theme.name}
                class={{ selected, auto: theme.name === 'auto' }}
            >
                <div>
                    <svg
                        viewBox="0 0 331 221"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="331"
                            height="221"
                            fill={theme.scheme.background}
                        />
                        <rect
                            width="331"
                            height="24"
                            fill={theme.scheme.header}
                        />
                        <line
                            x1="68.5"
                            y1="24"
                            x2="68.5"
                            y2="221"
                            stroke={theme.scheme.shade_30}
                        />
                        <line
                            x1="88"
                            y1="41"
                            x2="152"
                            y2="41"
                            stroke={theme.scheme.title_1}
                            stroke-width="6"
                            stroke-linecap="round"
                        />
                        <line
                            x1="11"
                            y1="42"
                            x2="44"
                            y2="42"
                            stroke={theme.scheme.text}
                            stroke-width="4"
                            stroke-linecap="round"
                        />
                        <line
                            x1="11"
                            y1="56"
                            x2="33"
                            y2="56"
                            stroke={theme.scheme.text}
                            stroke-width="4"
                            stroke-linecap="round"
                        />
                        <line
                            x1="11"
                            y1="70"
                            x2="46"
                            y2="70"
                            stroke={theme.scheme.text}
                            stroke-width="4"
                            stroke-linecap="round"
                        />
                    </svg>
                </div>
                <input
                    type={'radio'}
                    name={'theme'}
                    value={theme.name}
                    checked={selected}
                />
                <span>{theme.title}</span>
            </label>
        );
    }

    render() {
        theme.registerInterest();
        const selected = theme.selected;
        const autoSelection = themes[theme.autoThemeName()];
        const auto: ThemeDefinition = {
            ...autoSelection,
            title: `Auto (${autoSelection.title})`,
            name: 'auto',
        };
        return (
            <form onChange={this.onChange}>
                <h1>{'Theme'}</h1>
                <div class={'cards'}>
                    {this.renderTheme(auto, selected)}
                    {Object.values(themes).map((theme) =>
                        this.renderTheme(theme, selected),
                    )}
                </div>
            </form>
        );
    }

    private onChange = (e: Event) => {
        const { value } = e.target as HTMLInputElement;
        theme.select(value);
    };
}
