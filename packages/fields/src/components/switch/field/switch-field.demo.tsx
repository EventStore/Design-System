import { Component, h, Host } from '@stencil/core';

import { createValidatedForm } from '@kurrent-ui/forms';
import { ICON_NAMESPACE } from 'icons/namespace';

interface Example {
    something: boolean;
    somethingElse: boolean;
}

/**
 * switch-field
 * @group fields
 */
@Component({
    tag: 'switch-field-demo',
    shadow: true,
})
export class Demo {
    private form = createValidatedForm<Example>({
        something: true,
        somethingElse: false,
    });

    render() {
        return (
            <Host style={{ padding: '10px', display: 'block' }}>
                <f2-form onSubmit={this.onSubmit}>
                    <f2-switch-field
                        label={'Something Else'}
                        documentation={'This is one is entirely default.'}
                        documentationLink={
                            'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        }
                        {...this.form.connect('somethingElse')}
                    />
                    <f2-switch-field
                        label={'Something'}
                        documentation={'This has some text passed as a child.'}
                        documentationLink={
                            'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
                        }
                        documentationLinkText={"Don't click on this"}
                        {...this.form.connect('something')}
                    >
                        {'Hello. I have passed some text as a child.'}
                    </f2-switch-field>

                    <f2-switch-field
                        label={'Something'}
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
                            <c2-icon
                                size={14}
                                icon={[ICON_NAMESPACE, 'trash']}
                                style={{ color: 'pink' }}
                            />
                            {'I am some special docs'}
                            <c2-icon
                                size={14}
                                icon={[ICON_NAMESPACE, 'trash']}
                                style={{ color: 'pink' }}
                            />
                        </span>
                    </f2-switch-field>

                    <f2-switch-field
                        label={'Something'}
                        documentation={
                            'This one has a slotted button, for whatever reason.'
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
                        <c2-button>
                            <c2-icon icon={[ICON_NAMESPACE, 'trash']} />
                        </c2-button>
                    </f2-switch-field>

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
