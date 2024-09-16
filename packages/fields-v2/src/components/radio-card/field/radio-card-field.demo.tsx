import { Component, h, Host } from '@stencil/core';
import { createValidatedForm } from '@eventstore-ui/forms';
import type { RadioCardOption } from '../types';
import { ICON_NAMESPACE } from 'icons/namespace';

interface Example {
    size: string | null;
    topology: string | null;
}

const sizes: RadioCardOption[] = [
    {
        name: 'F1',
        value: 'f1',
        tag: 'micro',
        description: '2 vCPU 2GB mem',
    },
    {
        name: 'C4',
        value: 'c4',
        tag: 'development',
        description: '2 vCPU 4GB mem',
    },
    {
        name: 'M8',
        value: 'm8',
        tag: 'development',
        description: '2 vCPU 8GB mem',
    },
    {
        name: 'M16',
        value: 'm16',
        tag: 'production',
        description: '4 vCPU 16GB mem',
    },
    {
        name: 'M32',
        value: 'm32',
        tag: 'production',
        disabled: true,
        description: '8 vCPU 32GB mem',
    },
    {
        name: 'M64',
        value: 'm64',
        tag: 'production',
        description: '16 vCPU 64GB mem',
    },
    {
        name: 'M128',
        value: 'm128',
        tag: 'production',
        description: '32 vCPU 128GB mem',
    },
];

const topologies: RadioCardOption[] = [
    {
        value: 'single-node',
        name: 'Single Node',
        icon: [ICON_NAMESPACE, 'error'],
    },
    {
        value: 'three-node-multi-zone',
        name: 'Three Node Multi Zone',
        icon: [ICON_NAMESPACE, 'warning'],
    },
];

/** radio-card-field demo. */
@Component({
    tag: 'radio-card-field-demo',
    shadow: true,
})
export class Demo {
    private form = createValidatedForm<Example>({
        size: null,
        topology: null,
    });

    render() {
        return (
            <Host style={{ padding: '10px', display: 'block' }}>
                <style>
                    {`
                    f2-radio-card-field::part(card-icon) {
                        transition: color ease 500ms;
                        color: orange;
                    }
                    f2-radio-card-field::part(card-icon active) {
                        color: green;
                    }
                    
                    `}
                </style>
                <form
                    onSubmit={this.onSubmit}
                    style={{
                        display: 'flex',
                        'flex-direction': 'column',
                        gap: '12px',
                    }}
                >
                    <f2-radio-card-field
                        label={'Instance Size'}
                        options={sizes}
                        groupBy={'tag'}
                        {...this.form.connect('size')}
                    />

                    <f2-radio-card-field
                        label={'Topology'}
                        options={topologies}
                        cardParts={['card-icon', 'active']}
                        renderCard={(_, option, active) => (
                            <div
                                style={{
                                    display: 'flex',
                                    'flex-direction': 'column',
                                    'align-items': 'center',
                                    gap: '12px',
                                }}
                            >
                                <es-icon
                                    icon={option.icon}
                                    size={40}
                                    part={`card-icon ${active ? 'active' : ''}`}
                                />
                                <span class={'name'}>{option.name}</span>
                            </div>
                        )}
                        {...this.form.connect('topology')}
                    />
                    <pre slot={'data'}>
                        {JSON.stringify(this.form.data, null, 2)}
                    </pre>
                    <button>{'submit'}</button>
                </form>
            </Host>
        );
    }

    private onSubmit = (e: Event) => {
        e.preventDefault();

        // eslint-disable-next-line no-console
        console.log(new FormData(e.target as HTMLFormElement));
    };
}
