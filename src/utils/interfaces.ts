export interface IColorList {
    color: string;
    hex: string;
    rgba: string;
    hsl: string;
}

export enum ToasterType {
    INFO = "INFO",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR"
}

export interface ISearch {
    text: string;
    hex: string;
    pickerValue: string;
}
