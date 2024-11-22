import type { JsonDocs } from '@stencil/core/internal';
import type { ProjectReflection } from 'typedoc';
import type { PackageJson } from '.';

import assetsPackageJson from '@eventstore-ui/assets/package.json';
import assetsReadme from '@eventstore-ui/assets/readme.md';

import componentsPackageJson from '@eventstore-ui/components/package.json';
import componentsReadme from '@eventstore-ui/components/readme.md';
import componentsStencilDocs from '../../../generated/components.stencil.json';
import componentsTypeDocs from '../../../generated/components.typedoc.json';

import configsPackageJson from '@eventstore-ui/configs/package.json';
import configsReadme from '@eventstore-ui/configs/readme.md';

import editorPackageJson from '@eventstore-ui/editor/package.json';
import editorReadme from '@eventstore-ui/editor/readme.md';
import editorStencilDocs from '../../../generated/editor.stencil.json';
import editorTypeDocs from '../../../generated/editor.typedoc.json';

import fieldsPackageJson from '@eventstore-ui/fields/package.json';
import fieldsReadme from '@eventstore-ui/fields/readme.md';
import fieldsStencilDocs from '../../../generated/fields.stencil.json';
import fieldsTypeDocs from '../../../generated/fields.typedoc.json';

import formsPackageJson from '@eventstore-ui/forms/package.json';
import formsReadme from '@eventstore-ui/forms/readme.md';
import formsTypeDocs from '../../../generated/forms.typedoc.json';

import iconManagerPackageJson from '@eventstore-ui/icon-manager/package.json';
import iconManagerReadme from '@eventstore-ui/icon-manager/readme.md';

import illustrationsPackageJson from '@eventstore-ui/illustrations/package.json';
import illustrationsReadme from '@eventstore-ui/illustrations/readme.md';
import illustrationsStencilDocs from '../../../generated/illustrations.stencil.json';
import illustrationsTypeDocs from '../../../generated/illustrations.typedoc.json';

import layoutPackageJson from '@eventstore-ui/layout/package.json';
import layoutReadme from '@eventstore-ui/layout/readme.md';
import layoutStencilDocs from '../../../generated/layout.stencil.json';
import layoutTypeDocs from '../../../generated/layout.typedoc.json';

import routerPackageJson from '@eventstore-ui/router/package.json';
import routerReadme from '@eventstore-ui/router/readme.md';
import routerTypeDocs from '../../../generated/router.typedoc.json';

import storesPackageJson from '@eventstore-ui/stores/package.json';
import storesReadme from '@eventstore-ui/stores/readme.md';
import storesTypeDocs from '../../../generated/stores.typedoc.json';

import themePackageJson from '@kurrent-ui/theme/package.json';
import themeReadme from '@kurrent-ui/theme/readme.md';
import themeTypeDocs from '../../../generated/theme.typedoc.json';

import utilsPackageJson from '@eventstore-ui/utils/package.json';
import utilsReadme from '@eventstore-ui/utils/readme.md';
import utilsTypeDocs from '../../../generated/utils.typedoc.json';

const packageJsons: Record<string, PackageJson> = {
    assets: assetsPackageJson,
    components: componentsPackageJson,
    configs: configsPackageJson,
    editor: editorPackageJson,
    fields: fieldsPackageJson,
    forms: formsPackageJson,
    illustrations: illustrationsPackageJson,
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
    illustrations: illustrationsReadme,
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
    illustrations: illustrationsStencilDocs,
    layout: layoutStencilDocs,
} as any;

const typeDocs: Record<string, ProjectReflection> = {
    components: componentsTypeDocs,
    editor: editorTypeDocs,
    fields: fieldsTypeDocs,
    forms: formsTypeDocs,
    illustrations: illustrationsTypeDocs,
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
