import {
    Component,
    h,
    Prop,
    Method,
    Element,
    FunctionalComponent,
    State,
    Watch,
} from '@stencil/core';
import { createLogger } from '@eventstore/utils';
import { iconStore } from '../../utils/iconStore';

const logger = createLogger('es-icon', 'orange');

@Component({
    tag: 'es-icon',
    styleUrl: 'es-icon.css',
    shadow: true,
})
export class Icon {
    @Element() host!: HTMLEsIconElement;

    @Prop() icon!: string;
    @Prop() size: number = 24;
    @Prop() angle: number = 0;
    @Prop() spin?: boolean;
    @Prop() spinDirection: 'clockwise' | 'antiClockwise' = 'clockwise';

    @State() Component: FunctionalComponent<any> = (props) => (
        <svg {...props}></svg>
    );

    @Method() async spinEnd() {
        const spinner = this.host.shadowRoot?.querySelector('.spin');
        if (!spinner) return;
        return new Promise((resolve) => {
            const spinComplete = () => {
                spinner.removeEventListener('animationiteration', spinComplete);
                resolve();
            };
            spinner.addEventListener('animationiteration', spinComplete);
        });
    }

    componentWillLoad() {
        this.loadIcon(this.icon);
    }

    @Watch('icon')
    onIconChange(icon: string, previousIcon: string) {
        if (icon !== previousIcon) {
            this.loadIcon(this.icon);
        }
    }

    render() {
        const Component = this.Component;

        return (
            <Component
                aria-hidden={'true'}
                focusable={'false'}
                role={'img'}
                height={this.size}
                width={this.size}
                class={{
                    spin: this.spin || this.icon === 'spinner',
                    antiClockwise: this.spinDirection === 'antiClockwise',
                }}
                transform={
                    this.angle !== 0 ? `rotate(${this.angle})` : undefined
                }
            />
        );
    }

    private loadIcon = async (name: string) => {
        if (!iconStore.has(name)) {
            logger.log.once(
                `Unknown icon: '${name}'`,
                'Please add it to iconStore.',
            );
            return;
        }

        const component = await iconStore.get(name);

        this.Component = component;
    };
}
