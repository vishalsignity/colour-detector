import React from 'react'
import { Button, Col, Row, Table } from 'reactstrap'
import { IColorList, IColorListFullDetail } from '../../utils/interfaces';
import style from "./ColorTable.module.css";

interface IProps {
    searchingText: string;
    colorList: IColorListFullDetail;
    columnList: string[];
    getColorInfo: () => void;
}

function ColorTable(props: IProps) {
    const { searchingText, colorList, columnList, getColorInfo } = props;

    return (
        <Row>
            <Col lg="12" md="12" sm="12">
                {colorList.list.length === 0 && (
                    <div className='text-center'>
                        <Button type='button' className='btn-md btn-success' onClick={getColorInfo}>Retry</Button>
                    </div>
                )}
                <Table borderless className={style.ColorTable__tableContainer}>
                    <thead>
                        <tr>
                            {(colorList.list.length > 0 || colorList.sorted.length > 0) && columnList.map((name, index) => (
                                <th key={index} className={style.ColorTable__heading}>
                                    {name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchingText ?
                                <>
                                    {colorList.sorted.length > 0 && colorList.sorted.map(({ color, hex, rgba, hsl }: IColorList, index: number) => (
                                        <tr key={index}>
                                            <td style={{ backgroundColor: hex }} className={style.ColorTable__plate}></td>
                                            <td>
                                                {color}
                                            </td>
                                            <td>
                                                {hex}
                                            </td>
                                            <td>
                                                {rgba}
                                            </td>
                                            <td>
                                                {hsl}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                                :
                                <>
                                    {colorList.list.length > 0 && colorList.list.map(({ color, hex, rgba, hsl }: IColorList, index: number) => (
                                        <tr key={index}>
                                            <td style={{ backgroundColor: hex }} className={style.ColorTable__plate}></td>
                                            <td>
                                                {color}
                                            </td>
                                            <td>
                                                {hex}
                                            </td>
                                            <td>
                                                {rgba}
                                            </td>
                                            <td>
                                                {hsl}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                        }
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default ColorTable
