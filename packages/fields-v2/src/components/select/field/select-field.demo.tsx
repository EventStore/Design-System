import { Component, h, Host } from '@stencil/core';

import { createValidatedForm } from '@eventstore-ui/forms';
import { ICON_NAMESPACE } from 'icons/namespace';

interface Example {
    something: string;
    somethingElse: string | null;
}

/** select-field demo. */
@Component({
    tag: 'select-field-demo',
    shadow: true,
})
export class Demo {
    private form = createValidatedForm<Example>({
        something: 'check',
        somethingElse: null,
    });

    private options = [
        {
            name: 'check',
            value: 'check',
        },
        {
            name: 'chevron',
            value: 'chevron',
        },
        {
            name: 'error',
            value: 'error',
        },
        {
            name: 'info',
            value: 'info',
        },
        {
            name: 'plus',
            value: 'plus',
        },
        {
            name: 'trash',
            value: 'trash',
        },
        {
            name: 'warning',
            value: 'warning',
        },
    ];

    render() {
        return (
            <Host style={{ padding: '10px', display: 'block' }}>
                <form onSubmit={this.onSubmit}>
                    <f2-select-field
                        label={'Something Else'}
                        documentation={'This is one is entirely default.'}
                        documentationLink={
                            'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        }
                        placeholder={'Something Else'}
                        options={this.options}
                        {...this.form.connect('somethingElse')}
                    />
                    <f2-select-field
                        label={'Something'}
                        placeholder={'Something'}
                        documentation={'This has a custom renderers.'}
                        documentationLink={
                            'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        }
                        documentationLinkText={"Don't click on this"}
                        renderOption={(h, { name, value }) => (
                            <es-select-option-demo name={name} value={value} />
                        )}
                        renderValue={(h, { name, value }) => (
                            <es-select-option-demo name={name} value={value} />
                        )}
                        options={this.options}
                        {...this.form.connect('something')}
                    />

                    <f2-select-field
                        label={'Something'}
                        placeholder={'Something'}
                        options={this.options}
                        renderOption={(h, { name, value }) => (
                            <es-select-option-demo name={name} value={value} />
                        )}
                        {...this.form.connect('something')}
                    >
                        <span
                            slot={'documentation'}
                            style={{
                                display: 'flex',
                                'align-items': 'center',
                                gap: '8px',
                                color: 'orange',
                            }}
                        >
                            <es-icon
                                size={14}
                                icon={[ICON_NAMESPACE, 'trash']}
                                style={{ color: 'pink' }}
                            />
                            {'I am some special docs'}
                            <es-icon
                                size={14}
                                icon={[ICON_NAMESPACE, 'trash']}
                                style={{ color: 'pink' }}
                            />
                        </span>
                    </f2-select-field>

                    <f2-select-field
                        label={'Something'}
                        placeholder={'Something'}
                        documentation={
                            'This is not where you put something important.'
                        }
                        documentationLink={
                            'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        }
                        documentationLinkText={"Don't click on this"}
                        options={this.options}
                        {...this.form.connect('something')}
                        invalid
                        messages={{
                            error: ["Oh no! It's all wrogn!"],
                            warning: ['You need to fix this...'],
                            info: ['pls'],
                        }}
                    >
                        <es-button>
                            <es-icon icon={[ICON_NAMESPACE, 'trash']} />
                        </es-button>
                    </f2-select-field>

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
