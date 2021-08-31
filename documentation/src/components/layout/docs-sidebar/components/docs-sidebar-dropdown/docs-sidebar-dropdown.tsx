import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { AccordianSection } from '@eventstore/components';

import { Lib, sitemap } from 'sitemap';

@Component({
    tag: 'docs-sidebar-dropdown',
    styleUrl: 'docs-sidebar-dropdown.css',
    shadow: true,
})
export class SidebarDropdown {
    @Prop() active!: Lib;

    @State() dropdownOpen: boolean = false;
    @State() activeSection?: string;

    @Watch('active')
    componentWillLoad() {
        const { slug } = this.active;
        this.activeSection = sitemap.find(({ children }) =>
            children.some((section) => section.slug === slug),
        )?.title;
    }

    renderDialog = () => (
        <es-popover
            backdrop
            open={this.dropdownOpen}
            onRequestClose={this.closeDropdown}
            popperClass={'popper'}
            attachmentY={'top'}
            positionY={'bottom'}
            offsetY={17}
            attachmentX={'left'}
            positionX={'left'}
            trapFocus
        >
            <es-accordian sections={this.getSections()}>
                {sitemap.map(({ title, children }) => (
                    <menu slot={title.replace(' ', '-')}>
                        {children.map(({ title, packageJson, slug }) => (
                            <menuitem
                                key={slug}
                                class={{ active: this.active.slug === slug }}
                            >
                                <es-button-link
                                    onClick={this.closeDropdown}
                                    variant={'minimal'}
                                    url={`/${slug}`}
                                >
                                    <es-icon
                                        icon={packageJson.name}
                                        slot={'before'}
                                    />
                                    <span>{title}</span>
                                </es-button-link>
                            </menuitem>
                        ))}
                    </menu>
                ))}
            </es-accordian>
        </es-popover>
    );

    render() {
        const { title, packageJson } = this.active;
        return (
            <Host>
                <es-button
                    onClick={this.openDropdown}
                    class={{ sidebar_button: true, open: this.dropdownOpen }}
                    variant={'minimal'}
                >
                    <es-icon icon={packageJson.name} slot={'before'} />

                    <span class={'truncate'}>{title}</span>

                    <es-icon
                        icon={'caret'}
                        slot={'after'}
                        class={{ caret: true, open: this.dropdownOpen }}
                        size={14}
                    />
                </es-button>

                {this.renderDialog()}
            </Host>
        );
    }

    private getSections = (): AccordianSection[] =>
        sitemap.map(({ title }) => ({
            name: title.replace(' ', '-'),
            title: title,
            variant: 'text',
        }));

    private openDropdown = (e: MouseEvent) => {
        e.stopPropagation();
        this.dropdownOpen = true;
    };

    private closeDropdown = (e: CustomEvent | MouseEvent) => {
        e.stopPropagation();
        this.dropdownOpen = false;
    };
}
