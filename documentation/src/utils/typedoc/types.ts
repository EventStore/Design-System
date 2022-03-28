import type {
    ContainerReflection,
    DeclarationReflection,
    SignatureReflection,
    ParameterReflection,
} from 'typedoc';

export type SomeReflection =
    | ContainerReflection
    | DeclarationReflection
    | SignatureReflection
    | ParameterReflection;
