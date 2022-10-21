export interface IColorList {
    color: string
    hex: string
    rgba: string
    hsl: string
}

export enum ToasterType {
    INFO = 'INFO',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export interface ISearch {
    hex: string
    pickerValue: string
}

export interface IColorListFullDetail {
    list: IColorList[]
    sorted: IColorList[]
}
