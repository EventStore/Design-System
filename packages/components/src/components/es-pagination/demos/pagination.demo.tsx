import { Component, h, State } from '@stencil/core';
import type { PageChangeEventType } from '../types';

/** Pagination */
@Component({
    tag: 'es-pagination-demo',
    styleUrl: './pagination-demo.css',
    shadow: true,
})
export class Demo {
    @State() current = 1;
    @State() pageCount = 20;

    render() {
        return (
            <es-pagination
                pageCount={this.pageCount}
                onUpdate={this.handlePageChange}
                current={this.current}
            />
        );
    }

    private handlePageChange = (e: CustomEvent<PageChangeEventType>) => {
        switch (e.detail) {
            case 'first':
                this.current = 1;
                break;
            case 'previous':
                this.current = this.current - 1;
                break;
            case 'next':
                this.current = this.current + 1;
                break;
            case 'last':
                this.current = this.pageCount;
                break;
        }
    };
}
