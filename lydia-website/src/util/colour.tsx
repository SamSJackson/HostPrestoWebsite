export function rgbFormat(r : number, g : number, b : number) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
};

export function getRgb(rgb : string) : [number, number, number] {
    const splitRgb = rgb.split(",");
    const r = parseInt(splitRgb[0].slice(4));
    const g = parseInt(splitRgb[1].trim());
    const b = parseInt(splitRgb[2].slice(0, -1).trim());
    return [r,g,b];
};

export function hslFormat(h : number, s : number, l : number) {
    return `hsl(${h}, ${s}%, ${l}%)`;
}
