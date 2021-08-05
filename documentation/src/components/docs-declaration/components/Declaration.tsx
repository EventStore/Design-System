import { FunctionalComponent, h } from '@stencil/core';
import { JSONOutput, ReflectionKind } from 'typedoc';
import { Todo } from './Todo';

export const Declaration: FunctionalComponent<JSONOutput.DeclarationReflection> =
    (declaration) => {
        switch (declaration.kind) {
            case ReflectionKind.Project:
                return <Todo />;
            case ReflectionKind.Module:
                return <Todo />;
            case ReflectionKind.Namespace:
                return <Todo />;
            case ReflectionKind.Enum:
                return <Todo />;
            case ReflectionKind.EnumMember:
                return <Todo />;
            case ReflectionKind.Variable:
                return <Todo />;
            case ReflectionKind.Function:
                return <Todo />;
            case ReflectionKind.Class:
                return <Todo />;
            case ReflectionKind.Interface:
                return <Todo />;
            case ReflectionKind.Constructor:
                return <Todo />;
            case ReflectionKind.Property:
                return <Todo />;
            case ReflectionKind.Method:
                return <Todo />;
            case ReflectionKind.CallSignature:
                return <Todo />;
            case ReflectionKind.IndexSignature:
                return <Todo />;
            case ReflectionKind.ConstructorSignature:
                return <Todo />;
            case ReflectionKind.Parameter:
                return <Todo />;
            case ReflectionKind.TypeLiteral:
                return <Todo />;
            case ReflectionKind.TypeParameter:
                return <Todo />;
            case ReflectionKind.Accessor:
                return <Todo />;
            case ReflectionKind.GetSignature:
                return <Todo />;
            case ReflectionKind.SetSignature:
                return <Todo />;
            case ReflectionKind.ObjectLiteral:
                return <Todo />;
            case ReflectionKind.TypeAlias:
                return <Todo />;
            case ReflectionKind.Event:
                return <Todo />;
            case ReflectionKind.Reference:
                return <Todo />;
        }
    };
