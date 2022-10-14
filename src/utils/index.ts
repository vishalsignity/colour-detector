// Hex color code to RGB code
export const hexToRgb = (hex: string) => {
    let value: any;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        value = hex.substring(1).split('');
        if (value.length === 3) {
            value = [value[0], value[0], value[1], value[1], value[2], value[2]];
        }
        value = '0x' + value.join('');
        return [(value >> 16) & 255, (value >> 8) & 255, value & 255].join(',');
    }
    throw new Error('Bad Hex');
}

// Hex color code to HSL code
export const hexToHSL = (H: string) => {
    // Convert hex to RGB first
    let r: any, g: any, b: any;
    if (H.length === 4) {
        r = "0x" + H[1] + H[1];
        g = "0x" + H[2] + H[2];
        b = "0x" + H[3] + H[3];
    } else if (H.length === 7) {
        r = "0x" + H[1] + H[2];
        g = "0x" + H[3] + H[4];
        b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    if (delta === 0)
        h = 0;
    else if (cmax === r)
        h = ((g - b) / delta) % 6;
    else if (cmax === g)
        h = (b - r) / delta + 2;
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0)
        h += 360;

    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return h + "," + Math.floor(s) + "," + Math.floor(l);
}

// Detect similar colours from hex values

export const hexColorDelta = (hex1: any, hex2: any) => {
    // get red/green/blue int values of hex1
    var r1 = parseInt(hex1.substring(0, 2), 16);
    var g1 = parseInt(hex1.substring(2, 4), 16);
    var b1 = parseInt(hex1.substring(4, 6), 16);
    // get red/green/blue int values of hex2
    var r2 = parseInt(hex2.substring(0, 2), 16);
    var g2 = parseInt(hex2.substring(2, 4), 16);
    var b2 = parseInt(hex2.substring(4, 6), 16);
    // calculate differences between reds, greens and blues
    var r = 255 - Math.abs(r1 - r2);
    var g = 255 - Math.abs(g1 - g2);
    var b = 255 - Math.abs(b1 - b2);
    // limit differences between 0 and 1
    r /= 255;
    g /= 255;
    b /= 255;
    // 0 means opposite colors, 1 means same colors
    return (r + g + b) / 3;
}

// Convert rgb to hex code
export const rgbToHex = (r: number, g: number, b: number) => {
    var outParts = [
        r.toString(16),
        g.toString(16),
        b.toString(16)
    ];

    outParts.forEach(function (part, i) {
        if (part.length === 1) {
            outParts[i] = "0" + part;
        }
    });

    return outParts.join("");
}
