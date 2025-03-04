import {
    h,
    Component,
    type ComponentInterface,
    Prop,
    State,
} from '@stencil/core';
import {
    type RouterHistory,
    type MatchResults,
    Link,
} from '@kurrent-ui/router';

@Component({
    tag: 'test-route-guard',
})
export class TestRouteGuard implements ComponentInterface {
    @Prop() pages?: string[];
    @Prop() match: MatchResults | null = null;
    @Prop() history?: RouterHistory;

    @State() routeGuardBlock: boolean = true;

    toggleRouteGuard = () => {
        this.routeGuardBlock = !this.routeGuardBlock;
    };

    render() {
        return (
            <div>
                <stencil-router-prompt
                    when={this.routeGuardBlock}
                    message={'you are still editing'}
                ></stencil-router-prompt>

                {this.routeGuardBlock ? (
                    <span>You are currently blocked</span>
                ) : (
                    <span>Go freely about your business</span>
                )}
                <br />
                <br />
                <button onClick={this.toggleRouteGuard}>
                    {this.routeGuardBlock ? 'Unblock' : 'Block'}
                </button>
                <br />
                <br />
                <Link url="/demo6/asdf">Next</Link>
            </div>
        );
    }
}
