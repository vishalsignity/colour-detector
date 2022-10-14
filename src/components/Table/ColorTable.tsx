import React from 'react'
import { Col, Row, Table } from 'reactstrap'
import { IColorList } from '../../utils/interfaces';
import style from "./ColorTable.module.css";

interface IProps {
    colorList: IColorList[];
    columnList: string[];
}

function ColorTable(props: IProps) {
    const { colorList, columnList } = props;

    return (
        <Row>
            <Col lg="12" md="12" sm="12">
                <Table borderless className={style.ColorTable__tableContainer}>
                    <thead>
                        <tr>
                            {colorList.length > 0 && columnList.map((name, index) => (
                                <th key={index} className={style.ColorTable__heading}>
                                    {name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            colorList.length > 0
                            && colorList.map(({ color, hex, rgba, hsl }: IColorList, index: number) => (
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
                            ))
                        }
                    </tbody>
                </Table>
            </Col>
        </Row>
    )
}

export default ColorTable
