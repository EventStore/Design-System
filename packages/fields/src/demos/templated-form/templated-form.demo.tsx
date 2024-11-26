import { Component, State, h } from '@stencil/core';
import { createValidatedForm } from '@kurrent-ui/forms';

import type { FieldChange } from 'types';

const SHARED = 'shared';
const DEDICATED = 'dedicated';

type Infrastructure = typeof SHARED | typeof DEDICATED;
type Provider = 'aws' | 'gcp' | 'azure';

interface CreateDedicatedCluster {
    provider: Provider | null;
    region: string;
    accountId: string;
    peerVPCId: string;
    peerRegion: string;
    peerRoutes: string;
    things: Set<string>;
}

/**
 * Templated form
 * @group examples
 */
@Component({
    tag: 'templated-form-demo',
    styleUrl: 'templated-form.css',
    shadow: true,
})
export class TemplatedFormDemo {
    @State() infrastructure: Infrastructure = 'dedicated';

    private form = createValidatedForm<CreateDedicatedCluster>({
        provider: { initialValue: 'aws', templated: true },
        region: { initialValue: 'sa-east-1', templated: true },
        accountId: { initialValue: '0000000000000000', templated: true },
        peerVPCId: { initialValue: 'abc-123', templated: true },
        peerRegion: { initialValue: 'ap-northeast-1', templated: true },
        peerRoutes: { initialValue: 'localhost:2113', templated: true },
        things: {
            initialValue: new Set(['ap-northeast-1', 'ap-northeast-2']),
            templated: true,
        },
    });

