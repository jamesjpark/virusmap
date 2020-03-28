import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import data17 from '../data/17-Mar-2020corona-data.json'

import data19 from '../data/21-Mar-2020corona-data.json'

import data21 from '../data/24-Mar-2020corona-data.json'
import data23 from '../data/28-Mar-2020corona-data.json'




class Graph2 extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
          data1 : data17,
          data2 : data19,
          data3 : data21,
          data4 : data23

        };
       
    }

    componentDidMount() {
        var copy1 = this.state.data1;
        var copy2 = this.state.data2;
        var copy3 = this.state.data3;
        var copy4 = this.state.data4;
        var total1 = 0;
        var total2 = 0;
        var total3 = 0;
        var total4 = 0;

        for(var i = 0; i<copy1.length; i++){
            total1 += parseInt(copy1[i].number);
          }
        for(var i = 0; i<copy2.length; i++){
            total2 += parseInt(copy2[i].number);
          }
        for(var i = 0; i<copy3.length; i++){
            total3 += parseInt(copy3[i].number);
          }
        for(var i = 0; i<copy4.length; i++){
            total4 += parseInt(copy4[i].number);
          }  
        
        this.setState({
          data1 : total1,
          data2 : total2,
          data3 : total3,
          data4 : total4
        })
    

  }
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    const data = [
        {
          name: '3/17', Case: this.state.data1, 
        },
        {
          name: '3/21', Case: this.state.data2,  
          IncreasedBy: this.state.data2 - this.state.data1
        },
        {
          name: '3/24', Case: this.state.data3,  
          IncreasedBy: this.state.data3 - this.state.data2

        },
        {
          name: '3/28', Case: this.state.data4, 
          IncreasedBy: this.state.data4 - this.state.data3

        },
        
      ];
    return (
        <div className = "graph">
<LineChart
        width={400}
        height={280}
        data={data}
        margin={{

        }}
        
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Case" stroke="#8884d8" activeDot={{ r: 5 }} />

        <Line type="monotone" dataKey="IncreasedBy" stroke="green" activeDot={{ r: 5}}  />


      </LineChart>
        </div>
      
    );
  }
}
export default Graph2;