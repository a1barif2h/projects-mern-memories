import * as api from "../../api/index";
import { AUTH } from "../types";
export const signIn = (formData, history) => async (dispatch) => {
    console.log("sign in......")
    try {
        const {data} = await api.signIn(formData);
        dispatch({type: AUTH, data})
        history.push("/")
    } catch (error) {
        console.log(error)
    }
}

export const signUp = (formData, history) => async (dispatch) => {
    
    try {
        console.log("sign Up......")
        console.log(formData)
        const {data} = await api.signUp(formData);
        console.log(data)
        dispatch({type: AUTH, data})
        history.push("/")
    } catch (error) {
        console.log(error)
    }
}