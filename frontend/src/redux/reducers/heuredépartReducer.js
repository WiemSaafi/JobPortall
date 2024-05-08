import {
    JOUR_DEPART_REQUEST,
    JOUR_DEPART_REQUEST,
    JOUR_DEPART_RESET,
    JOUR_DEPART_SUCCESS,
    USER_DEPART_REQUEST,
    USER_DEPART_REQUEST,
    USER_DEPART_RESET,
    USER_DEPART_SUCCESS,
    HEURE_SINGLE_REQUEST,
    HEURE_SINGLE_SUCCESS,
    HEURE_SINGLE_FAIL,
    HEURE_SINGLE_RESET
} from "../constants/.heuredépartconstant"

export const userReducerheuredépart = (state = { user: null }, action) => {
    switch (action.type) {
        case JOUR_DEPART_REQUEST:
            return { loading: true, user: null }
        case JOUR_DEPART_SUCCESS:
            return {
                loading: false,
                user: action.payload.user,
            }
        case  JOUR_DEPART__FAIL:
            return { loading: false, user: null, error: action.payload }
        case JOUR_DEPART__RESET:
            return {}
        default:
            return state;
    }
}
    export const userReducerheureuser = (state = { data: null }, action) => {
        switch (action.type) {
            case USER_DEPART_REQUEST:
                return { loading: true, data: null }
            case USER_DEPART_SUCCESS:
                return {
                    loading: false,
                    user: action.payload.data,
                }
            case  USER_DEPART__FAIL:
                return { loading: false, data: null, error: action.payload }
            case USER_DEPART__RESET:
                return {}
            default:
                return state;
        }
    
    }
    export const heureReducerSingle = (state = { user: null }, action) => {
        switch (action.type) {
            case HEURE_SINGLE_REQUEST:
                return { loading: true, user: null }
            case HEURE_SINGLE_SUCCESS:
                return {
                    loading: false,
                    user: action.payload.user,
                }
            case HEURE_SINGLE_FAIL:
                return { loading: false, user: null, error: action.payload }
            case HEURE_SINGLE_RESET:
                return {}
            default:
                return state;
        }
    
    }
