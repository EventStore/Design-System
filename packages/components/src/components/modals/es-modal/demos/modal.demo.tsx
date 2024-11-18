import { Component, h } from '@stencil/core';
import { ICON_NAMESPACE } from '../../../../icons/namespace';

const token = 'abc-123-cde';

/**
 * Modal
 * @group Modals
 */
@Component({
    tag: 'es-modal-demo',
    styleUrl: './modal-demo.css',
    shadow: true,
})
export class Demo {
    render() {
        return (
            <es-modal role={'alert'}>
                <h2 slot={'header'}>{'Successfully created a new'}</h2>
                <h1 slot={'header'}>{'Refresh token'}</h1>
                <f2-text-input
                    readonly
                    class={'token'}
                    placeholder={'token'}
                    name={'token'}
                    value={token}
                    inputProps={{
                        onFocus(e: FocusEvent) {
                            (e.target as HTMLInputElement).select();
                        },
                    }}
                >
                    <es-thinking-button
                        defaultIcon={[ICON_NAMESPACE, 'copy']}
                        text={'Copy'}
                        action={(e) => {
                            e.preventDefault();
                            return navigator.clipboard.writeText(token);
                        }}
                        variant={'outline'}
                        color={'secondary'}
                    />
                </f2-text-input>
                <b class={'copy_warning'}>
                    <es-icon icon={[ICON_NAMESPACE, 'critical']} />
                    {"Be sure to copy your new token. It won't be shown again."}
                </b>
                <es-button
                    variant={'filled'}
                    color={'secondary'}
                    slot={'footer'}
                >
                    {'Done'}
                </es-button>
            </es-modal>
        );
    }
}
