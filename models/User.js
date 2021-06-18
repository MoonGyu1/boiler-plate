const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: { //유효기간
        type: Number
    }
})

//mongoose의 메소드 이용, 유저 정보를 저장하기 '전에' 암호화
userSchema.pre('save', function( next ){
    var user = this;
    
    // 유저가 '비밀번호'를 변경했을 때만,
    // Bcrypt로 비밀번호 암호화
    if(user.isModified('password')) {
        // 1. salt 생성(saltRounds: salt 글자수)
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)

            //2. salt를 이용해서 비밀번호 암호화
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                
                //암호화된 비밀먼호(hash)를 만드는데 성공했다면
                user.password = hash
                next() //다음 위치로 보냄
            })
        }) 
    } else {
        next()
    }
})

//메소드 생성
userSchema.methods.comparePassword = function(plainPassword, cb) {
    //plainPassword를 암호화해서 db에 저장된 비밀번호와 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch) //(에러없음, true)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;

    //jsonwebtoken을 이용하여 token 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}
const User = mongoose.model('User', userSchema);

module.exports = {User}