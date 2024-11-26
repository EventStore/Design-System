```tsx
import { randomIcon } from 'utils/helpers';

export default () => (
    <l2-sidebar>
        <l2-layout-section title={'Dropdown'}>
            <l2-sidebar-dropdown
                defaultIcon={randomIcon()}
                defaultTitle={'Hello there'}
            >
                <l2-layout-section
                    collapsable
                    defaultCollapsed
                    title={'Night Time'}
                >
                    <l2-layout-link matchExact url={'/'} icon={randomIcon()}>
                        {'Hello!'}
                    </l2-layout-link>
                    <l2-layout-link url={'/somewhere'} icon={randomIcon()}>
                        {'Go somewhere'}
                    </l2-layout-link>
                </l2-layout-section>
                <l2-layout-section collapsable title={'Day Time'}>
                    <l2-layout-link url={'/good-morning'} icon={randomIcon()}>
                        {'Good morning!'}
                    </l2-layout-link>
                    <l2-layout-link url={'/work'} icon={randomIcon()}>
                        {'Go to work'}
                    </l2-layout-link>
                </l2-layout-section>
                <l2-layout-section
                    collapsable
                    defaultCollapsed
                    title={'Another Time'}
                >
                    {Array.from({ length: 200 }, (_, i) => (
                        <l2-layout-link
                            url={`/another-${i}`}
                            icon={randomIcon()}
                        >
                            {`Link ${i}`}
                        </l2-layout-link>
                    ))}
                </l2-layout-section>
            </l2-sidebar-dropdown>
        </l2-layout-section>
        <l2-layout-section sectionTitle={'My Section'}>
            <l2-layout-link url={'/'} icon={randomIcon()}>
                {'Hello!'}
            </l2-layout-link>
            <l2-layout-link url={'./preview'} icon={randomIcon()}>
                {'Go somewhere'}
            </l2-layout-link>
        </l2-layout-section>
        <l2-layout-section sectionTitle={'My Other Section'}>
            <l2-layout-link url={'/somewhere-else'} icon={randomIcon()}>
                {'Go somewhere else'}
            </l2-layout-link>
            <l2-layout-link url={'./home'} icon={randomIcon()}>
                {'Go nowhere'}
            </l2-layout-link>
        </l2-layout-section>
    </l2-sidebar>
);
```
