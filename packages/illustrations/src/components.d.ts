/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    /**
     * Displays a sequence illustration.
     * If number isn't set, it will display one at random.
     */
    interface KurrentSequence {
        /**
          * Select the sequence to display.
         */
        "number"?: number;
    }
    /**
     * Sequence
     */
    interface SequenceDemo {
    }
}
declare global {
    /**
     * Displays a sequence illustration.
     * If number isn't set, it will display one at random.
     */
    interface HTMLKurrentSequenceElement extends Components.KurrentSequence, HTMLStencilElement {
    }
    var HTMLKurrentSequenceElement: {
        prototype: HTMLKurrentSequenceElement;
        new (): HTMLKurrentSequenceElement;
    };
    /**
     * Sequence
     */
    interface HTMLSequenceDemoElement extends Components.SequenceDemo, HTMLStencilElement {
    }
    var HTMLSequenceDemoElement: {
        prototype: HTMLSequenceDemoElement;
        new (): HTMLSequenceDemoElement;
    };
    interface HTMLElementTagNameMap {
        "kurrent-sequence": HTMLKurrentSequenceElement;
        "sequence-demo": HTMLSequenceDemoElement;
    }
}
declare namespace LocalJSX {
    /**
     * Displays a sequence illustration.
     * If number isn't set, it will display one at random.
     */
    interface KurrentSequence {
        /**
          * Select the sequence to display.
         */
        "number"?: number;
    }
    /**
     * Sequence
     */
    interface SequenceDemo {
    }
    interface IntrinsicElements {
        "kurrent-sequence": KurrentSequence;
        "sequence-demo": SequenceDemo;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            /**
             * Displays a sequence illustration.
             * If number isn't set, it will display one at random.
             */
            "kurrent-sequence": LocalJSX.KurrentSequence & JSXBase.HTMLAttributes<HTMLKurrentSequenceElement>;
            /**
             * Sequence
             */
            "sequence-demo": LocalJSX.SequenceDemo & JSXBase.HTMLAttributes<HTMLSequenceDemoElement>;
        }
    }
}
