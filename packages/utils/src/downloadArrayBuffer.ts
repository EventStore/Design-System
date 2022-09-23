/** Downloads an array buffer as file. */
export const downloadArrayBuffer = (
    /** The file to download. */
    data: ArrayBuffer,
    /** The filename to download as. */
    filename: string,
) => {
    const a = document.createElement('a');
    a.style.display = 'none';
    document.body.appendChild(a);

    const blob = new Blob([new Uint8Array(data)], { type: 'octet/stream' });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    a.parentElement?.removeChild(a);
};
