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
    get building() {
        return import('./components/Building').then(
            (module) => module.Building,
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
    get folder() {
        return import('./components/Folder').then((module) => module.Folder);
    },
    get gift() {
        return import('./components/Gift').then((module) => module.Gift);
    },
    get 'go-back'() {
        return import('./components/GoBack').then((module) => module.GoBack);
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
    get refresh() {
        return import('./components/Refresh').then((module) => module.Refresh);
    },
    get scroll() {
        return import('./components/Scroll').then((module) => module.Scroll);
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
    get warning() {
        return import('./components/Warning').then((module) => module.Warning);
    },
});
