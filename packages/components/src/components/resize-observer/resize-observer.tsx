import { Component, Element, Event, type EventEmitter } from '@stencil/core';

/** Wraps a [ResizeObserver](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) to allow tracking `DOMRect` dimensions */
@Component({
    tag: 'c2-resize-observer',
    styleUrl: 'resize-observer.css',
    shadow: false,
})
export class EsResizeObserver {
    @Element() host!: HTMLElement;
    /** Triggered when the size of the element changes. */
    @Event() sizeChanged!: EventEmitter<DOMRectReadOnly>;

    private observer = new ResizeObserver(([entry]) => {
        this.sizeChanged.emit(entry.contentRect);
    });

    componentDidLoad() {
        this.observer.observe(this.host);
    }

    disconnectedCallback() {
        this.observer.disconnect();
    }
}
