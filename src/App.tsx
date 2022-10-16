import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'reactstrap';
import style from "./App.module.css";
import ColorTable from './components/Table/ColorTable';
import { hexToHSL, hexToRgb } from './utils';
import { IColorList, ISearch } from './utils/interfaces';
import InputSearch from './components/Input/InputSearch';

function App() {
  const [colorList, setColorList] = useState<IColorList[]>();
  const [search, setSearch] = useState<ISearch>({ text: "", hex: "", pickerValue: "#000000" });

  const getColorInfo = () => {
    axios.get('https://raw.githubusercontent.com/okmediagroup/color-test-resources/master/xkcd-colors.json')
      .then((response) => {
        const colorInfo = response.data.colors.map(({ hex, color }: IColorList, index: number) => {
          const rgba = hexToRgb(hex);
          const hsl = hexToHSL(hex);
          return { color, hex, rgba, hsl };
        });
        setColorList(colorInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getColorInfo();
  }, []);

  return (
    <div className={`${style.main}`}>
      <Row>
        <Col lg="12" md="12" sm="12">
          <h2>Colour Searcher</h2>
          <InputSearch
            search={search}
            setSearch={setSearch}
            colorList={colorList!}
            setColorList={setColorList}
            getColorInfo={getColorInfo}
          />
          {colorList !== undefined ? (
            <ColorTable
              columnList={['', 'Name', 'Hex', 'RGB', 'HSL']}
              colorList={colorList}
            />
          ) :
            <div className={style.App__loaderContainer}>
              <div className={style.App__loadingList}>Loading...</div>
              <Spinner>
              </Spinner>
            </div>
          }
        </Col>
      </Row>
    </div>
  );
}

export default App;
