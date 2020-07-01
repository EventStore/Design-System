export default {
    title: 'Components/es-icon',
};

// TODO fix tsx imports for storybook, so we can get these dynamically
const icons = [
    'building',
    'ellipsis',
    'folder',
    'plus',
    'signIn',
    'signOut',
    'trash',
    'unknown',
    'userCircle',
    'userCog',
    'caret',
];

export const availableIcons = () => `
<div>
    ${icons.map((key) => `<es-icon icon="${key}" ></es-icon>`).join('\n')}
    <br>
    <div style="line-height: 2">
        <h2>You can add more icons using:</h2>
        
        <code style="background-color: var(--color-grey-50); padding: 5px;">yarn include-icon [name] [rename?]</code>
        <p>
            Available icons can be found 
            <a href="https://fontawesome.com/icons?d=gallery&s=light" target="_blank">here</a>.
        </p>
    </div>
</div>
`;

export const takesCurrentColor = () => `
<div style="color: var(--color-secondary)"> 
    ${icons.map((key) => `<es-icon icon="${key}" ></es-icon>`).join('\n')}
</div>
`;
