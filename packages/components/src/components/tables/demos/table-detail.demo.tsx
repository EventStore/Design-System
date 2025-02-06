import { Component, h, Host, State } from '@stencil/core';

import type { TableCells } from '../types';

interface DummyData {
    name: string;
    value: string;
    amount: number;

    eventSource: string;
    groupName?: string;
    resolveLinkTos: boolean;
    startFrom: string;
    messageTimeoutMilliseconds: number;
    extraStatistics: boolean;
    maxRetryCount: number;
    liveBufferSize: number;
    bufferSize: number;
    readBatchSize: number;
    checkPointAfterMilliseconds: number;
    minCheckPointCount: number;
    maxCheckPointCount: number;
    maxSubscriberCount: number;
    namedConsumerStrategy: string;
}

/**
 * Table Detail
 * @group Tables
 */
@Component({
    tag: 'table-detail-basic-demo',
    styleUrl: './table-basic.css',
    shadow: true,
})
export class TableDetailDemo {
    @State() data: DummyData = {
        name: 'test',
        value: 'something here',
        amount: 12,
        eventSource: 'my_stream',
        groupName:
            'my_group_has_a_very_long_name_so_I_have_been_set_to_full_width',
        resolveLinkTos: true,
        startFrom: '',
        messageTimeoutMilliseconds: 1000,
        extraStatistics: true,
        maxRetryCount: 12,
        liveBufferSize: 200,
        bufferSize: 10,
        readBatchSize: 20,
        checkPointAfterMilliseconds: 1000,
        minCheckPointCount: 5,
        maxCheckPointCount: 20,
        maxSubscriberCount: 100,
        namedConsumerStrategy: 'RoundRobin',
    };

    render() {
        return (
            <Host>
                <c2-table-detail-header
                    titleCell={'name'}
                    data={this.data}
                    cells={this.cells}
                />
                <c2-table-detail data={this.data} cells={this.cells} />
            </Host>
        );
    }

    private cells: TableCells<DummyData> = {
        name: {
            title: 'Name',
        },
        value: {
            title: 'Value',
            cell: (h, { data }) => (
                <div class={'some_class'}>
                    <h1>{data.amount}</h1>
                </div>
            ),
        },
        amount: {
            title: 'Amount',
            width: 'max-content',
            class: ({ amount }) => ({
                amount: true,
                large: amount >= 10,
            }),
        },

        eventSource: {
            title: 'Event Source',
        },
        groupName: {
            title: 'Group Name',
            variant: 'full-width',
        },
        resolveLinkTos: {
            title: 'Resolve Links',
        },
        startFrom: {
            title: 'Start From',
        },
        messageTimeoutMilliseconds: {
            title: 'Message Timeout',
        },
        extraStatistics: {
            title: 'Extra Statistics',
        },
        maxRetryCount: {
            title: 'Max Retry Count',
        },
        liveBufferSize: {
            title: 'Live Buffer Size',
        },
        bufferSize: {
            title: 'Buffer Size',
        },
        readBatchSize: {
            title: 'Read Batch Size',
        },
        checkPointAfterMilliseconds: {
            title: 'Checkpoint After',
            cell: (_, { data }) => `${data.checkPointAfterMilliseconds}ms`,
        },
        minCheckPointCount: {
            title: 'Min Checkpoint Count',
        },
        maxCheckPointCount: {
            title: 'Max Checkpoint Count',
        },
        maxSubscriberCount: {
            title: 'Max Subscriber Count',
        },
        namedConsumerStrategy: {
            title: 'Named Consumer Strategy',
        },

        actions: {
            title: 'Amount',
            cell: (h) => <c2-button>{'Hello'}</c2-button>,
        },
    };
}
