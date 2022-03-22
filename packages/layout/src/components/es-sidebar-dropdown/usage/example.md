```tsx
import { Link } from '@eventstore/router';
import { randomIcon } from 'helpers';

export default () => (
    <es-sidebar>
        <es-sidebar-section title={'Dropdown'}>
            <es-sidebar-dropdown
                defaultIcon={randomIcon()}
                defaultTitle={'Hello there'}
            >
                <es-sidebar-section
                    collapsable
                    defaultCollapsed
                    title={'Night Time'}
                >
                    <es-sidebar-link matchExact url={'/'} icon={randomIcon()}>
                        {'Hello!'}
                    </es-sidebar-link>
                    <es-sidebar-link url={'/somewhere'} icon={randomIcon()}>
                        {'Go somewhere'}
                    </es-sidebar-link>
                </es-sidebar-section>
                <es-sidebar-section collapsable title={'Day Time'}>
                    <es-sidebar-link url={'/good-morning'} icon={randomIcon()}>
                        {'Good morning!'}
                    </es-sidebar-link>
                    <es-sidebar-link url={'/work'} icon={randomIcon()}>
                        {'Go to work'}
                    </es-sidebar-link>
                </es-sidebar-section>
                <es-sidebar-section
                    collapsable
                    defaultCollapsed
                    title={'Another Time'}
                >
                    {Array.from({ length: 200 }, (_, i) => (
                        <es-sidebar-link
                            url={`/another-${i}`}
                            icon={randomIcon()}
                        >
                            {`Link ${i}`}
                        </es-sidebar-link>
                    ))}
                </es-sidebar-section>
            </es-sidebar-dropdown>
        </es-sidebar-section>
        <es-sidebar-section sectionTitle={'My Section'}>
            <es-sidebar-link url={'/'} icon={randomIcon()}>
                {'Hello!'}
            </es-sidebar-link>
            <es-sidebar-link url={'./preview'} icon={randomIcon()}>
                {'Go somewhere'}
            </es-sidebar-link>
        </es-sidebar-section>
        <es-sidebar-section sectionTitle={'My Other Section'}>
            <es-sidebar-link url={'/somewhere-else'} icon={randomIcon()}>
                {'Go somewhere else'}
            </es-sidebar-link>
            <es-sidebar-link url={'./home'} icon={randomIcon()}>
                {'Go nowhere'}
            </es-sidebar-link>
        </es-sidebar-section>
    </es-sidebar>
);
```
