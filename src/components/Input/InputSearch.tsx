import React, { useState } from 'react'
import { Col, Input, Label, Row } from 'reactstrap'
import { hexColorDelta, rgbToHex } from '../../utils';
import { IColorList, ToasterType } from '../../utils/interfaces';
import { toaster } from '../../utils/toaster';

interface IProps {
    colorList: IColorList[];
    setColorList: (value: IColorList[]) => void;
    getColorInfo: () => void;
}

function InputSearch(props: IProps) {
    const { colorList, setColorList, getColorInfo } = props;
    const [searchText, setSearchText] = useState<string>();
    const [hexResult, setHexResult] = useState<string>();

    const getSimilarColorsByHex = (hex: string) => {
        let sortedlist: any = [];
        colorList.forEach((list) => {
            const similarColors = hexColorDelta(hex, list.hex.split("#")[1]);
            if (similarColors > 0.95) {
                sortedlist.push(list);
            }
        });
        if (sortedlist.length > 0) {
            setHexResult("#" + hex);
            setColorList(sortedlist.slice(0, 100));
        } else {
            toaster(ToasterType.ERROR, "Colour is invalid")
        }
    }

    const searchColour = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            if ((event.target as HTMLInputElement).value) {
                const enteredText = (event.target as HTMLInputElement).value.trim();

                if (enteredText?.charAt(0) === "#") {
                    const hex = enteredText.split("#")[1];
                    getSimilarColorsByHex(hex);
                } else if (enteredText?.substring(0, 3) === "rgb") {
                    const rgbValue = enteredText?.slice(4, enteredText.length - 1).split(',');
                    const r = parseInt(rgbValue[0]);
                    const g = parseInt(rgbValue[1]);
                    const b = parseInt(rgbValue[2]);
                    const rgbToHexValue = rgbToHex(r, g, b);
                    setHexResult("#" + rgbToHexValue);
                    getSimilarColorsByHex(rgbToHexValue);
                } else {
                    setColorList([]);
                    toaster(ToasterType.ERROR, "Colour is invalid")
                }
                // Set Entered value
                setSearchText(enteredText);
            }
        }
    }

    const searchByColour = (value: string) => {
        if (value?.length === 0) {
            setSearchText("");
            getColorInfo();
        }
    }

    return (
        <Row className='pt-3'>
            <Col lg="3" md="3" sm="12">
                <Label for="search" >
                    Colour
                </Label>
                <Input
                    id="search"
                    type="text"
                    placeholder='Enter Colour'
                    onKeyDown={searchColour}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => searchByColour(event.target.value)}
                />
                <div className='pt-3'>
                    {searchText ?
                        <p>Results for "{hexResult}" </p>
                        :
                        <p>All Colors.</p>
                    }
                </div>
            </Col>
            <Col lg="9" md="9" sm="12"></Col>
        </Row>
    )
}

export default InputSearch
