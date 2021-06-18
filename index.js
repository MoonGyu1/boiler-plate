const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require("./models/User");

const config = require('./config/key');

//아래의 형태로된 데이터를 분석해서 가져올 수 있도록 해줌
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

app.use(cookieParser());


const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!bb'))


app.post('/register', (req, res) => {
    //회원 가입시 필요한 정보들을 client에서 가져오면
    //그것들을 데이터베이스에 넣어줌

    const user = new User(req.body)

    //유저 정보를 저장하기 '전에' 암호화 -> next()
    user.save((err, userInfo) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/login', (req, res) => {
    //1. 요청된 이메일이 DB에 있는지 확인
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        
        //2. 있다면, 비밀번호가 일치하는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
            
            //3. 일치한다면, 유저를 위한 토큰 생성
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                // 토큰을 저장(위치? 쿠키, 로컬스토리지, 세션 등등)
                res.cookie("x_auth", user.token) //(Name, Value)
                .status(200)
                .json({ loginSuccess: true, userId: user._id })
            })
        })
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))