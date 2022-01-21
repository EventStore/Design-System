import { addChildTheme } from '@eventstore/theme';

/**
 * These css vaiables are automatically added via @eventstore/theme.
 * @usage ./codeThemes.usage.md
 */
export interface CodeColorScheme {
    fg: string;
    bg: string;
    literal: string;
    symbol: string;
    keyword: string;
    string: string;
    error: string;
    variable: string;
    class: string;
    comment: string;
}

addChildTheme<CodeColorScheme>('code', {
    // one light
    light: {
        fg: '#383a42',
        bg: '#fafafa',
        literal: '#0184bc',
        symbol: '#4078f2',
        keyword: '#a626a4',
        string: '#50a14f',
        error: '#e45649',
        variable: '#986801',
        class: '#c18401',
        comment: '#6f7f90',
    },
    // one dark
    dark: {
        fg: '#d7dae0',
        bg: '#313440',
        literal: '#E5C07B',
        symbol: '#56B6C2',
        keyword: '#C678DD',
        string: '#98C379',
        error: '#E05252',
        variable: '#E06C75',
        class: '#E5C07B',
        comment: '#5C6370',
    },
    // a11y syntax highlighting (light)
    high_contrast_light: {
        fg: '#545454',
        bg: '#fefefe',
        literal: '#aa5d00',
        symbol: '#008000',
        keyword: '#7928a1',
        string: '#008000',
        error: '#d91e18',
        variable: '#d91e18',
        class: '#aa5d00',
        comment: '#696969',
    },
    // a11y syntax highlighting (dark)
    high_contrast_dark: {
        fg: '#f8f8f2',
        bg: '#2b2b2b',
        literal: '#f5ab35',
        symbol: '#abe338',
        keyword: '#dcc6e0',
        string: '#abe338',
        error: '#ffa07a',
        variable: '#ffa07a',
        class: '#f5ab35',
        comment: '#d4d0ab',
    },
});
