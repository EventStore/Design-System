export type AttachmentY = 'top' | 'middle' | 'bottom';
export type PositionY = 'top' | 'middle' | 'bottom';
export type AttachmentX = 'right' | 'middle' | 'left';
export type PositionX = 'right' | 'middle' | 'left';
export type Constrain = 'none' | 'width' | 'height' | 'both';

export interface Position {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    width?: number;
    height?: number;
}
interface AttachmentInformation {
    attachmentY: AttachmentY;
    positionY: PositionY;
    offsetY: number;

    attachmentX: AttachmentX;
    positionX: PositionX;
    offsetX: number;

    constrain: Constrain;
}

const calcPosition = (
    clientRect: ClientRect,
    {
        attachmentY,
        positionY,
        offsetY,
        attachmentX,
        positionX,
        offsetX,
        constrain,
    }: AttachmentInformation,
) => {
    const position: Position = {};

    if (attachmentY === 'top') {
        switch (positionY) {
            case 'top': {
                position.top = clientRect.top;
                break;
            }
            case 'middle': {
                position.top = clientRect.top + clientRect.height / 2;
                break;
            }
            case 'bottom': {
                position.top = clientRect.bottom;
                break;
            }
        }

        position.top! += offsetY;
    }

    if (attachmentY === 'bottom') {
        switch (positionY) {
            case 'top': {
                position.bottom = window.innerHeight - clientRect.top;
                break;
            }
            case 'middle': {
                position.bottom =
                    window.innerHeight - clientRect.top - clientRect.height / 2;
                break;
            }
            case 'bottom': {
                position.bottom = window.innerHeight - clientRect.bottom;
                break;
            }
        }

        position.bottom! += offsetY;
    }

    if (attachmentX === 'right') {
        switch (positionX) {
            case 'left': {
                position.right = window.innerWidth - clientRect.left;
                break;
            }
            case 'middle': {
                position.right = clientRect.right - clientRect.width / 2;
                break;
            }
            case 'right': {
                position.right = window.innerWidth - clientRect.right;
                break;
            }
        }

        position.right! += offsetX;
    }

    if (attachmentX === 'left') {
        switch (positionX) {
            case 'left': {
                position.left = clientRect.left;
                break;
            }
            case 'middle': {
                position.left = clientRect.right - clientRect.width / 2;
                break;
            }
            case 'right': {
                position.left = clientRect.right;
                break;
            }
        }

        position.left! += offsetX;
    }

    if (constrain === 'height' || constrain === 'both') {
        position.height = clientRect.height;
    }

    if (constrain === 'width' || constrain === 'both') {
        position.width = clientRect.width;
    }

    return position;
};

export { calcPosition };
