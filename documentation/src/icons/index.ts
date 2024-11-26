import { iconStore } from '@eventstore-ui/components';

iconStore.addIcons({
    get arrow() {
        return import('./components/Arrow').then(({ Arrow }) => Arrow);
    },
    get assets() {
        return import('./components/Assets').then(({ Assets }) => Assets);
    },
    get '@kurrent-ui/assets'() {
        return this['assets'];
    },
    get backups() {
        return import('./components/Backups').then(({ Backups }) => Backups);
    },
    get bell() {
        return import('./components/Bell').then(({ Bell }) => Bell);
    },
    get bubbles() {
        return import('./components/Bubbles').then(({ Bubbles }) => Bubbles);
    },
    get cancelable() {
        return import('./components/Cancelable').then(
            ({ Cancelable }) => Cancelable,
        );
    },
    get caret() {
        return import('./components/Caret').then(({ Caret }) => Caret);
    },
    get check() {
        return import('./components/Check').then(({ Check }) => Check);
    },
    get chevron() {
        return import('./components/Chevron').then(({ Chevron }) => Chevron);
    },
    get circle() {
        return import('./components/Circle').then(({ Circle }) => Circle);
    },
    get close() {
        return import('./components/Close').then(({ Close }) => Close);
    },
    get clusters() {
        return import('./components/Clusters').then(({ Clusters }) => Clusters);
    },
    get cog() {
        return import('./components/Cog').then(({ Cog }) => Cog);
    },
    get components() {
        return import('./components/Components').then(
            ({ Components }) => Components,
        );
    },
    get '@eventstore-ui/components'() {
        return this['components'];
    },
    get configs() {
        return import('./components/Configs').then(({ Configs }) => Configs);
    },
    get '@kurrent-ui/configs'() {
        return this['configs'];
    },
    get copy() {
        return import('./components/Copy').then(({ Copy }) => Copy);
    },
    get 'credit-card'() {
        return import('./components/CreditCard').then(
            ({ CreditCard }) => CreditCard,
        );
    },
    get critical() {
        return import('./components/Critical').then(({ Critical }) => Critical);
    },
    get degraded() {
        return import('./components/Degraded').then(({ Degraded }) => Degraded);
    },
    get editor() {
        return import('./components/Editor').then(({ Editor }) => Editor);
    },
    get '@kurrent-ui/editor'() {
        return this['editor'];
    },
    get error() {
        return import('./components/Error').then(({ Error }) => Error);
    },
    get eye() {
        return import('./components/Eye').then(({ Eye }) => Eye);
    },
    get fields() {
        return import('./components/Fields').then(({ Fields }) => Fields);
    },
    get '@eventstore-ui/fields'() {
        return this['fields'];
    },
    get folder() {
        return import('./components/Folder').then(({ Folder }) => Folder);
    },
    get forms() {
        return import('./components/Forms').then(({ Forms }) => Forms);
    },
    get '@kurrent-ui/forms'() {
        return this['forms'];
    },
    get gift() {
        return import('./components/Gift').then(({ Gift }) => Gift);
    },
    get github() {
        return import('./components/Github').then(({ Github }) => Github);
    },
    get 'go-back'() {
        return import('./components/GoBack').then(({ GoBack }) => GoBack);
    },
    get head() {
        return import('./components/Head').then(({ Head }) => Head);
    },
    get heads() {
        return this['head'];
    },
    get 'icon-manager'() {
        return import('./components/IconManager').then(
            ({ IconManager }) => IconManager,
        );
    },
    get '@kurrent-ui/icon-manager'() {
        return this['icon-manager'];
    },
    get 'id-card'() {
        return import('./components/IdCard').then(({ IdCard }) => IdCard);
    },
    get info() {
        return import('./components/Info').then(({ Info }) => Info);
    },
    get invite() {
        return import('./components/Invite').then(({ Invite }) => Invite);
    },
    get layout() {
        return import('./components/Layout').then(({ Layout }) => Layout);
    },
    get '@kurrent-ui/layout'() {
        return this['layout'];
    },
    get light() {
        return import('./components/Light').then(({ Light }) => Light);
    },
    get lightbulb() {
        return import('./components/Lightbulb').then(
            ({ Lightbulb }) => Lightbulb,
        );
    },
    get markdown() {
        return import('./components/Markdown').then(({ Markdown }) => Markdown);
    },
    get more() {
        return import('./components/More').then(({ More }) => More);
    },
    get mutable() {
        return import('./components/Mutable').then(({ Mutable }) => Mutable);
    },
    get networks() {
        return import('./components/Networks').then(({ Networks }) => Networks);
    },
    get okay() {
        return import('./components/Okay').then(({ Okay }) => Okay);
    },
    get peering() {
        return import('./components/Peering').then(({ Peering }) => Peering);
    },
    get pen() {
        return import('./components/Pen').then(({ Pen }) => Pen);
    },
    get plus() {
        return import('./components/Plus').then(({ Plus }) => Plus);
    },
    get 'postcss-palette-plugin'() {
        return import('./components/PostcssPalettePlugin').then(
            ({ PostcssPalettePlugin }) => PostcssPalettePlugin,
        );
    },
    get '@eventstore-ui/postcss-palette-plugin'() {
        return this['postcss-palette-plugin'];
    },
    get 'reflect-to-attr'() {
        return import('./components/ReflectToAttr').then(
            ({ ReflectToAttr }) => ReflectToAttr,
        );
    },
    get refresh() {
        return import('./components/Refresh').then(({ Refresh }) => Refresh);
    },
    get required() {
        return import('./components/Required').then(({ Required }) => Required);
    },
    get rocket() {
        return import('./components/Rocket').then(({ Rocket }) => Rocket);
    },
    get composed() {
        return this['rocket'];
    },
    get router() {
        return import('./components/Router').then(({ Router }) => Router);
    },
    get '@eventstore-ui/router'() {
        return this['router'];
    },
    get scroll() {
        return import('./components/Scroll').then(({ Scroll }) => Scroll);
    },
    get sequences() {
        return import('./components/Sequences').then(
            ({ Sequences }) => Sequences,
        );
    },
    get '@kurrent-ui/sequences'() {
        return this['sequences'];
    },
    get shadow() {
        return import('./components/Shadow').then(({ Shadow }) => Shadow);
    },
    get shield() {
        return import('./components/Shield').then(({ Shield }) => Shield);
    },
    get 'sign-in'() {
        return import('./components/SignIn').then(({ SignIn }) => SignIn);
    },
    get 'sign-out'() {
        return import('./components/SignOut').then(({ SignOut }) => SignOut);
    },
    get signs() {
        return import('./components/Signs').then(({ Signs }) => Signs);
    },
    get spinner() {
        return import('./components/Spinner').then(({ Spinner }) => Spinner);
    },
    get stores() {
        return import('./components/Stores').then(({ Stores }) => Stores);
    },
    get '@kurrent-ui/stores'() {
        return this['stores'];
    },
    get theme() {
        return import('./components/Theme').then(({ Theme }) => Theme);
    },
    get '@kurrent-ui/theme'() {
        return this['theme'];
    },
    get trash() {
        return import('./components/Trash').then(({ Trash }) => Trash);
    },
    get unicorn() {
        return import('./components/Unicorn').then(({ Unicorn }) => Unicorn);
    },
    get tails() {
        return this['unicorn'];
    },
    get user() {
        return import('./components/User').then(({ User }) => User);
    },
    get 'user-circle'() {
        return import('./components/UserCircle').then(
            ({ UserCircle }) => UserCircle,
        );
    },
    get 'user-cog'() {
        return import('./components/UserCog').then(({ UserCog }) => UserCog);
    },
    get 'user-edit'() {
        return import('./components/UserEdit').then(({ UserEdit }) => UserEdit);
    },
    get 'user-shield'() {
        return import('./components/UserShield').then(
            ({ UserShield }) => UserShield,
        );
    },
    get users() {
        return import('./components/Users').then(({ Users }) => Users);
    },
    get utils() {
        return import('./components/Utils').then(({ Utils }) => Utils);
    },
    get '@kurrent-ui/utils'() {
        return this['utils'];
    },
    get warning() {
        return import('./components/Warning').then(({ Warning }) => Warning);
    },
});
