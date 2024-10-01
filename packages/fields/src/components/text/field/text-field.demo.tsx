import { Component, h, Host } from '@stencil/core';

import { createValidatedForm } from '@eventstore-ui/forms';
import { ICON_NAMESPACE } from 'icons/namespace';

interface Example {
    something: string;
    option: boolean;
    somethingElse: string;
}

/**
 * text-field
 * @group fields
 */
@Component({
    tag: 'text-field-demo',
    shadow: true,
})
export class Demo {
    private form = createValidatedForm<Example>({
        something: 'some',
        option: false,
        somethingElse: '',
    });

    render() {
        return (
            <Host style={{ padding: '10px', display: 'block' }}>
                <f2-form onSubmit={this.onSubmit}>
                    <f2-text-field
                        label={'Something Else'}
                        documentation={
                            'This is where you put something important.'
                        }
                        documentationLink={
                            'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        }
                        placeholder={'Something Else'}
                        {...this.form.connect('somethingElse')}
                    />
                    <f2-text-field
                        label={'Something'}
                        placeholder={'Something'}
                        documentation={
                            'This is not where you put something important.'
                        }
                        documentationLink={
                            'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        }
                        documentationLinkText={"Don't click on this"}
                        {...this.form.connect('something')}
                    />

                    <f2-text-field
                        label={'Something'}
                        placeholder={'Something'}
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
                    </f2-text-field>

                    <f2-text-field
                        label={'Something'}
                        placeholder={'Something'}
                        documentation={
                            'This is not where you put something important.'
                        }
                        documentationLink={
                            'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        }
                        documentationLinkText={"Don't click on this"}
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
                    </f2-text-field>

                    <pre slot={'data'}>
                        {JSON.stringify(this.form.data, null, 2)}
                    </pre>
                    <button>{'submit'}</button>
                </f2-form>
            </Host>
        );
    }

    private onSubmit = (e: Event) => {
        e.preventDefault();

        // eslint-disable-next-line no-console
        console.log(new FormData(e.target as HTMLFormElement));
    };
}