    render() {
        return (
            <f2-form>
                <f2-radio-card-field
                    templated={'no-edit'}
                    label={'Infrastructure'}
                    documentation={'How your cluster should be hosted.'}
                    documentationLink={'example.com'}
                    name={'infrastructure'}
                    options={[
                        { name: 'Dedicated', value: DEDICATED },
                        { name: 'Shared', value: SHARED },
                    ]}
                    value={this.infrastructure}
                    onFieldchange={this.switchInfrastructure}
                />
                <f2-form-section-divider>{'Network'}</f2-form-section-divider>
                <f2-radio-card-field
                    label={'Provider'}
                    documentation={'Where your cluster should be hosted.'}
                    options={[
                        { name: 'AWS', value: 'aws' },
                        { name: 'GCP', value: 'gcp' },
                        { name: 'Azure', value: 'Azure' },
                    ]}
                    {...this.form.connect('provider')}
                >
                    <svg
                        xmlns={'http://www.w3.org/2000/svg'}
                        viewBox={'0 0 300.7 179.8'}
                        height={'50px'}
                        width={'50px'}
                        focusable={'false'}
                        slot={'template'}
                    >
                        <title>{'Amazon Web Services'}</title>
                        <path
                            fill={'#252f3e'}
                            d={
                                'M134.4,175.4a30.3,30.3,0,0,0,1.1,8.9,53.5,53.5,0,0,0,3.2,7.2,4.3,4.3,0,0,1,.7,2.3,4,4,0,0,1-1.9,3l-6.3,4.2a4.8,4.8,0,0,1-2.6.9,4.6,4.6,0,0,1-3-1.4,30.9,30.9,0,0,1-3.6-4.7c-1-1.7-2-3.6-3.1-5.9q-11.7,13.8-29.4,13.8c-8.4,0-15.1-2.4-20-7.2s-7.4-11.2-7.4-19.2,3-15.4,9.1-20.6,14.2-7.8,24.5-7.8a79.2,79.2,0,0,1,10.6.8c3.7.5,7.5,1.3,11.5,2.2v-7.3c0-7.6-1.6-12.9-4.7-16s-8.6-4.6-16.3-4.6A45.5,45.5,0,0,0,86,125.3a79.7,79.7,0,0,0-10.8,3.4,28.7,28.7,0,0,1-3.5,1.3l-1.6.3c-1.4,0-2.1-1-2.1-3.1v-4.9a6.3,6.3,0,0,1,.7-3.5,7.5,7.5,0,0,1,2.8-2.1,57.6,57.6,0,0,1,12.6-4.5,60.6,60.6,0,0,1,15.6-1.9c11.9,0,20.6,2.7,26.2,8.1s8.3,13.6,8.3,24.6v32.4ZM93.8,190.6a32.4,32.4,0,0,0,10.3-1.8,22.3,22.3,0,0,0,9.5-6.4A15.9,15.9,0,0,0,117,176a35.9,35.9,0,0,0,1-8.7v-4.2a83.5,83.5,0,0,0-9.2-1.7,75.4,75.4,0,0,0-9.4-.6c-6.7,0-11.6,1.3-14.9,4s-4.9,6.5-4.9,11.5,1.2,8.2,3.7,10.6S89.2,190.6,93.8,190.6Zm80.3,10.8a5.6,5.6,0,0,1-3.8-1,8.2,8.2,0,0,1-2.1-3.9l-23.5-77.3a17.5,17.5,0,0,1-.9-4,2.2,2.2,0,0,1,2.4-2.5H156c1.9,0,3.2.3,3.9,1s1.4,2,2,3.9l16.8,66.2,15.6-66.2c.5-2,1.1-3.3,1.9-3.9a6.9,6.9,0,0,1,4-1h8c1.9,0,3.2.3,4,1a6.7,6.7,0,0,1,1.9,3.9l15.8,67,17.3-67a8.6,8.6,0,0,1,2-3.9,6.5,6.5,0,0,1,3.9-1h9.3a2.2,2.2,0,0,1,2.5,2.5,10,10,0,0,1-.2,1.6,14.2,14.2,0,0,1-.7,2.5l-24.1,77.3q-.9,3-2.1,3.9a6.4,6.4,0,0,1-3.8,1h-8.6c-1.9,0-3.2-.3-4-1a7.1,7.1,0,0,1-1.9-4L204,132l-15.4,64.4a7.8,7.8,0,0,1-1.9,4,6.2,6.2,0,0,1-4,1Zm128.5,2.7a66.2,66.2,0,0,1-15.4-1.8c-5-1.2-8.9-2.5-11.5-4a7.2,7.2,0,0,1-3.1-2.8,7.1,7.1,0,0,1-.6-2.8v-5.1c0-2.1.8-3.1,2.3-3.1a5.7,5.7,0,0,1,1.8.3l2.5,1a54.4,54.4,0,0,0,11,3.5,60.1,60.1,0,0,0,11.9,1.2c6.3,0,11.2-1.1,14.6-3.3a10.8,10.8,0,0,0,5.2-9.5,9.7,9.7,0,0,0-2.7-7c-1.8-1.9-5.2-3.6-10.1-5.2L294,161c-7.3-2.3-12.7-5.7-16-10.2a23.8,23.8,0,0,1-5-14.5,22.3,22.3,0,0,1,2.7-11.1,25.7,25.7,0,0,1,7.2-8.2,31.7,31.7,0,0,1,10.4-5.2,43.6,43.6,0,0,1,12.6-1.7,50.2,50.2,0,0,1,6.7.4l6.5,1.1,5.7,1.6A21.8,21.8,0,0,1,329,115a8.6,8.6,0,0,1,3,2.5,5.4,5.4,0,0,1,.9,3.3v4.7c0,2.1-.8,3.2-2.3,3.2a10.4,10.4,0,0,1-3.8-1.2,45.7,45.7,0,0,0-19.2-3.9c-5.7,0-10.2.9-13.3,2.8s-4.7,4.8-4.7,8.9a9.4,9.4,0,0,0,3,7.1c2,1.9,5.7,3.8,11,5.5l14.2,4.5c7.2,2.3,12.4,5.5,15.5,9.6a22.6,22.6,0,0,1,4.6,14,25.7,25.7,0,0,1-2.6,11.6,26.9,26.9,0,0,1-7.3,8.8,32.2,32.2,0,0,1-11.1,5.6A47.6,47.6,0,0,1,302.6,204.1Z'
                            }
                            transform={'translate(-49.7 -110.1)'}
                        />
                        <path
                            fill={'#f90'}
                            d={
                                'M321.5,252.7c-32.9,24.3-80.7,37.2-121.8,37.2-57.6,0-109.5-21.3-148.7-56.7-3.1-2.8-.3-6.6,3.4-4.4,42.4,24.6,94.7,39.5,148.8,39.5a296.9,296.9,0,0,0,113.5-23.2C322.2,242.6,326.9,248.7,321.5,252.7Zm13.7-15.6c-4.2-5.4-27.8-2.6-38.5-1.3-3.2.4-3.7-2.4-.8-4.5,18.8-13.2,49.7-9.4,53.3-5s-1,35.4-18.6,50.2c-2.7,2.3-5.3,1.1-4.1-1.9C330.5,264.7,339.4,242.4,335.2,237.1Z'
                            }
                            transform={'translate(-49.7 -110.1)'}
                        />
                    </svg>
                </f2-radio-card-field>
                <f2-select-field
                    label={'Region'}
                    documentation={
                        'Choose a region close to yourself or application.'
                    }
                    placeholder={'Select a region'}
                    options={this.regions}
                    {...this.form.connect('region')}
                />
                <f2-form-section-divider>{'Peering'}</f2-form-section-divider>
                <f2-masked-text-field
                    label={'Peer AWS Account ID'}
                    documentation={
                        'The account ID of the AWS network you want to peer to.'
                    }
                    documentationLink={'example.com'}
                    placeholder={'____-____-____'}
                    mask={{
                        mask: '0000-0000-0000',
                        unmask: true,
                    }}
                    {...this.form.connect('accountId')}
                />
                <f2-multi-checkbox-field
                    label={'Select your things'}
                    documentation={'What things would you like to see?'}
                    options={this.regions}
                    {...this.form.connect('things')}
                />
                <f2-text-field
                    label={'peerVPCId'}
                    placeholder={''}
                    {...this.form.connect('peerVPCId')}
                />
                <f2-text-field
                    label={'peerRegion'}
                    placeholder={''}
                    {...this.form.connect('peerRegion')}
                />
                <f2-text-field
                    label={'peerRoutes'}
                    placeholder={''}
                    {...this.form.connect('peerRoutes')}
                />
            </f2-form>
        );
    }

