import { Component, h, State } from '@stencil/core';
import { router } from '@kurrent-ui/router';
import type { TableCells } from '../../tables/types';
import { ICON_NAMESPACE } from '../../../icons/namespace';
import { toast } from '../../../utils/toast';
import { ActionDelete } from '../ActionDelete';
import { ActionCopy } from '../ActionCopy';

interface DummyData {
    name: string;
    nationality: string;
    bloodType: string;
    age: number;
}

/** Actions */
@Component({
    tag: 'actions-demo',
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
            root: '/actions-demo',
        });
    }

    render() {
        return (
            <c2-table
                cells={this.cells}
                rows={this.data}
                getRowKey={({ name }) => name}
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
                <c2-actions>
                    <c2-action
                        icon={[ICON_NAMESPACE, 'info']}
                        action={() =>
                            toast.success({
                                title: name,
                                message: 'Generic action clicked',
                            })
                        }
                    >
                        {'Generic action'}
                    </c2-action>
                    <c2-action-link
                        url={'/cheese'}
                        icon={[ICON_NAMESPACE, 'chevron-double']}
                    >
                        {'Link action'}
                    </c2-action-link>
                    <ActionCopy
                        value={name}
                        toast={{
                            title: 'Copied!',
                            message: 'Successfully copied name to clipboard',
                        }}
                    >
                        {'Copy name'}
                    </ActionCopy>
                    <ActionDelete
                        typeToConfirm
                        description={name}
                        deleteItem={this.deleteItem(name)}
                        modal={{
                            preHeading: 'Name',
                            heading: name,
                            body: 'Deleting this person will remove them from your organization. This operation cannot be undone.',
                            warning:
                                'Are you sure you want to proceed in deleting this person?',
                            confirm: 'Delete person',
                        }}
                        toast={{
                            title: 'Person deleted',
                            message: `Successfully deleted ${name}`,
                        }}
                    />

                    <c2-action-dropdown>
                        <c2-action
                            dropdownItem
                            icon={[ICON_NAMESPACE, 'info']}
                            action={() =>
                                toast.success({
                                    title: name,
                                    message:
                                        'Generic action in dropdown clicked',
                                })
                            }
                        >
                            {'Generic action'}
                        </c2-action>
                        <c2-action-link
                            dropdownItem
                            url={'/cheese'}
                            icon={[ICON_NAMESPACE, 'chevron-double']}
                        >
                            {'Link action'}
                        </c2-action-link>
                        <ActionCopy
                            dropdownItem
                            value={name}
                            toast={{
                                title: 'Copied!',
                                message:
                                    'Successfully copied name to clipboard',
                            }}
                        >
                            {'Copy name'}
                        </ActionCopy>
                        <ActionDelete
                            dropdownItem
                            description={name}
                            deleteItem={this.deleteItem(name)}
                            modal={{
                                preHeading: 'Name',
                                heading: name,
                                body: 'Deleting this person will remove them from your organization. This operation cannot be undone.',
                                warning:
                                    'Are you sure you want to proceed in deleting this person?',
                                confirm: 'Delete person',
                            }}
                            toast={{
                                title: 'Person deleted',
                                message: `Successfully deleted ${name}`,
                            }}
                        />
                    </c2-action-dropdown>
                </c2-actions>
            ),
        },
    };

    private deleteItem = (name: string) => async () => {
        this.data = [...this.data.filter((p) => p.name !== name)];
    };
}
