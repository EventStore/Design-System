import { Component, h, Host } from '@stencil/core';

import { createValidatedForm } from '@eventstore-ui/forms';
import { ICON_NAMESPACE } from 'icons/namespace';

interface Example {
    something: string;
    option: boolean;
    somethingElse: string;
}

/** masked-text-field demo. */
@Component({
    tag: 'masked-text-field-demo',
    shadow: true,
})
export class Demo {
    private form = createValidatedForm<Example>({
        something: '',
        option: false,
        somethingElse: '',
    });

    render() {
        return (
            <Host style={{ padding: '10px', display: 'block' }}>
                <form onSubmit={this.onSubmit}>
                    <f2-masked-text-field
                        label={'Something Else'}
                        documentation={
                            'This is where you put something important.'
                        }
                        documentationLink={
                            'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        }
                        placeholder={'Something Else'}
                        mask={{ mask: '{#}000[aaa]/NIC-`*[**]' }}
                        {...this.form.connect('somethingElse')}
                    />
                    <f2-masked-text-field
                        label={'Something'}
                        placeholder={'Something'}
                        documentation={
                            'This is not where you put something important.'
                        }
                        documentationLink={
                            'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        }
                        documentationLinkText={"Don't click on this"}
                        mask={{
                            mask: 'Ple\\ase fill ye\\ar: 19YY',
                            lazy: false,
                            blocks: {
                                YY: {
                                    mask: '00',
                                },
                            },
                        }}
                        {...this.form.connect('something')}
                    />

                    <f2-masked-text-field
                        label={'Something'}
                        placeholder={'Something'}
                        mask={{ mask: '{#}000[aaa]/NIC-`*[**]', lazy: false }}
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
                    </f2-masked-text-field>

                    <f2-masked-text-field
                        label={'Something'}
                        placeholder={'Something'}
                        documentation={
                            'This is not where you put something important.'
                        }
                        documentationLink={
                            'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        }
                        documentationLinkText={"Don't click on this"}
                        mask={{ mask: '{#}000[aaa]/NIC-`*[**]' }}
                        {...this.form.connect('something')}
                        invalid
                        messages={{
                            error: ["Oh no! It's all wrogn!"],
                            warning: ['You need to fix this...'],
                            info: ['pls'],
                        }}
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
