import React, { useState } from 'react';
import './Tabs.scss';
import { useGetShopsArrQuery } from '../../api/apiSlice';
import perek from '../../img/perek2.png';
import dixy from '../../img/dixy.png';
import magnit from '../../img/magnit.png';
import Loader from '../Loader/Loader';
import Graphs from '../chart/Graphs';
import { Box } from '@mui/material';
import sad from '../../img/sad.png'

const Tabs = ({tabsData, shops, isLoadingTabs}) => {
    const [state, setState] = useState(1);
    const {data, isLoading} = useGetShopsArrQuery();
    console.log(shops);

    return (
        <>
            { !isLoadingTabs?
                <div className='tabs'>
                    <div className="radio-inputs">
                        <label className="radio">
                            <input type="radio" name="radio" checked = {state === 1} onChange={() => {setState(1)}}/>
                            <span className="name"><img src={shops[0].webURL?shops[0].webURL:null} alt={shops[0].name} /></span>
                        </label>
                        <label className="radio">
                            <input type="radio" name="radio" checked = {state === 2} onChange={() => {setState(2)}}/>
                            <span className="name"><img src={shops[1].webURL?shops[1].webURL:null} alt={shops[0].name} /></span>
                        </label>    
                        <label className="radio">
                            <input type="radio" name="radio" checked = {state === 3} onChange={() => {setState(3)}}/>
                            <span className="name"><img src={shops[2].webURL?shops[2].webURL:null} alt={shops[0].name} /></span>
                        </label>
                    </div>
                    <div className="tabs__content">
                        {isLoading?
                            <Loader/>
                        :
                            tabsData[state] 
                        ?
                            <Box minHeight={'410px'}>
                                <h3 className='graph__title'>
                                    Последняя цена: {tabsData[state].prices[tabsData[state].prices.length - 1]}₽
                                </h3>
                                    <Graphs data = {tabsData[state]}></Graphs>
                            </Box>
                        :   <Box minHeight={'410px'}>
                                <h3 className='graph__title'>Этого товара нет в выбранном магазине</h3>
                                <img className = 'sad' src={sad} alt="" />
                            </Box>
                            
                        }
                    </div>
                </div>
                : <Loader/>
            }
        </>
    );
};

export default Tabs;