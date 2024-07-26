import type { Plugin } from 'rollup';
import type { Node } from 'unist';
interface JSXNode extends Node {
    value: string;
}
/**
 * Select nodes from the tree with `test`  (for example: 'comment' or 'jsx').
 * Directly modify a node in the visitor, or return `skip` to skip the node.
 */
export interface Visitor {
    test: string;
    visitor: (node: JSXNode, index: number, parent?: Node) => void | 'skip';
}
export interface MDXOptions {
    /** Apply custom visitors to map or skip nodes from the tree. */
    visitors?: Visitor[];
}
/**
 * Stencil plugin to import markdown and mdx files as components.
 *
 * Usage:
 * `stencil.config.ts`
 * ``` ts
 *  import { mdx } from '@eventstore-ui/stencil-markdown-plugin/plugin';
 *
 *  export const config: Config = {
 *    plugins: [
 *      mdx(),
 *   ],
 *  };
 * ```
 */
export declare const mdx: (options?: MDXOptions) => Plugin;
export {};
