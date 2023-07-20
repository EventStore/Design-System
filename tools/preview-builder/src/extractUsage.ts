import type { JsonDocs as StencilDocs } from '@stencil/core/internal';
import type {
    ProjectReflection as TypeDoc,
    ContainerReflection,
    DeclarationReflection,
    SignatureReflection,
    ParameterReflection,
} from 'typedoc';

export type Usage = [identifier: string, usage: string];
export const extractUsages = (docs: unknown): Usage[] => {
    if (isStencilDocs(docs)) return extractUsagesFromStencilDocs(docs);
    if (isTypeDoc(docs)) return extractUsagesFromTypedoc(docs);
    // eslint-disable-next-line no-console
    console.warn('Unknown JSON passed');
    return [];
};

const isStencilDocs = (docs: unknown): docs is StencilDocs =>
    typeof docs === 'object' &&
    docs != null &&
    'compiler' in docs &&
    typeof docs.compiler === 'object' &&
    docs.compiler != null &&
    'name' in docs.compiler &&
    docs.compiler.name === '@stencil/core';

const extractUsagesFromStencilDocs = (docs: StencilDocs): Usage[] => {
    const usage: Usage[] = [];
    for (const component of docs.components) {
        for (const [name, value] of Object.entries(component.usage)) {
            usage.push([`${component.tag}-${name}`, value]);
        }
    }
    return usage;
};

const isTypeDoc = (docs: unknown): docs is TypeDoc =>
    typeof docs === 'object' &&
    docs != null &&
    'variant' in docs &&
    docs.variant === 'project';

const extractUsagesFromTypedoc = (doc: TypeDoc): Usage[] => {
    if (!doc.groups) return [];

    const lookup = createTypedocLookup(doc);
    const modules = doc.groups
        .filter((group) => group.title === 'Modules')
        .flatMap((group: any) => group.children ?? [])
        .flatMap((id) => (lookup.get(id)! as DeclarationReflection).groups!);

    const reflections = [...doc.groups, ...modules]
        .flatMap((group: any) => group.children ?? [])
        .map((id) => lookup.get(id)!)
        .filter((item) => !item.flags.isExternal);

    const usage: Usage[] = [];
    for (const reflection of reflections) {
        for (const signature of [
            reflection,
            ...('signatures' in reflection ? reflection.signatures ?? [] : []),
        ]) {
            for (const tag of signature.comment?.blockTags ?? []) {
                if (!tag || tag.tag !== '@usage') continue;
                const content = tag.content.map(({ text }) => text).join('');
                if (!content) continue;
                usage.push([`${reflection.name}-${signature.name}`, content]);
            }
        }
    }
    return usage;
};

type SomeReflection =
    | ContainerReflection
    | DeclarationReflection
    | SignatureReflection
    | ParameterReflection;

export type TypedocLookup = Map<number | string, SomeReflection>;

export const createTypedocLookup = (typedoc: TypeDoc): TypedocLookup => {
    const typeMap: TypedocLookup = new Map();

    const insertTypeAndDecendants = (type: SomeReflection) => {
        typeMap.set(type.id, type);
        typeMap.set(type.name, type);

        if ('children' in type && type.children) {
            type.children.forEach(insertTypeAndDecendants);
        }
    };

    insertTypeAndDecendants(typedoc);

    return typeMap;
};
