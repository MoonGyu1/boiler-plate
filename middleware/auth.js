const { User } = require("../models/User");

let auth = (req, res, next) => {
    //인증 처리 과정

    //1. 클라이언트 쿠키에 저장된 토큰을 서버에 가져옴
    let token = req.cookies.x_auth;

    //2. 가져온 토큰을 복호화(decode) 후 유저 찾음
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        //3-1. 유저가 없으면 인증 NO
        if(!user) return res.json({ isAuth: false, error: true })

        //3-2. 유저가 있으면 인증 OK
        // (auth 미들웨어를 사용하는 라우터 내에서 현재 token과 user정보를 사용할 수 있도록 req에 저장해줌)
        req.token = token;
        req.user = user;

        next(); //미들웨어에서 빠져나옴
    })
}

module.exports = { auth };