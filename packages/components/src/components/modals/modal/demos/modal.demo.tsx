import { Component, Host, h } from '@stencil/core';
import { ICON_NAMESPACE } from '../../../../icons/namespace';

const token = 'abc-123-cde';

/**
 * Modal
 * @group Modals
 */
@Component({
    tag: 'modal-demo',
    styleUrl: './modal-demo.css',
    shadow: true,
})
export class Demo {
    render() {
        return (
            <Host>
                <c2-backdrop showBackdrop />
                <c2-modal role={'alert'}>
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
                        <c2-thinking-button
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
                        <c2-icon icon={[ICON_NAMESPACE, 'exclamation-mark']} />
                        {
                            "Be sure to copy your new token. It won't be shown again."
                        }
                    </b>
                    <c2-button
                        variant={'filled'}
                        color={'secondary'}
                        slot={'footer'}
                    >
                        {'Done'}
                    </c2-button>
                </c2-modal>
            </Host>
        );
    }
}
