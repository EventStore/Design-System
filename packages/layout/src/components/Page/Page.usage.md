<!-- no-preview -->

```tsx my-great-page.tsx
import { Component, h, State } from '@stencil/core';
import { Page, PageState } from '@kurrent-ui/layout';

import { loadData, Data } from './loadData';

@Component({
    tag: 'my-great-page',
    styleUrl: 'my-great-page.css',
    shadow: true,
})
export class MyGreatPage {
    @State() pageState: PageState = 'loading';
    @State() data: Data[] = [];

    componentWillLoad() {
        this.preparePage();
    }

    private preparePage = async () => {
        try {
            this.data = await loadData();
            this.pageState = 'ready';
        } catch (error) {
            this.pageState = error;
        }
    };

    render() {
        return (
            <Page
                pageTitle={'All Your Data!'}
                state={this.pageState}
                empty={!this.data.length}
                renderEmptyState={this.renderEmptyState}
                renderErrorState={this.renderEroorState}
                crumbs={[
                    {
                        name: 'Projects',
                        path: '/projects',
                    },
                    {
                        name: 'Data',
                        path: './data',
                    },
                ]}
            >
                {'Some page content'}
            </Page>
        );
    }

    renderErrorState = (error: Error) => (
        <l2-display-error error={error}>
            <c2-button-link url={'/'}>{'Go home'}</c2-button-link>
        </l2-display-error>
    );

    renderEmptyState = () => (
        <>
            {'No Data yet!'}
            <c2-button-link url={'./make-data'}>
                {'Get started making some data!'}
            </c2-button-link>
        </>
    );
}
```

```css my-great-page.css
@import url('~@kurrent-ui/layout/css/page.css');
```
