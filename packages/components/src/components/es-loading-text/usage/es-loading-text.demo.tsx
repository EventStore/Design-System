import { Component, h, Host, State } from '@stencil/core';
import { LoadingText } from '../LoadingText';

/**
 * es-loading-text & LoadingText demo
 */
@Component({
    tag: 'es-loading-text-demo',
    shadow: true,
})
export class LoadingTextDemo {
    @State() texts: string[] = [];

    componentDidLoad() {
        setTimeout(() => {
            this.texts = [
                'hello',
                'there',
                'this',
                'is',
                'some',
                'loaded',
                'text',
                'it has loaded!',
            ];
        }, 5000);
    }

    render() {
        return (
            <Host style={{ display: 'block', padding: '20px' }}>
                <h1>{'Basic usage'}</h1>
                <es-loading-text expectedLength={12} />
                <h1>{'Variance'}</h1>
                <ul>
                    {Array.from({ length: 8 }, () => (
                        <li style={{ padding: '4px' }}>
                            <es-loading-text
                                expectedLength={12}
                                variance={10}
                            />
                        </li>
                    ))}
                </ul>

                <h1>{'<LoadingText />'}</h1>
                <ul>
                    {Array.from({ length: 8 }, (_, i) => (
                        <li style={{ padding: '4px' }}>
                            <LoadingText
                                copy={i === 0}
                                expectedLength={12}
                                variance={10}
                            >
                                {this.texts[i]}
                            </LoadingText>
                        </li>
                    ))}
                </ul>
            </Host>
        );
    }
}
