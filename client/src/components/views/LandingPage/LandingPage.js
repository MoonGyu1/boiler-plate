import React, {useEffect} from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

// axios.get('http://localhost:5000/api/hello'
// -> 클라이언트 포트: 3000번, 서버 포트: 5000번
// -> 서버의 포트가 다른데 request를 보내려고 하니 CORS(Cross-Origin Resource Sharing) 정책 위반,에러 발생

// 해결방법 중 하나 -- Proxy

function LandingPage(props) {
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success) {
                props.history.push('/login')
            } else {
                alert('Failed to logout')
            }
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                Log out
            </button>
    
        </div>
    )
}

export default withRouter(LandingPage)
