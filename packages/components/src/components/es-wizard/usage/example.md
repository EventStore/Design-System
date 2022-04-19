```tsx wizard-example.tsx
import { h, Component, State, Fragment } from '@stencil/core';
import { createValidatedForm } from '@eventstore/forms';
import { WizardPage, toast } from '@eventstore/components';
import { nextFrame } from 'helpers';

@Component({
    tag: 'wizard-example',
    styleUrl: 'wizard-example.css',
    shadow: true,
})
export class WizardExample {
    @State() location = 'user_details';

    private userDetails = createValidatedForm<UserDetails>({
        fullName: '',
        email: '',
        message: {
            initialValue: '',
            optional: true,
        },
    });

    private billingDetails = createValidatedForm<BillingDetails>({
        billingAddress: '',
        billingCompanyName: '',
        billingEmail: '',
    });

    private form = createValidatedForm<ProvisioningRequest>({
        user: this.userDetails,
        billing: this.billingDetails,
    });

    componentWillLoad() {
        this.userDetails.onBeforeFocus(async () => {
            this.location = 'user_details';
            await nextFrame();
        });
        this.billingDetails.onBeforeFocus(async () => {
            this.location = 'billing_details';
            await nextFrame();
        });
    }

    render() {
        return (
            <>
                <es-wizard location={this.location} pages={this.pages}>
                    {/* user_details */}
                    <es-input
                        label={'Name'}
                        placeholder={'Your name'}
                        slot={'user_details'}
                        {...this.form.connect('user', 'fullName')}
                    />
                    <es-input
                        label={'Email'}
                        placeholder={'Your contact email'}
                        slot={'user_details'}
                        {...this.form.connect('user', 'email')}
                    />
                    <es-textarea
                        label={'Message'}
                        placeholder={'Tell us about your project'}
                        slot={'user_details'}
                        {...this.form.connect('user', 'message')}
                    />
                    {/* billing_details */}
                    <es-input
                        label={'Company name'}
                        placeholder={'The name of your company for invoices'}
                        slot={'billing_details'}
                        {...this.form.connect('billing', 'billingCompanyName')}
                    />
                    <es-input
                        label={'Billing address'}
                        placeholder={'The address of your company for invoices'}
                        slot={'billing_details'}
                        {...this.form.connect('billing', 'billingAddress')}
                    />
                    <es-input
                        label={'Billing Email'}
                        placeholder={'The email address to send invoices to'}
                        slot={'billing_details'}
                        {...this.form.connect('billing', 'billingEmail')}
                    />
                </es-wizard>
                <footer>
                    {this.location === 'user_details' && (
                        <es-button
                            variant={'outline'}
                            color={'secondary'}
                            slot={'footer'}
                            onClick={() => {
                                this.location = 'billing_details';
                            }}
                            disabled={this.form.frozen}
                        >
                            {'Next'}
                            <es-icon
                                icon={'chevron'}
                                angle={270}
                                size={18}
                                slot={'after'}
                            />
                        </es-button>
                    )}
                    {this.location === 'billing_details' && (
                        <>
                            <es-button
                                variant={'outline'}
                                color={'primary'}
                                slot={'footer'}
                                onClick={() => {
                                    this.location = 'user_details';
                                }}
                            >
                                <es-icon
                                    icon={'chevron'}
                                    angle={90}
                                    size={18}
                                    class={'create'}
                                    slot={'before'}
                                />
                                {'Back'}
                            </es-button>
                            <es-button
                                variant={'outline'}
                                color={'secondary'}
                                slot={'footer'}
                                onClick={() => {
                                    this.form.submit(async (data) => {
                                        toast.success({
                                            icon: 'head',
                                            title: `Thank you ${data.user.fullName}`,
                                            message: 'This form goes nowhere.',
                                        });
                                    });
                                }}
                                disabled={this.form.frozen}
                            >
                                {'Submit form'}
                            </es-button>
                        </>
                    )}
                </footer>
            </>
        );
    }

    private pages: WizardPage[] = [
        {
            id: 'user_details',
            title: 'User Details',
        },
        {
            id: 'billing_details',
            title: 'Billing Details',
        },
    ];
}
```

```css wizard-example.css
footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px 0;
}

footer es-button {
    margin-left: 20px;
}
```

```tsx hidden
export default () => <wizard-example />;
```

```css hidden

```
