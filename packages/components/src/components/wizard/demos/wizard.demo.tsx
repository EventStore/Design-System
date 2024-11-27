import { h, Component, State, Fragment, Host } from '@stencil/core';
import '@kurrent-ui/fields';
import { createValidatedForm } from '@kurrent-ui/forms';
import { type WizardPage, toast } from '../../../';
import { ICON_NAMESPACE } from '../../../icons/namespace';

interface UserDetails {
    fullName: string;
    email: string;
    message: string;
}

interface BillingDetails {
    billingAddress: string;
    billingCompanyName: string;
    billingEmail: string;
}

interface ProvisioningRequest {
    user: UserDetails;
    billing: BillingDetails;
}

function nextFrame() {
    return new Promise((r) => requestAnimationFrame(r));
}

/** Wizard */
@Component({
    tag: 'wizard-demo',
    styleUrl: './wizard-demo.css',
    shadow: true,
})
export class Demo {
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
            <Host>
                <c2-wizard location={this.location} pages={this.pages}>
                    <f2-form slot={'user_details'}>
                        <f2-text-field
                            label={'Name'}
                            placeholder={'Your name'}
                            {...this.form.connect('user', 'fullName')}
                        />
                        <f2-text-field
                            label={'Email'}
                            placeholder={'Your contact email'}
                            {...this.form.connect('user', 'email')}
                        />
                        <f2-textarea-field
                            label={'Message'}
                            placeholder={'Tell us about your project'}
                            {...this.form.connect('user', 'message')}
                        />
                    </f2-form>
                    <f2-form slot={'billing_details'}>
                        <f2-text-field
                            label={'Company name'}
                            placeholder={
                                'The name of your company for invoices'
                            }
                            {...this.form.connect(
                                'billing',
                                'billingCompanyName',
                            )}
                        />
                        <f2-text-field
                            label={'Billing address'}
                            placeholder={
                                'The address of your company for invoices'
                            }
                            {...this.form.connect('billing', 'billingAddress')}
                        />
                        <f2-text-field
                            label={'Billing Email'}
                            placeholder={
                                'The email address to send invoices to'
                            }
                            {...this.form.connect('billing', 'billingEmail')}
                        />
                    </f2-form>
                </c2-wizard>
                <footer>
                    {this.location === 'user_details' && (
                        <c2-button
                            variant={'outline'}
                            color={'secondary'}
                            slot={'footer'}
                            onClick={() => {
                                this.location = 'billing_details';
                            }}
                            disabled={this.form.frozen}
                        >
                            {'Next'}
                            <c2-icon
                                icon={[ICON_NAMESPACE, 'chevron']}
                                angle={270}
                                size={18}
                                slot={'after'}
                            />
                        </c2-button>
                    )}
                    {this.location === 'billing_details' && (
                        <>
                            <c2-button
                                variant={'outline'}
                                color={'primary'}
                                slot={'footer'}
                                onClick={() => {
                                    this.location = 'user_details';
                                }}
                            >
                                <c2-icon
                                    icon={[ICON_NAMESPACE, 'chevron']}
                                    angle={90}
                                    size={18}
                                    class={'create'}
                                    slot={'before'}
                                />
                                {'Back'}
                            </c2-button>
                            <c2-button
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
                            </c2-button>
                        </>
                    )}
                </footer>
            </Host>
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
