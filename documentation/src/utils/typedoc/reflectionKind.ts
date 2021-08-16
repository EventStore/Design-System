import { JSONOutput } from 'typedoc';

// this is taken from typedoc, but importing it breaks the build
export const enum ReflectionKind {
    Project = 0x0,
    Module = 0x1,
    Namespace = 0x2,
    Enum = 0x4,
    EnumMember = 0x10,
    Variable = 0x20,
    Function = 0x40,
    Class = 0x80,
    Interface = 0x100,
    Constructor = 0x200,
    Property = 0x400,
    Method = 0x800,
    CallSignature = 0x1000,
    IndexSignature = 0x2000,
    ConstructorSignature = 0x4000,
    Parameter = 0x8000,
    TypeLiteral = 0x10000,
    TypeParameter = 0x20000,
    Accessor = 0x40000,
    GetSignature = 0x80000,
    SetSignature = 0x100000,
    ObjectLiteral = 0x200000,
    TypeAlias = 0x400000,
    Event = 0x800000,
    Reference = 0x1000000,
}

type D = JSONOutput.DeclarationReflection;

export const isProject = (d: D) => (d.kind as any) === ReflectionKind.Project;
export const isModule = (d: D) => (d.kind as any) === ReflectionKind.Module;
export const isNamespace = (d: D) =>
    (d.kind as any) === ReflectionKind.Namespace;
export const isEnum = (d: D) => (d.kind as any) === ReflectionKind.Enum;
export const isEnumMember = (d: D) =>
    (d.kind as any) === ReflectionKind.EnumMember;
export const isVariable = (d: D) => (d.kind as any) === ReflectionKind.Variable;
export const isFunction = (d: D) => (d.kind as any) === ReflectionKind.Function;
export const isClass = (d: D) => (d.kind as any) === ReflectionKind.Class;
export const isInterface = (d: D) =>
    (d.kind as any) === ReflectionKind.Interface;
export const isConstructor = (d: D) =>
    (d.kind as any) === ReflectionKind.Constructor;
export const isProperty = (d: D) => (d.kind as any) === ReflectionKind.Property;
export const isMethod = (d: D) => (d.kind as any) === ReflectionKind.Method;
export const isCallSignature = (d: D) =>
    (d.kind as any) === ReflectionKind.CallSignature;
export const isIndexSignature = (d: D) =>
    (d.kind as any) === ReflectionKind.IndexSignature;
export const isConstructorSignature = (d: D) =>
    (d.kind as any) === ReflectionKind.ConstructorSignature;
export const isParameter = (d: D) =>
    (d.kind as any) === ReflectionKind.Parameter;
export const isTypeLiteral = (d: D) =>
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
export const isTypeAlias = (d: D) =>
    (d.kind as any) === ReflectionKind.TypeAlias;
export const isEvent = (d: D) => (d.kind as any) === ReflectionKind.Event;
export const isReference = (d: D) =>
    (d.kind as any) === ReflectionKind.Reference;
