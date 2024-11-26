import { Component, h, Method, Element, Prop } from '@stencil/core';
import type { LoadingBarStatus } from './types';
import { registerAsBar } from './utils/setProgress';

/**
 * An animated loading bar, with coloured states.
 * The bar can be externally controlled via the `setProgress` util.
 * Add a bar named `page` for automatic control from `Page`.
 * @part bar - The internal bar.
 */
@Component({
    tag: 'l2-loading-bar',
    styleUrl: 'loading-bar.css',
    shadow: true,
})
export class YLoadingBar {
    @Element() host!: HTMLL2LoadingBarElement;
    /** The bar's name, for use in `setProgress` */
    @Prop() name!: string;

    private bar?: HTMLDivElement;
    private target: number = 0;
    private current: number = 0;
    private duration: number = 500;
    private frame!: ReturnType<typeof requestAnimationFrame>;
    private unregister!: () => void;

    /** Set (and animate to) a progress. */
    @Method() async progress(
        /** The current completion persentage. (0-100) */
        completion: number,
        /** Sets the status of the bar. */
        status: LoadingBarStatus = 'info',
    ) {
        this.updateProgress(completion, status);
    }

    componentWillLoad() {
        this.unregister = registerAsBar(this.name, this.host);
    }

    disconnectedCallback() {
        cancelAnimationFrame(this.frame);
        this.unregister();
    }

    render() {
        return <div ref={this.captureBar} part={'bar'} />;
    }

    private captureBar = (bar?: HTMLDivElement) => {
        this.bar = bar;
    };

    private setBarWidth = (width: number) => {
        if (!this.bar) return;
        this.bar.style.width = `${width}%`;
        this.current = width;

        if (width === 100) {
            this.bar.style.transitionDuration = '200ms';
            this.bar.style.opacity = '0';
        } else {
            this.bar.style.opacity = '1';
            this.bar.style.transitionDuration = '0';
        }
    };

    private setBarStatus = (status: LoadingBarStatus) => {
        if (!this.bar) return;
        this.bar.className = status;
    };

    private updateProgress = (completion: number, status: LoadingBarStatus) => {
        this.setBarStatus(status);

        if (completion < this.target) {
            this.cancelAnimation();
            this.target = completion;
            this.setBarWidth(completion);
        } else if (completion !== this.target) {
            this.target = completion;
            this.animate();
        }
    };

    private cancelAnimation = () => {
        cancelAnimationFrame(this.frame);
    };

    private animate = () => {
        this.cancelAnimation();
        const start = performance.now();
        const ppms = (this.target - this.current) / this.duration;

        const step: FrameRequestCallback = (t) => {
            const width = Math.min(
                ppms * (t - start) + this.current,
                this.target,
            );
            this.setBarWidth(width);

            if (width < this.target) {
                this.frame = requestAnimationFrame(step);
            }
        };

        this.frame = requestAnimationFrame(step);
    };
}
