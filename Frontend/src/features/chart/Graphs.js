import { Box } from '@mui/material';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Graphs = ({data}) => {

    const chartData = data.prices.map((price, index) => ({
        price,
        date: data.dates[index]
      }));
      
    const minPrice = Math.min(...data.prices);

    const formatDate = (dateStr, type) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        switch(type) {
          case 'axis': {
            return `${day}.${!(month < 10)? month : '0'+ month}`;
          }
          case 'tooltip' : {
            return `${day}.${!(month < 10)? month : '0'+ month}.${date.getFullYear()}`;
          }
          default: {
            console.log('formatDate error');
            return null;
          }
        } 
      };


      return (
        <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} backgroundColor="#f5f5f5">
            <h3>График</h3>
                <LineChart width={600} height={300} data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => formatDate(date, 'axis')} angle={-45} dy={10} />
                <YAxis domain={[minPrice, 'dataMax']} />
                <Tooltip /* formatter={formatDate} */ labelFormatter={(date) => formatDate(date, 'tooltip')}/>
                <Line type="monotone" dataKey="price" stroke="#fdc400" name="Цена товара" strokeWidth={2}/>
                </LineChart>
        </Box>
      );
  };
  
  export default Graphs;