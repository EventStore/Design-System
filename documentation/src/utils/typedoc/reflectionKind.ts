import type { DeclarationReflection, SignatureReflection } from 'typedoc';
import { ReflectionKind } from 'typedoc/dist/lib/models/reflections/kind';
import type { SomeReflection } from './types';

export { ReflectionKind };

type D = SomeReflection;

export const isProject = (d: D) => (d.kind as any) === ReflectionKind.Project;
export const isModule = (d: D) => (d.kind as any) === ReflectionKind.Module;
export const isNamespace = (d: D) =>
    (d.kind as any) === ReflectionKind.Namespace;
export const isEnum = (d: D) => (d.kind as any) === ReflectionKind.Enum;
export const isEnumMember = (d: D) =>
    (d.kind as any) === ReflectionKind.EnumMember;
export const isVariable = (d: D): d is DeclarationReflection =>
    (d.kind as any) === ReflectionKind.Variable;
export const isFunction = (d: D) => (d.kind as any) === ReflectionKind.Function;
export const isClass = (d: D): d is DeclarationReflection =>
    (d.kind as any) === ReflectionKind.Class;
export const isInterface = (d: D): d is DeclarationReflection =>
    (d.kind as any) === ReflectionKind.Interface;
export const isConstructor = (d: D) =>
    (d.kind as any) === ReflectionKind.Constructor;
export const isProperty = (d: D) => (d.kind as any) === ReflectionKind.Property;
export const isMethod = (d: D) => (d.kind as any) === ReflectionKind.Method;
export const isCallSignature = (d: D): d is SignatureReflection =>
    (d.kind as any) === ReflectionKind.CallSignature;
export const isIndexSignature = (d: D) =>
    (d.kind as any) === ReflectionKind.IndexSignature;
export const isConstructorSignature = (d: D) =>
    (d.kind as any) === ReflectionKind.ConstructorSignature;
export const isParameter = (d: D) =>
    (d.kind as any) === ReflectionKind.Parameter;
export const isTypeLiteral = (d: D): d is DeclarationReflection =>
    (d.kind as any) === ReflectionKind.TypeLiteral;
export const isTypeParameter = (d: D) =>
    (d.kind as any) === ReflectionKind.TypeParameter;
export const isAccessor = (d: D) => (d.kind as any) === ReflectionKind.Accessor;
export const isGetSignature = (d: D) =>
    (d.kind as any) === ReflectionKind.GetSignature;
export const isSetSignature = (d: D) =>
    (d.kind as any) === ReflectionKind.SetSignature;
export const isObjectLiteral = (d: D) =>
    (d.kind as any) === ReflectionKind.ObjectLiteral;
export const isTypeAlias = (d: D): d is DeclarationReflection =>
    (d.kind as any) === ReflectionKind.TypeAlias;
export const isEvent = (d: D) => (d.kind as any) === ReflectionKind.Event;
export const isReference = (d: D) =>
    (d.kind as any) === ReflectionKind.Reference;
