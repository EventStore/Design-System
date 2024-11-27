import { readFile, readdir, writeFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { promisify } from 'node:util';
import { exec as execCb } from 'node:child_process';
const exec = promisify(execCb);

const entryDir = process.cwd();

const toRename = [
    ['es-accordian', 'c2-accordian'],
    ['es-action', 'c2-action'],
    ['es-action-dropdown', 'c2-action-dropdown'],
    ['es-action-link', 'c2-action-link'],
    ['es-action-with-confirmation', 'c2-action-with-confirmation'],
    ['es-actions', 'c2-actions'],
    ['es-badge', 'c2-badge'],
    ['es-button', 'c2-button'],
    ['es-button-link', 'c2-button-link'],
    ['es-button-with-confirmation', 'c2-button-with-confirmation'],
    ['es-thinking-button', 'c2-thinking-button'],
    ['es-callout', 'c2-callout'],
    ['es-copy', 'c2-copy'],
    ['es-corner-banner', 'c2-corner-banner'],
    ['es-counter', 'c2-counter'],
    ['es-hole-puncher', 'c2-hole-puncher'],
    ['es-icon', 'c2-icon'],
    ['es-loading-dots', 'c2-loading-dots'],
    ['es-loading-text', 'c2-loading-text'],
    ['es-confirm-modal', 'c2-confirm-modal'],
    ['es-modal', 'c2-modal'],
    ['es-pagination', 'c2-pagination'],
    ['es-popover', 'c2-popover'],
    ['es-popper', 'c2-popper'],
    ['es-popper-inner', 'c2-popper-inner'],
    ['es-popper-x', 'c2-popper-x'],
    ['es-popper-y', 'c2-popper-y'],
    ['es-portal', 'c2-portal'],
    ['es-backdrop', 'c2-backdrop'],
    ['es-progression', 'c2-progression'],
    ['es-resize-observer', 'c2-resize-observer'],
    ['es-table-align', 'c2-table-align'],
    ['es-table-variants', 'c2-table-variants'],
    ['es-table', 'c2-table'],
    ['es-table-detail', 'c2-table-detail'],
    ['es-table-detail-header', 'c2-table-detail-header'],
    ['es-table-nested', 'c2-table-nested'],
    ['es-table-virtualized', 'c2-table-virtualized'],
    ['es-tabs', 'c2-tabs'],
    ['es-toast', 'c2-toast'],
    ['es-toaster', 'c2-toaster'],
    ['es-wizard', 'c2-wizard'],

    ['es-accordian-demo', 'accordian-demo'],
    ['es-actions-demo', 'actions-demo'],
    ['es-badge-demo', 'badge-demo'],
    ['es-button-link-demo', 'button-link-demo'],
    ['es-button-with-confirmation-demo', 'button-with-confirmation-demo'],
    ['es-buttons-demo', 'buttons-demo'],
    ['es-callout-demo', 'callout-demo'],
    ['es-copy-demo', 'copy-demo'],
    ['es-corner-banner-demo', 'corner-banner-demo'],
    ['es-counter-demo', 'counter-demo'],
    ['es-icon-demo', 'icon-demo'],
    ['es-loading-dots-demo', 'loading-dots-demo'],
    ['es-loading-text-demo', 'loading-text-demo'],
    ['es-confirm-modal-demo', 'confirm-modal-demo'],
    ['es-modal-demo', 'modal-demo'],
    ['es-pagination-demo', 'pagination-demo'],
    ['es-popover-demo', 'popover-demo'],
    ['es-portal-demo', 'portal-demo'],
    ['es-progression-demo', 'progression-demo'],
    ['es-table-basic-loading-demo', 'table-basic-loading-demo'],
    ['es-table-basic-demo', 'table-basic-demo'],
    ['es-table-detail-loading-demo', 'table-detail-loading-demo'],
    ['es-table-detail-basic-demo', 'table-detail-basic-demo'],
    ['es-table-grouped-demo', 'table-grouped-demo'],
    ['es-table-nested-loading-demo', 'table-nested-loading-demo'],
    ['es-table-nested-demo', 'table-nested-demo'],
    ['es-table-sort-demo', 'table-sort-demo'],
    ['es-table-virtualized-grouped-demo', 'table-virtualized-grouped-demo'],
    ['es-table-virtualized-demo', 'table-virtualized-demo'],
    ['es-tabs-demo', 'tabs-demo'],
    ['es-wizard-demo', 'wizard-demo'],
];

toRename.sort(([a], [b]) => {
    const aa = a.split('-').length;
    const bb = b.split('-').length;

    if (aa !== bb) return bb - aa;

    return b.length - a.length;
});

const isIgnored = async (path) => {
    try {
        await exec(`git check-ignore ${path}`);
        return true;
    } catch (error) {
        if (error.code === 0) return true;
        return false;
    }
};

const replaceIn = ['.ts', '.tsx', '.css', '.md', '.html'];

const replaceNames = async (path) => {
    const file = await readFile(path, 'utf-8');

    let needsWrite = false;
    let result = file;

    for (const [from, to] of toRename) {
        const replaced = result.replaceAll(from, to);

        if (replaced !== result) {
            console.log(`replaced ${from} in ${relative(entryDir, path)}`);
            result = replaced;
            needsWrite = true;
        }
    }

    if (needsWrite) await writeFile(path, result);
};

const replaceDeep = async (path) => {
    const files = await readdir(path, { withFileTypes: true });
    for (const entry of files) {
        const path = join(entry.path, entry.name);

        if (entry.name.startsWith('.') || (await isIgnored(path))) continue;

        if (entry.isDirectory()) {
            await replaceDeep(path);
            continue;
        }

        if (replaceIn.includes(extname(path))) {
            replaceNames(path);
        }
    }
};

await replaceDeep(entryDir);

console.log('done');
