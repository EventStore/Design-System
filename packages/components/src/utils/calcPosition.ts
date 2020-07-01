export interface Position {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}
interface AttachmentInformation {
    attachmentY: string;
    positionY: string;
    offsetY: number;

    attachmentX: string;
    positionX: string;
    offsetX: number;
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

    return position;
};

export { calcPosition };
