// HOC(Higher Order Component)

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

// option
// 1. null: 아무나 출입 가능한 페이지
// 2. true: 로그인한 유저만 출입 가능한 페이지
// 3. false: 로그인한 유저는 출입 불가능한 페이지
export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)
                
                //로그인하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) { //옵션2
                        props.history.push('/login')
                    }
                } else { //로그인한 상태
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    } else { //옵션3
                        props.history.push('/')
                    }
                }
            })
        }, [])
    
        return (
            <SpecificComponent />
        )

    }

    return AuthenticationCheck
}