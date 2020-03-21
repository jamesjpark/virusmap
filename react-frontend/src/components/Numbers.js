import React, { Component } from 'react';


class Numbers extends Component {
    constructor(props){
        super(props);
        this.state = {
          data: [] 
        };
        // state는 항상 오프젝트로 만들고 
        // 그 안에 어레이를 넣어놓는게 안전해
    }

    componentDidMount() {
        // 이 function이 리엑트가 렌더한다음 바로 무조건 돌아가는 펑션이야
        // 여기서 백서버에 요청을 해서 데이터를 가져오는 거지
        // 이렇게 하면 데이터를 따로 저장할 필요도 없고
        // 매번 가져올 때마다 데이터 서버에서 읽어오니까 항상 데이터도 최신이 되겠지
        fetch('http://localhost:5000')
        .then(res => res.json())
        .then(data => {
          this.setState({
            data: data
          });
          // 이렇게 해서 서버에서 받아온 데이터를 state 안에 data로 맵핑시키는거야
          // 그럼 state가 바뀌니까 render가 자동으로 돌아가게 되겠지? 그럼 페이지
          // 받아온 데이터가 보여질거고
        })
        .catch(err => console.error(err));
    }
    
    render() {
        return (
            <div className = "num">
                <div className = "scroll">
                    <h2 className = "caseTitle">COVID-19 Cases in Texas</h2>
                    <br></br>
                    {this.state.data.map((data, i) =>
                      <table key={i}> 
                        <td className = "data">{data.county}</td>
                        <td className = "data">{data.number}</td>
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