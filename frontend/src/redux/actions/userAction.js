import axios from 'axios';
import { toast } from "react-toastify";
import {
    ALL_USER_LOAD_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_SUCCESS,
    USER_APPLY_JOB_FAIL,
    USER_APPLY_JOB_REQUEST,
    USER_APPLY_JOB_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_SINGLE_REQUEST,
    USER_SINGLE_SUCCESS,
    USER_SINGLE_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
} from '../constants/userConstant';



export const userSignInAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await axios.post("/api/signin", user);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Login Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

// user sign up action
export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });
    try {
        const { data } = await axios.post("/api/signup", user);

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Register Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//log out action
export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    try {
        localStorage.removeItem('userInfo');
        const { data } = await axios.get("/api/logout");
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log out successfully!");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//user profile action
export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("/api/me");
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}


//all user action
export const allUserAction = () => async (dispatch) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("/api/allusers");
        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

//user job apply action
export const userApplyJobAction = (job) => async (dispatch) => {
    dispatch({ type: USER_APPLY_JOB_REQUEST });
    try {
        const { data } = await axios.post("/api/user/jobhistory", job);

        dispatch({
            type: USER_APPLY_JOB_SUCCESS,
            payload: data
        });
        toast.success("Apply Successfully for this Job!");
    } catch (error) {
        dispatch({
            type: USER_APPLY_JOB_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

export const userUpdateAction = (user, user_id) => async (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST });
    try {
        const { data } = await axios.put(`/api/user/edit/${user_id}`, user);

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        });
        toast.success("Updated Successfully!");
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}
export const userSingleAction= (id) => async (dispatch) => {
    dispatch({ type: USER_SINGLE_REQUEST });
    try {
        const { data } = await axios.get(`/api/user/${id}`);
        dispatch({
            type: USER_SINGLE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}



export const deleteUSERAction = (user_id) => async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
        const { data } = await axios.delete(`/api/admin/user/delete/${user_id}`);
        console.log("data in delete",data)
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
        });
        toast.success("user deleted successfully");
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

