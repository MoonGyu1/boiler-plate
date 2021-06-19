import React, {useEffect} from 'react'
import axios from 'axios';


// axios.get('http://localhost:5000/api/hello'
// -> 클라이언트 포트: 3000번, 서버 포트: 5000번
// -> 서버의 포트가 다른데 request를 보내려고 하니 CORS(Cross-Origin Resource Sharing) 정책 위반,에러 발생

// 해결방법 중 하나 -- Proxy

function LandingPage() {
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    }, [])

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>
    
        </div>
    )
}

export default LandingPage
