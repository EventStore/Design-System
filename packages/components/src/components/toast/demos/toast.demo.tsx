import { Component, h, Host } from '@stencil/core';
import { K_COMPONENTS_ICON_NAMESPACE, toast } from '../../..';

/** Toast */
@Component({
    tag: 'toast-demo',
    styleUrl: './toast-demo.css',
    shadow: true,
})
export class Demo {
    success = () =>
        toast.success({
            title: 'Well done!',
            message: 'You are a success.',
        });

    info = () =>
        toast.info({
            title: 'For your information:',
            message: 'Clicking this toast will pop another.',
            onClick: this.info,
        });

    warning = () =>
        toast.warning({
            title: 'Warning!',
            message: 'This is a warning',
        });

    error = () =>
        toast.error({
            title: 'Error!',
            message: '500 internal server error',
        });

    clickToClose = async () => {
        const close = await toast.info({
            icon: [K_COMPONENTS_ICON_NAMESPACE, 'spinner'],
            title: 'Long notification',
            message: 'Click to close.',
            duration: 20_000_000,
            onClick: () => close(),
        });
    };

    render() {
        return (
            <Host>
                <c2-button onClick={this.success}>{'Success'}</c2-button>
                <c2-button onClick={this.info}>{'Info'}</c2-button>
                <c2-button onClick={this.warning}>{'Warning'}</c2-button>
                <c2-button onClick={this.error}>{'Error'}</c2-button>
                <c2-button onClick={this.clickToClose}>{'Dismiss'}</c2-button>
            </Host>
        );
    }
}
