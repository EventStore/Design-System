import type { JsonDocs } from '@stencil/core/internal';
import type { ProjectReflection } from 'typedoc';
import type { PackageJson } from '.';

import assetsPackageJson from '@kurrent-ui/assets/package.json';
import assetsReadme from '@kurrent-ui/assets/readme.md';

import componentsPackageJson from '@kurrent-ui/components/package.json';
import componentsReadme from '@kurrent-ui/components/readme.md';
import componentsStencilDocs from '../../../generated/components.stencil.json';
import componentsTypeDocs from '../../../generated/components.typedoc.json';

import configsPackageJson from '@kurrent-ui/configs/package.json';
import configsReadme from '@kurrent-ui/configs/readme.md';

import editorPackageJson from '@kurrent-ui/editor/package.json';
import editorReadme from '@kurrent-ui/editor/readme.md';
import editorStencilDocs from '../../../generated/editor.stencil.json';
import editorTypeDocs from '../../../generated/editor.typedoc.json';

import fieldsPackageJson from '@kurrent-ui/fields/package.json';
import fieldsReadme from '@kurrent-ui/fields/readme.md';
import fieldsStencilDocs from '../../../generated/fields.stencil.json';
import fieldsTypeDocs from '../../../generated/fields.typedoc.json';

import formsPackageJson from '@kurrent-ui/forms/package.json';
import formsReadme from '@kurrent-ui/forms/readme.md';
import formsTypeDocs from '../../../generated/forms.typedoc.json';

import iconManagerPackageJson from '@kurrent-ui/icon-manager/package.json';
import iconManagerReadme from '@kurrent-ui/icon-manager/readme.md';

import sequencesPackageJson from '@kurrent-ui/sequences/package.json';
import sequencesReadme from '@kurrent-ui/sequences/readme.md';
import sequencesStencilDocs from '../../../generated/sequences.stencil.json';
import sequencesTypeDocs from '../../../generated/sequences.typedoc.json';

import layoutPackageJson from '@kurrent-ui/layout/package.json';
import layoutReadme from '@kurrent-ui/layout/readme.md';
import layoutStencilDocs from '../../../generated/layout.stencil.json';
import layoutTypeDocs from '../../../generated/layout.typedoc.json';

import routerPackageJson from '@kurrent-ui/router/package.json';
import routerReadme from '@kurrent-ui/router/readme.md';
import routerTypeDocs from '../../../generated/router.typedoc.json';

import storesPackageJson from '@kurrent-ui/stores/package.json';
import storesReadme from '@kurrent-ui/stores/readme.md';
import storesTypeDocs from '../../../generated/stores.typedoc.json';

import themePackageJson from '@kurrent-ui/theme/package.json';
import themeReadme from '@kurrent-ui/theme/readme.md';
import themeTypeDocs from '../../../generated/theme.typedoc.json';

import utilsPackageJson from '@kurrent-ui/utils/package.json';
import utilsReadme from '@kurrent-ui/utils/readme.md';
import utilsTypeDocs from '../../../generated/utils.typedoc.json';

const packageJsons: Record<string, PackageJson> = {
    assets: assetsPackageJson,
    components: componentsPackageJson,
    configs: configsPackageJson,
    editor: editorPackageJson,
    fields: fieldsPackageJson,
    forms: formsPackageJson,
    sequences: sequencesPackageJson,
    'icon-manager': iconManagerPackageJson,
    layout: layoutPackageJson,
    router: routerPackageJson,
    stores: storesPackageJson,
    theme: themePackageJson,
    utils: utilsPackageJson,
} as any;

const readmes: Record<string, string> = {
    assets: assetsReadme,
    components: componentsReadme,
    configs: configsReadme,
    editor: editorReadme,
    fields: fieldsReadme,
    forms: formsReadme,
    sequences: sequencesReadme,
    'icon-manager': iconManagerReadme,
    layout: layoutReadme,
    router: routerReadme,
    stores: storesReadme,
    theme: themeReadme,
    utils: utilsReadme,
} as any;

const stencilDocs: Record<string, JsonDocs> = {
    components: componentsStencilDocs,
    editor: editorStencilDocs,
    fields: fieldsStencilDocs,
    sequences: sequencesStencilDocs,
    layout: layoutStencilDocs,
} as any;

const typeDocs: Record<string, ProjectReflection> = {
    components: componentsTypeDocs,
    editor: editorTypeDocs,
    fields: fieldsTypeDocs,
    forms: formsTypeDocs,
    sequences: sequencesTypeDocs,
    layout: layoutTypeDocs,
    router: routerTypeDocs,
    stores: storesTypeDocs,
    theme: themeTypeDocs,
    utils: utilsTypeDocs,
} as any;

export const getPackageJson = (slug: string) => {
    if (packageJsons[slug]) return packageJsons[slug];
    throw `No package.json imported for ${slug}`;
};
export const getReadme = (slug: string) => {
    if (readmes[slug]) return readmes[slug];
    throw `No readme imported for ${slug}`;
};
export const optionallyGetStencilDocs = (slug: string) => stencilDocs[slug];
export const optionallyGetTypedocs = (slug: string) => typeDocs[slug];
