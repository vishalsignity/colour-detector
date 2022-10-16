import React from 'react'
import { Button, Col, Form, Input, Label, Row } from 'reactstrap'
import { searchColour } from '../../utils';
import { IColorList, ISearch } from '../../utils/interfaces';
import style from "./InputSearch.module.css";

interface IProps {
    search: ISearch;
    setSearch: (value: ISearch) => void;
    colorList: IColorList[];
    setColorList: (value: IColorList[]) => void;
    getColorInfo: () => void;
}

interface ISearchInfo {
    sortedColorList: IColorList[];
    hex: string;
}

function InputSearch(props: IProps) {
    const {
        search,
        setSearch,
        colorList,
        setColorList,
        getColorInfo
    } = props;

    const getColorValueFromInput = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const enteredText = (event.target as HTMLInputElement).value.trim();
        if (event.key === 'Enter') {
            const { sortedColorList, hex }: ISearchInfo = searchColour(enteredText, colorList);
            setSearch({ ...search, hex });
            setColorList(sortedColorList);
        }
    }

    const searchByColour = (value: string) => {
        if (value.trim().length === 0) {
            setSearch({ ...search, text: "" });
            getColorInfo();
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { sortedColorList, hex }: ISearchInfo = searchColour(search.pickerValue, colorList);
        setSearch({ ...search, hex });
        setColorList(sortedColorList);
    }

    const resetColorPickerValue = () => {
        setSearch({ ...search, text: "", pickerValue: "#000000" });
        getColorInfo();
    }

    return (
        <Row className='pt-3'>
            <Col lg="5" md="5" sm="12">
                <Label for="search" >
                    Colour
                </Label>
                <div className={style.InputSearch__inputContainer}>
                    <Input
                        id="search"
                        type="text"
                        placeholder='Enter Colour'
                        onKeyDown={getColorValueFromInput}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => searchByColour(event.target.value)}
                    />
                    <div className={style.InputSearch__orContainer}>OR</div>
                    <Form onSubmit={handleSubmit}>
                        <div className={style.InputSearch__inputContainer}>
                            <Input
                                type="color"
                                value={search.pickerValue}
                                className={style.InputSearch__inputColorPicker}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch({ ...search, pickerValue: event.target.value })}
                            />
                            <Button
                                type="submit"
                                className={`btn-sm btn-success ${style.InputSearch__submitColor} ${style.InputSearch__orContainer}`}>
                                Try it
                            </Button>
                            <Button
                                type="button"
                                className={`btn-sm btn-secondary ${style.InputSearch__submitColor} ${style.InputSearch__orContainer}`}
                                onClick={resetColorPickerValue}
                            >
                                Reset
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className='pt-3'>
                    {search.text ?
                        <p>Results for "{search.text}" </p>
                        :
                        <p>All Colors.</p>
                    }
                </div>
            </Col >
            <Col lg="7" md="7" sm="12"></Col>
        </Row >
    )
}

export default InputSearch
