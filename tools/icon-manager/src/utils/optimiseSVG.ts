import { optimize, OptimizedSvg, OptimizeOptions } from 'svgo';

const config: OptimizeOptions = {
    js2svg: {
        pretty: true,
    },
    plugins: [
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
            name: 'removeAttrs',
            params: {
                attrs: ['data.*', 'stroke-.*', 'class'],
            },
        },
        {
            name: 'addAttributesToSVGElement',
            params: {
                attributes: [{ 'aria-hidden': 'true' }],
            },
        },
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
        'sortAttrs',
        'removeDimensions',
        'removeRasterImages',
        {
            name: 'removeViewBox',
            active: false,
        },
    ],
};

export const optimiseSVG = async (icon: string) => {
    const { data } = optimize(icon, config) as OptimizedSvg;
    return data;
};
