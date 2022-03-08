interface NavNodeBase {
    /** The title to display in the node. */
    title: string;
    /** If the node should be disabled. */
    disabled?: boolean;
}

/** A parent node containing other nodes. */
export interface NavParentNode extends NavNodeBase {
    /** An array of child nodes. */
    children: NavNode[];
}

/** A leaf node of the navigation tree, representing a link. */
export interface NavLeafNode extends NavNodeBase {
    /** The url to link to. */
    url: string;
    /** If the url is external to the current site. */
    external?: boolean;
    /** The match string to show the node as active. (Defaults to the url.) */
    match?: string;
}

/** A single node of the navigation tree. */
export type NavNode = NavParentNode | NavLeafNode;

/** A navigation tree. */
export type NavTree = NavNode[];
