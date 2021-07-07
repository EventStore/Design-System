import * as SVGO from 'svgo';

const svgo = new SVGO({
    js2svg: {
        pretty: true,
    },
    plugins: [
        {
            cleanupAttrs: true,
        },
        {
            removeDoctype: true,
        },
        {
            removeXMLProcInst: true,
        },
        {
            removeComments: true,
        },
        {
            removeMetadata: true,
        },
        {
            removeTitle: true,
        },
        {
            removeDesc: true,
        },
        {
            removeUselessDefs: true,
        },
        {
            removeEditorsNSData: true,
        },
        {
            removeEmptyAttrs: true,
        },
        {
            removeHiddenElems: true,
        },
        {
            removeEmptyText: true,
        },
        {
            removeEmptyContainers: true,
        },
        {
            removeViewBox: false,
        },
        {
            cleanupEnableBackground: true,
        },
        {
            convertStyleToAttrs: true,
        },
        {
            convertColors: true,
        },
        {
            convertPathData: true,
        },
        {
            convertTransform: true,
        },
        {
            removeUnknownsAndDefaults: true,
        },
        {
            removeNonInheritableGroupAttrs: true,
        },
        {
            removeUselessStrokeAndFill: true,
        },
        {
            removeUnusedNS: true,
        },
        {
            cleanupIDs: true,
        },
        {
            cleanupNumericValues: true,
        },
        {
            moveElemsAttrsToGroup: true,
        },
        {
            moveGroupAttrsToElems: true,
        },
        {
            collapseGroups: true,
        },
        {
            removeRasterImages: false,
        },
        {
            mergePaths: true,
        },
        {
            convertShapeToPath: true,
        },
        {
            sortAttrs: true,
        },
        {
            removeDimensions: true,
        },
        {
            removeAttrs: { attrs: ['data.*', '(stroke|fill)', 'class'] },
        },
        {
            addAttributesToSVGElement: {
                attributes: [{ 'aria-hidden': true }],
            },
        },
    ],
});

export const optimiseSVG = async (icon: string) => {
    const { data } = await svgo.optimize(icon);
    return data;
};
