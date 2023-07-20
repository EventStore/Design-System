```tsx
import { randomIcon } from 'utils/helpers';

export default () => (
    <es-sidebar>
        <es-layout-section title={'Dropdown'}>
            <es-sidebar-dropdown
                defaultIcon={randomIcon()}
                defaultTitle={'Hello there'}
            >
                <es-layout-section
                    collapsable
                    defaultCollapsed
                    title={'Night Time'}
                >
                    <es-layout-link matchExact url={'/'} icon={randomIcon()}>
                        {'Hello!'}
                    </es-layout-link>
                    <es-layout-link url={'/somewhere'} icon={randomIcon()}>
                        {'Go somewhere'}
                    </es-layout-link>
                </es-layout-section>
                <es-layout-section collapsable title={'Day Time'}>
                    <es-layout-link url={'/good-morning'} icon={randomIcon()}>
                        {'Good morning!'}
                    </es-layout-link>
                    <es-layout-link url={'/work'} icon={randomIcon()}>
                        {'Go to work'}
                    </es-layout-link>
                </es-layout-section>
                <es-layout-section
                    collapsable
                    defaultCollapsed
                    title={'Another Time'}
                >
                    {Array.from({ length: 200 }, (_, i) => (
                        <es-layout-link
                            url={`/another-${i}`}
                            icon={randomIcon()}
                        >
                            {`Link ${i}`}
                        </es-layout-link>
                    ))}
                </es-layout-section>
            </es-sidebar-dropdown>
        </es-layout-section>
        <es-layout-section sectionTitle={'My Section'}>
            <es-layout-link url={'/'} icon={randomIcon()}>
                {'Hello!'}
            </es-layout-link>
            <es-layout-link url={'./preview'} icon={randomIcon()}>
                {'Go somewhere'}
            </es-layout-link>
        </es-layout-section>
        <es-layout-section sectionTitle={'My Other Section'}>
            <es-layout-link url={'/somewhere-else'} icon={randomIcon()}>
                {'Go somewhere else'}
            </es-layout-link>
            <es-layout-link url={'./home'} icon={randomIcon()}>
                {'Go nowhere'}
            </es-layout-link>
        </es-layout-section>
    </es-sidebar>
);
```
