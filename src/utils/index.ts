import { IColorList, ToasterType } from './interfaces'
import { toaster } from './toaster'

// Hex color code to RGB code
export const hexToRgb = (hex: string) => {
    let value: any
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        value = hex.substring(1).split('')
        if (value.length === 3) {
            value = [value[0], value[0], value[1], value[1], value[2], value[2]]
        }
        value = '0x' + value.join('')
        return [(value >> 16) & 255, (value >> 8) & 255, value & 255].join(',')
    }
    throw new Error('Bad Hex')
}

// Hex color code to HSL code
export const hexToHSL = (H: string) => {
    // Convert hex to RGB first
    let r: any, g: any, b: any
    if (H.length === 4) {
        r = '0x' + H[1] + H[1]
        g = '0x' + H[2] + H[2]
        b = '0x' + H[3] + H[3]
    } else if (H.length === 7) {
        r = '0x' + H[1] + H[2]
        g = '0x' + H[3] + H[4]
        b = '0x' + H[5] + H[6]
    }
    // Then to HSL
    r /= 255
    g /= 255
    b /= 255
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0

    if (delta === 0) h = 0
    else if (cmax === r) h = ((g - b) / delta) % 6
    else if (cmax === g) h = (b - r) / delta + 2
    else h = (r - g) / delta + 4

    h = Math.round(h * 60)

    if (h < 0) h += 360

    l = (cmax + cmin) / 2
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
    s = +(s * 100).toFixed(1)
    l = +(l * 100).toFixed(1)

    return h + ',' + Math.floor(s) + ',' + Math.floor(l)
}

// Detect similar colours from hex values

export const hexColorDelta = (hex1: string, hex2: string) => {
    // get red/green/blue int values of hex1
    const r1 = parseInt(hex1.substring(0, 2), 16),
        g1 = parseInt(hex1.substring(2, 4), 16),
        b1 = parseInt(hex1.substring(4, 6), 16)
    // get red/green/blue int values of hex2
    const r2 = parseInt(hex2.substring(0, 2), 16),
        g2 = parseInt(hex2.substring(2, 4), 16),
        b2 = parseInt(hex2.substring(4, 6), 16)
    // calculate differences between reds, greens and blues
    let r = 255 - Math.abs(r1 - r2),
        g = 255 - Math.abs(g1 - g2),
        b = 255 - Math.abs(b1 - b2)
    // limit differences between 0 and 1
    r /= 255
    g /= 255
    b /= 255
    // 0 means opposite colors, 1 means same colors
    return (r + g + b) / 3
}

// Convert rgb to hex code
export const rgbToHex = (r: number, g: number, b: number) => {
    let outParts = [r.toString(16), g.toString(16), b.toString(16)]

    outParts.forEach(function (part, i) {
        if (part.length === 1) {
            outParts[i] = '0' + part
        }
    })

    return outParts.join('')
}

export const getSimilarColorsByHex = (hex: string, colorList: IColorList[]) => {
    let sortedlist: IColorList[] = []
    colorList.forEach((list) => {
        const similarColors = hexColorDelta(hex, list.hex.split('#')[1])
        if (similarColors > 0.95) {
            sortedlist.push(list)
        }
    })
    if (sortedlist.length > 0) {
        const sortedInfo = sortedlist.slice(0, 100)
        return sortedInfo
    } else {
        toaster(ToasterType.ERROR, 'Colour is invalid')
        return []
    }
}

export const searchColour = (enteredText: string, colorList: IColorList[]) => {
    let sortedColorList: IColorList[]
    if (enteredText?.charAt(0) === '#') {
        const hex = enteredText.split('#')[1]
        sortedColorList = getSimilarColorsByHex(hex, colorList)
        return { hex: `#${hex}`, sortedColorList }
    } else if (enteredText?.substring(0, 3) === 'rgb') {
        const rgbValue = enteredText
                ?.slice(4, enteredText.length - 1)
                .split(','),
            r = parseInt(rgbValue[0]),
            g = parseInt(rgbValue[1]),
            b = parseInt(rgbValue[2]),
            rgbToHexValue = rgbToHex(r, g, b)
        sortedColorList = getSimilarColorsByHex(rgbToHexValue, colorList)
        return { hex: `#${rgbToHexValue}`, sortedColorList }
    } else {
        toaster(ToasterType.ERROR, 'Colour is invalid')
        return { hex: '', sortedColorList: [] }
    }
}
