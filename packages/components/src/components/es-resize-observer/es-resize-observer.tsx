import { Component, Element, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'es-resize-observer',
    styleUrl: 'es-resize-observer.css',
    shadow: false,
})
export class EsResizeObserver {
    @Element() host!: HTMLElement;
    @Event() sizeChanged!: EventEmitter<DOMRectReadOnly>;

    private observer = new ResizeObserver(([entry]) => {
        this.sizeChanged.emit(entry.contentRect as DOMRectReadOnly);
    });

    componentDidLoad() {
        this.observer.observe(this.host);
    }

    disconnectedCallback() {
        this.observer.disconnect();
    }
}
