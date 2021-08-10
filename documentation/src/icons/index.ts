import { iconStore } from '@eventstore/components';

iconStore.addIcons({
    get 'angle-down'() {
        return import('./components/AngleDown').then(
            (module) => module.AngleDown,
        );
    },
    get backups() {
        return import('./components/Backups').then((module) => module.Backups);
    },
    get bell() {
        return import('./components/Bell').then((module) => module.Bell);
    },
    get bubbles() {
        return import('./components/Bubbles').then((module) => module.Bubbles);
    },
    get building() {
        return import('./components/Building').then(
            (module) => module.Building,
        );
    },
    get cancelable() {
        return import('./components/Cancelable').then(
            (module) => module.Cancelable,
        );
    },
    get caret() {
        return import('./components/Caret').then((module) => module.Caret);
    },
    get check() {
        return import('./components/Check').then((module) => module.Check);
    },
    get chevron() {
        return import('./components/Chevron').then((module) => module.Chevron);
    },
    get circle() {
        return import('./components/Circle').then((module) => module.Circle);
    },
    get close() {
        return import('./components/Close').then((module) => module.Close);
    },
    get clusters() {
        return import('./components/Clusters').then(
            (module) => module.Clusters,
        );
    },
    get cog() {
        return import('./components/Cog').then((module) => module.Cog);
    },
    get components() {
        return import('./components/Components').then(
            (module) => module.Components,
        );
    },
    get '@eventstore/components'() {
        return this['components'];
    },
    get configs() {
        return import('./components/Configs').then((module) => module.Configs);
    },
    get '@eventstore/configs'() {
        return this['configs'];
    },
    get copy() {
        return import('./components/Copy').then((module) => module.Copy);
    },
    get 'credit-card'() {
        return import('./components/CreditCard').then(
            (module) => module.CreditCard,
        );
    },
    get critical() {
        return import('./components/Critical').then(
            (module) => module.Critical,
        );
    },
    get degraded() {
        return import('./components/Degraded').then(
            (module) => module.Degraded,
        );
    },
    get editor() {
        return import('./components/Editor').then((module) => module.Editor);
    },
    get '@eventstore/editor'() {
        return this['editor'];
    },
    get ellipsis() {
        return import('./components/Ellipsis').then(
            (module) => module.Ellipsis,
        );
    },
    get error() {
        return import('./components/Error').then((module) => module.Error);
    },
    get eye() {
        return import('./components/Eye').then((module) => module.Eye);
    },
    get fields() {
        return import('./components/Fields').then((module) => module.Fields);
    },
    get '@eventstore/fields'() {
        return this['fields'];
    },
    get folder() {
        return import('./components/Folder').then((module) => module.Folder);
    },
    get gift() {
        return import('./components/Gift').then((module) => module.Gift);
    },
    get 'go-back'() {
        return import('./components/GoBack').then((module) => module.GoBack);
    },
    get 'icon-manager'() {
        return import('./components/IconManager').then(
            (module) => module.IconManager,
        );
    },
    get '@eventstore/icon-manager'() {
        return this['icon-manager'];
    },
    get 'id-card'() {
        return import('./components/IdCard').then((module) => module.IdCard);
    },
    get info() {
        return import('./components/Info').then((module) => module.Info);
    },
    get invite() {
        return import('./components/Invite').then((module) => module.Invite);
    },
    get light() {
        return import('./components/Light').then((module) => module.Light);
    },
    get lightbulb() {
        return import('./components/Lightbulb').then(
            (module) => module.Lightbulb,
        );
    },
    get markdown() {
        return import('./components/Markdown').then(
            (module) => module.Markdown,
        );
    },
    get '@eventstore/stencil-markdown-plugin'() {
        return this['markdown'];
    },
    get 'stencil-markdown-plugin'() {
        return this['markdown'];
    },
    get mutable() {
        return import('./components/Mutable').then((module) => module.Mutable);
    },
    get networks() {
        return import('./components/Networks').then(
            (module) => module.Networks,
        );
    },
    get okay() {
        return import('./components/Okay').then((module) => module.Okay);
    },
    get peering() {
        return import('./components/Peering').then((module) => module.Peering);
    },
    get pen() {
        return import('./components/Pen').then((module) => module.Pen);
    },
    get plus() {
        return import('./components/Plus').then((module) => module.Plus);
    },
    get 'postcss-palette-plugin'() {
        return import('./components/PostcssPalettePlugin').then(
            (module) => module.PostcssPalettePlugin,
        );
    },
    get '@eventstore/postcss-palette-plugin'() {
        return this['postcss-palette-plugin'];
    },
    get question() {
        return import('./components/Question').then(
            (module) => module.Question,
        );
    },
    get optional() {
        return this['question'];
    },
    get 'reflect-to-attr'() {
        return import('./components/ReflectToAttr').then(
            (module) => module.ReflectToAttr,
        );
    },
    get refresh() {
        return import('./components/Refresh').then((module) => module.Refresh);
    },
    get required() {
        return import('./components/Required').then(
            (module) => module.Required,
        );
    },
    get rocket() {
        return import('./components/Rocket').then((module) => module.Rocket);
    },
    get composed() {
        return this['rocket'];
    },
    get router() {
        return import('./components/Router').then((module) => module.Router);
    },
    get '@eventstore/router'() {
        return this['router'];
    },
    get scroll() {
        return import('./components/Scroll').then((module) => module.Scroll);
    },
    get shadow() {
        return import('./components/Shadow').then((module) => module.Shadow);
    },
    get shield() {
        return import('./components/Shield').then((module) => module.Shield);
    },
    get 'sign-in'() {
        return import('./components/SignIn').then((module) => module.SignIn);
    },
    get 'sign-out'() {
        return import('./components/SignOut').then((module) => module.SignOut);
    },
    get signs() {
        return import('./components/Signs').then((module) => module.Signs);
    },
    get spinner() {
        return import('./components/Spinner').then((module) => module.Spinner);
    },
    get stores() {
        return import('./components/Stores').then((module) => module.Stores);
    },
    get '@eventstore/stores'() {
        return this['stores'];
    },
    get 'testing-icon'() {
        return import('./components/TestingIcon').then(
            (module) => module.TestingIcon,
        );
    },
    get trash() {
        return import('./components/Trash').then((module) => module.Trash);
    },
    get unknown() {
        return import('./components/Unknown').then((module) => module.Unknown);
    },
    get user() {
        return import('./components/User').then((module) => module.User);
    },
    get 'user-circle'() {
        return import('./components/UserCircle').then(
            (module) => module.UserCircle,
        );
    },
    get 'user-cog'() {
        return import('./components/UserCog').then((module) => module.UserCog);
    },
    get 'user-edit'() {
        return import('./components/UserEdit').then(
            (module) => module.UserEdit,
        );
    },
    get 'user-shield'() {
        return import('./components/UserShield').then(
            (module) => module.UserShield,
        );
    },
    get users() {
        return import('./components/Users').then((module) => module.Users);
    },
    get utils() {
        return import('./components/Utils').then((module) => module.Utils);
    },
    get '@eventstore/utils'() {
        return this['utils'];
    },
    get warning() {
        return import('./components/Warning').then((module) => module.Warning);
    },
});
