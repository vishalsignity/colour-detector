import axios from 'axios'
import { hexToHSL, hexToRgb } from '.'
import { IColorList } from './interfaces'

export const getAllColorsAPI = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(
                'https://raw.githubusercontent.com/okmediagroup/color-test-resources/master/xkcd-colors.json'
            )
            .then((response) => {
                const colorInfo = response.data.colors.map(
                    ({ hex, color }: IColorList, index: number) => {
                        const rgba = hexToRgb(hex)
                        const hsl = hexToHSL(hex)
                        return { color, hex, rgba, hsl }
                    }
                )
                resolve(colorInfo)
            })
            .catch((error) => {
                reject(error)
                console.log(error)
            })
    })
}
