import { optimize, OptimizedSvg, OptimizeOptions } from 'svgo';

const config: OptimizeOptions = {
    js2svg: {
        pretty: true,
    },
    plugins: [
        'cleanupAttrs',
        'removeDoctype',
        'removeXMLProcInst',
        'removeComments',
        'removeMetadata',
        'removeTitle',
        'removeDesc',
        'removeUselessDefs',
        'removeEditorsNSData',
        'removeEmptyAttrs',
        'removeHiddenElems',
        'removeEmptyText',
        'removeEmptyContainers',
        'cleanupEnableBackground',
        'convertStyleToAttrs',
        'convertColors',
        'convertPathData',
        'convertTransform',
        'removeUnknownsAndDefaults',
        'removeNonInheritableGroupAttrs',
        'removeUselessStrokeAndFill',
        'removeUnusedNS',
        'cleanupIDs',
        'cleanupNumericValues',
        'moveElemsAttrsToGroup',
        'moveGroupAttrsToElems',
        'collapseGroups',
        'mergePaths',
        'convertShapeToPath',
        { name: 'inlineStyles', params: { onlyMatchedOnce: false } },
        'convertStyleToAttrs',
        'sortAttrs',
        'removeDimensions',
        'removeRasterImages',
        'removeStyleElement',
        {
            name: 'removeAttrs',
            params: {
                attrs: [
                    'data.*',
                    'stroke-.*',
                    'class',
                    'enable-background',
                    'xml.*',
                    'id',
                    'x',
                    'y',
                    'version',
                    'xmlns',
                ],
            },
        },
        {
            name: 'addAttributesToSVGElement',
            params: {
                attributes: [{ 'aria-hidden': 'true' }],
            },
        },
        {
            name: 'removeViewBox',
            active: false,
        },
        {
            name: 'removeHidden',
            type: 'visitor' as any,
            fn() {
                return {
                    element: {
                        enter: (node: any, parentNode: any) => {
                            if (
                                node.attributes.stroke === 'none' &&
                                node.attributes.fill === 'none'
                            ) {
                                parentNode.children = parentNode.children.filter(
                                    (child: any) => child !== node,
                                );
                            }
                        },
                    },
                };
            },
        },
        {
            name: 'currentColor',
            type: 'visitor' as any,
            fn() {
                return {
                    element: {
                        enter: (node: any) => {
                            if (
                                node.attributes.stroke &&
                                node.attributes.stroke !== 'none'
                            ) {
                                node.attributes.stroke = 'currentColor';
                            }

                            if (
                                node.attributes.fill &&
                                node.attributes.fill !== 'none'
                            ) {
                                node.attributes.fill = 'currentColor';
                            }
                        },
                    },
                };
            },
        },
        {
            name: 'promoteToRoot',
            type: 'visitor' as any,
            fn() {
                const promote = (node: any, attr: string) => {
                    if (!node.children) return;

                    const values = new Set(
                        node.children.map(
                            (child: any): string => child.attributes[attr],
                        ),
                    );

                    if (values.size === 1) {
                        for (const child of node.children) {
                            delete child.attributes[attr];
                        }

                        const [value] = Array.from(values);

                        if (value) {
                            node.attributes[attr] = value;
                        }
                    }
                };

                return {
                    element: {
                        enter: (node: any, parentNode: any) => {
                            if (
                                node.name === 'svg' &&
                                parentNode.type === 'root'
                            ) {
                                promote(node, 'fill');
                                promote(node, 'stroke');
                            }
                        },
                    },
                };
            },
        },
    ],
};

export const optimiseSVG = async (icon: string) => {
    const { data } = optimize(icon, config) as OptimizedSvg;
    return data;
};
