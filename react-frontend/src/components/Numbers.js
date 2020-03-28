import React, { Component } from 'react';
import previousData from '../data/21-Mar-2020corona-data.json'


class Numbers extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: [] ,
          total : "loading...",
          death : "loading...",
          prev : previousData,


        };
        // state는 항상 오프젝트로 만들고 
        // 그 안에 어레이를 넣어놓는게 안전해
    }

    componentDidMount() {
        // 이 function이 리엑트가 렌더한다음 바로 무조건 돌아가는 펑션이야
        // 여기서 백서버에 요청을 해서 데이터를 가져오는 거지
        // 이렇게 하면 데이터를 따로 저장할 필요도 없고
        // 매번 가져올 때마다 데이터 서버에서 읽어오니까 항상 데이터도 최신이 되겠지
        fetch('http://virus-backend-dev.us-east-2.elasticbeanstalk.com')
        .then(res => res.json())
        .then(data => {
          this.setState({
            data: data
          });
          // 이렇게 해서 서버에서 받아온 데이터를 state 안에 data로 맵핑시키는거야
          // 그럼 state가 바뀌니까 render가 자동으로 돌아가게 되겠지? 그럼 페이지
          // 받아온 데이터가 보여질거고

           var dataCopy = this.state.data;
           var prevCopy = this.state.prev;
           var j = 0;
           var prevTot = 0;
           var currTot = 0;
           for(var i = 0; i<dataCopy.length; i++){
             currTot += parseInt(dataCopy[i].number);
           }
           for(i = 0; i<prevCopy.length; i++){
            prevTot += parseInt(prevCopy[i].number);
          }
           var tot =  currTot-prevTot;
           console.log(tot)
          for( i =0; i<dataCopy.length; i++){
            dataCopy[i].prevNum = "+"+dataCopy[i].number;

            for( j = 0; j < prevCopy.length; j++){


              if(dataCopy[i].county === prevCopy[j].county){
                var tmp = dataCopy[i].number - prevCopy[j].number;
                if(tmp < 0){
                  dataCopy[i].prevNum = "-"+tmp;
  
                }
                dataCopy[i].prevNum = "+"+tmp;
  
  
              }
            }
            
            
          } 
        
        this.setState({
          data : dataCopy
        });
        this.setState({
          previousTotal : tot
        });
    
        })
        .catch(err => console.error(err));

        fetch('http://virus-backend-dev.us-east-2.elasticbeanstalk.com/total')
        .then(res => res.json())
        .then(data => {
          this.setState({
            total: data[0],
            death : data[1]
          });
        
    })


    
         
    

  }
  
    
    render() {
        return (
            <div className = "num">
                <div className = "scroll">
                    <h2 className = "caseTitle">COVID-19 Cases in Texas</h2>
                    <br></br>
                    <div className = "legend">
                    <span className = "legendL">( ) : </span>
                    <span className = "legendR">change of numbers since 03/21/2020</span>
                    <br></br>
                    <span className = "legendR">*Does not include repatriation cases.</span>
                    <br></br>
                    </div>
                    {console.log(this.state.data)}

                    <br></br>
                    <br></br>
                    <span className ="total">Total : {this.state.total} </span>
                    <span className = "compare">(+{this.state.previousTotal}) </span>
                    <br></br>
                    <h2 className = "death">Death : {this.state.death} </h2>
                    <table>
                      <td className = "topTable">County</td>
                      <td className = "topTable">Number of Cases</td>

                    </table>
                    {this.state.data.map((data, i) =>
                      <table key={i}> 
                        <td className = "data">{data.county}</td>
                        <td className = "data">{data.number}  <span className = "compare">({data.prevNum})</span></td>
                      </table>
                    )}
                    {/* map 쓸 때는 항상 리턴하는 html의 첫번째 tag에 key가 있어야해 
                    state의 data로 서버에서 불러온 데이터를 저장했으니 맵도 data에서 돌려줘야겠지?*/}
                </div>
            </div>
        );
    }
}
 
export default Numbers;