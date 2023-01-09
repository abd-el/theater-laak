import { useEffect } from "react";
import { backendApi } from "../api";
import { useAuthContext } from './useAuthContext'
import { useState } from "react";

export function useGetUser() {
    const { authState, dispatch } = useAuthContext();

    // useEffect(()=>{
    //     console.log("de nieuwe state: " + authState.user.userName);
    // }, [authState]);

    async function getAuthUser() {
        

        if (authState != null) {
            console.log(authState);
        }
        else {
            console.error('authState is null');
        }

        const resp = await backendApi.get('/api/account/getUser',
            {
                headers: { 'Authorization': 'Bearer ' + authState.token }
            });

        if (resp.status == 200) {
            const payload = {
                'token': authState.token,
                'user': resp.data.user
            }

            dispatch(payload);

        }
        else {
            console.error(resp.statusText);
        }
    }

return { getAuthUser };



}