    private switchInfrastructure = (e: CustomEvent<FieldChange<string>>) => {
        this.infrastructure = e.detail.value as Infrastructure;
    };

    private regions = [
        { value: 'ap-northeast-1', name: 'Asia Pacific (Tokyo)' },
        { value: 'ap-northeast-2', name: 'Asia Pacific (Seoul)' },
        { value: 'ap-south-1', name: 'Asia Pacific (Mumbai)' },
        { value: 'ap-southeast-1', name: 'Asia Pacific (Singapore)' },
        { value: 'ap-southeast-2', name: 'Asia Pacific (Sydney)' },
        { value: 'ca-central-1', name: 'Canada (Central)' },
        { value: 'eu-central-1', name: 'Europe (Frankfurt)' },
        { value: 'eu-north-1', name: 'Europe (Stockholm)' },
        { value: 'eu-west-1', name: 'Europe (Ireland)' },
        { value: 'eu-west-2', name: 'Europe (London)' },
        { value: 'eu-west-3', name: 'Europe (Paris)' },
        { value: 'sa-east-1', name: 'South America (São Paulo)' },
        { value: 'us-east-1', name: 'US East (N. Virginia)' },
        { value: 'us-east-2', name: 'US East (Ohio)' },
        { value: 'us-west-1', name: 'US West (N. California)' },
        { value: 'us-west-2', name: 'US West (Oregon)' },
    ];
}
