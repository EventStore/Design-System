import { Component, h, State } from '@stencil/core';
import { router } from '@eventstore-ui/router';
import type { TableCells } from '../../tables/types';
import { ICON_NAMESPACE } from '../../../icons/namespace';
import { toast } from '../../../utils/toast';

interface DummyData {
    name: string;
    nationality: string;
    bloodType: string;
    age: number;
}

/** Basic es-table demo. */
@Component({
    tag: 'es-actions-demo',
    styleUrl: './actions-demo.css',
    shadow: true,
})
export class LoadingTextDemo {
    @State() data: DummyData[] = [
        {
            name: 'Evgenija Seabrook',
            nationality: 'Macedonian',
            bloodType: 'O-',
            age: 7,
        },
        {
            name: 'Iapetus Robertsson',
            nationality: 'Greek',
            bloodType: 'O+',
            age: 12,
        },
        {
            name: 'Yumi Samara',
            nationality: 'Japanese',
            bloodType: 'A+',
            age: 29,
        },
        {
            name: 'Cai Ó Fallamháin',
            nationality: 'Irish',
            bloodType: 'A-',
            age: 94,
        },
    ];

    componentWillLoad() {
        router.init({
            root: '/es-actions-demo',
        });
    }

    render() {
        return (
            <es-table
                cells={this.cells}
                rows={this.data}
                linkRowTo={() => '#'}
                rowClass={() => 'selectable'}
            />
        );
    }

    private cells: TableCells<DummyData> = {
        name: {
            title: 'Name',
        },
        nationality: {
            title: 'Nationality',
        },
        bloodType: {
            title: 'Blood Type',
        },
        age: {
            title: 'Age',
        },
        actions: {
            title: 'Actions',
            variant: 'no-pad',
            width: 'max-content',
            cell: (h, { data: { name } }) => (
                <es-actions>
                    <es-action
                        icon={[ICON_NAMESPACE, 'lightbulb']}
                        action={() =>
                            toast.success({
                                title: name,
                                message: 'Generic action clicked',
                            })
                        }
                    >
                        {'Generic action'}
                    </es-action>
                    <es-action-link
                        url={'/cheese'}
                        icon={[ICON_NAMESPACE, 'chevron-double']}
                    >
                        {'Link action'}
                    </es-action-link>
                    <es-action-copy
                        value={name}
                        toast={{
                            title: 'Copied!',
                            message: 'Successfully copied name to clipboard',
                        }}
                    >
                        {'Copy name'}
                    </es-action-copy>
                    <es-action-delete
                        description={name}
                        deleteItem={this.deleteItem(name)}
                        modalText={{
                            preHeading: 'Name',
                            heading: name,
                            body: 'Deleting this person will remove them from your organization. This operation cannot be undone.',
                            warning:
                                'Are you sure you want to proceed in deleting this person?',
                            confirm: 'Delete person',
                        }}
                        toast={{
                            title: 'Group deleted',
                            message: `Successfully deleted ${name}`,
                        }}
                    />

                    <es-action-dropdown>
                        <es-action
                            dropdownItem
                            icon={[ICON_NAMESPACE, 'lightbulb']}
                            action={() =>
                                toast.success({
                                    title: name,
                                    message:
                                        'Generic action in dropdown clicked',
                                })
                            }
                        >
                            {'Generic action'}
                        </es-action>
                        <es-action-link
                            dropdownItem
                            url={'/cheese'}
                            icon={[ICON_NAMESPACE, 'chevron-double']}
                        >
                            {'Link action'}
                        </es-action-link>
                        <es-action-copy
                            dropdownItem
                            value={name}
                            toast={{
                                title: 'Copied!',
                                message:
                                    'Successfully copied name to clipboard',
                            }}
                        >
                            {'Copy name'}
                        </es-action-copy>
                        <es-action-delete
                            dropdownItem
                            description={name}
                            deleteItem={this.deleteItem(name)}
                            modalText={{
                                preHeading: 'Name',
                                heading: name,
                                body: 'Deleting this person will remove them from your organization. This operation cannot be undone.',
                                warning:
                                    'Are you sure you want to proceed in deleting this person?',
                                confirm: 'Delete person',
                            }}
                            toast={{
                                title: 'Group deleted',
                                message: `Successfully deleted ${name}`,
                            }}
                        />
                    </es-action-dropdown>
                </es-actions>
            ),
        },
    };

    private deleteItem = (name: string) => async () => {
        this.data = [...this.data.filter((p) => p.name !== name)];
    };
}
