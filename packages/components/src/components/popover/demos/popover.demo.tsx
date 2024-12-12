import { Component, h, Host, State } from '@stencil/core';
import type { Constrain, Placement } from '../types';

/** Popover */
@Component({
    tag: 'popover-demo',
    styleUrl: './popover-demo.css',
    shadow: true,
})
export class Demo {
    @State() open: boolean = true;
    @State() arrow: boolean = true;
    @State() autoSize: Constrain = 'none';
    @State() constrain: Constrain = 'none';
    @State() placement: Placement = 'top';
    @State() offset: number = 14;

    render() {
        return (
            <Host>
                <form class={'options'}>
                    <label>
                        <input
                            type={'checkbox'}
                            name={'open'}
                            checked={this.open}
                            onChange={this.onOpenChange}
                        />
                        <span>{'open'}</span>
                    </label>
                    <label>
                        <input
                            type={'checkbox'}
                            name={'arrow'}
                            checked={this.arrow}
                            onChange={this.onArrowChange}
                        />
                        <span>{'arrow'}</span>
                    </label>
                    <label>
                        <span>{'autoSize'}</span>
                        <select
                            name={'autoSize'}
                            onChange={this.onAutoSizeChange}
                        >
                            {this.constrainOptions.map((value) => (
                                <option
                                    value={value}
                                    selected={value === this.autoSize}
                                >
                                    {value}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span>{'constrain'}</span>
                        <select
                            name={'constrain'}
                            onChange={this.onConstrainChange}
                        >
                            {this.constrainOptions.map((value) => (
                                <option
                                    value={value}
                                    selected={value === this.constrain}
                                >
                                    {value}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span>{'placement'}</span>
                        <select
                            name={'placement'}
                            onChange={this.onPlacementChange}
                        >
                            {this.placementOptions.map((value) => (
                                <option
                                    value={value}
                                    selected={value === this.placement}
                                >
                                    {value}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span>{'offset'}</span>
                        <input
                            type={'number'}
                            name={'offset'}
                            onChange={this.onOffsetChange}
                            value={this.offset.toString()}
                        />
                    </label>
                </form>
                <div class={'wrapper'}>
                    <div class={'attachment'}>
                        {'Attachment element'}
                        <c2-popover
                            open={this.open}
                            arrow={this.arrow}
                            autoSize={this.autoSize}
                            constrain={this.constrain}
                            placement={this.placement}
                            offset={this.offset}
                        >
                            <div class={'popper'}>{'popover'}</div>
                        </c2-popover>
                    </div>
                </div>
            </Host>
        );
    }

    private onOpenChange = (e: Event) => {
        this.open = (e.target as HTMLInputElement).checked;
    };
    private onArrowChange = (e: Event) => {
        this.rotateOpen();
        this.arrow = (e.target as HTMLInputElement).checked;
    };
    private onAutoSizeChange = (e: Event) => {
        this.rotateOpen();
        this.autoSize = (e.target as HTMLSelectElement).value as Constrain;
    };
    private onConstrainChange = (e: Event) => {
        this.rotateOpen();
        this.constrain = (e.target as HTMLSelectElement).value as Constrain;
    };
    private onPlacementChange = (e: Event) => {
        this.rotateOpen();
        this.placement = (e.target as HTMLSelectElement).value as Placement;
    };
    private onOffsetChange = (e: Event) => {
        this.rotateOpen();
        this.offset = parseInt((e.target as HTMLInputElement).value);
    };

    private openTimeout?: ReturnType<typeof setTimeout>;
    private rotateOpen = () => {
        if (!this.open) return;
        clearTimeout(this.openTimeout);
        this.open = false;
        this.openTimeout = setTimeout(() => {
            this.open = true;
        }, 500);
    };

    private constrainOptions: Constrain[] = ['none', 'width', 'height', 'both'];
    private placementOptions: Placement[] = [
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
    ];
}
