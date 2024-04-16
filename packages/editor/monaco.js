const MONACO = Symbol.for('monaco');

export const {
    // namespaces
    editor,
    languages,
    worker,

    // enums
    KeyCode,
    MarkerSeverity,
    MarkerTag,
    SelectionDirection,

    // classes
    CancellationTokenSource,
    Emitter,
    KeyMod,
    Position,
    Range,
    Selection,
    Token,
    Uri,
} = window[MONACO];
