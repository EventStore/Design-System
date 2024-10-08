if (typeof global !== 'undefined') {
    document.queryCommandSupported ??= () => false;
    global.MutationObserver ??= class {
        disconnect() {}
        observe() {}
        takeRecords() {
            return [];
        }
    };
    global.ResizeObserver ??= class {
        disconnect() {}
        observe() {}
        unobserve() {}
    };
    global.UIEvent ??= class {} as any;
}
