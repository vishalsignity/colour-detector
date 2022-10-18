import React from 'react'
import { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'reactstrap'
import style from './App.module.css'
import ColorTable from './components/Table/ColorTable'
import { IColorListFullDetail, ISearch } from './utils/interfaces'
import InputSearch from './components/Input/InputSearch'
import { getAllColorsAPI } from './utils/api'

function App() {
    const [list, setList] = useState<IColorListFullDetail>()
    const [search, setSearch] = useState<ISearch>({
        hex: '',
        pickerValue: '#000000',
    })
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getColorInfo = async () => {
        try {
            const colorInfo: any = await getAllColorsAPI()
            setList({ list: colorInfo, sorted: [] })
        } catch (error) {
            setList({ list: [], sorted: [] })
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getColorInfo()
    }, [])

    return (
        <div className={`${style.main}`}>
            <Row>
                <Col lg="12" md="12" sm="12">
                    <h2>Colour Searcher</h2>
                    <InputSearch
                        search={search}
                        setSearch={setSearch}
                        list={list!}
                        setList={setList}
                        getColorInfo={getColorInfo}
                    />
                    {isLoading ? (
                        <div className={style.App__loaderContainer}>
                            <div className={style.App__loadingList}>
                                Loading...
                            </div>
                            <Spinner></Spinner>
                        </div>
                    ) : (
                        <ColorTable
                            getColorInfo={getColorInfo}
                            searchingText={search.hex}
                            columnList={['', 'Name', 'Hex', 'RGB', 'HSL']}
                            colorList={list!}
                        />
                    )}
                </Col>
            </Row>
        </div>
    )
}

export default App
