import * as ActionTypes from './action-types';
import React from 'react';
import * as ContainerActions from './container-actions';

export function selectUserProfile(func) {
    return (dispatch, getState) => {
        //console.info(getState());
        let userId = getState().userState.userInfo.id;
        dispatch({
            type:[ ,[ActionTypes.SELECT_USERPROFILE_USERID,ActionTypes.GET_USERINFO]],
            req: {
                method: 'post',
                url: '/user/getUserInfoById.json',
                param: {
                    id: userId,
                }
            },
            onSuccess: (payload)=>{
                if(func) func();
                dispatch(ContainerActions.closeModal());
            },
            onFailure: (err, res) => {
                console.log(res);
                console.log(err);
                dispatch(ContainerActions.closeModal());
            },
        
        });
    }
}

/*export function avatarImage(file1,phone) {
    return (dispatch, getState) => {
        dispatch({
            type: [,ActionTypes.USER_AVATAR],
            req: {
                method: 'upload',
                url: '/uploadImage2.json?mobile='+ phone+"avatar",
                param: file1
            },
            onSuccess: payload  => {
                dispatch(ContainerActions.closeModal());
                dispatch({
                    type: [,ActionTypes.LOGIN_SUCCESS],
                    req: {
                        method: 'post',
                        url: '/user/updateUploadImage.json',
                        param: {id: getState().userState.userInfo.id, uploadImage: payload.entity, type: 4,mobile:getState().userState.userInfo.mobile}
                    }
                });

            },
            onFailure: (err, res) => {
                dispatch(ContainerActions.closeModal());
            }
        });
    }
}*/