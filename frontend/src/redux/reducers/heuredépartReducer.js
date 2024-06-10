    import {
        JOUR_DEPART_REQUEST,
        JOUR_DEPART_RESET,
        JOUR_DEPART_SUCCESS,
        JOUR_DEPART_FAIL,
        USER_DEPART_REQUEST,
        USER_DEPART_RESET,
        USER_DEPART_SUCCESS,
        USER_DEPART_FAIL,
        HEURE_SINGLE_REQUEST,
        HEURE_SINGLE_SUCCESS,
        HEURE_SINGLE_FAIL,
        HEURE_SINGLE_RESET,
        HEURE_DERNIER_FAIL, HEURE_DERNIER_REQUEST, HEURE_DERNIER_RESET, HEURE_DERNIER_SUCCESS, 
        HEURE_PRESENCE_REQUEST,
        HEURE_PRESENCE_SUCCESS,
        HEURE_PRESENCE_FAIL,
        HEURE_PRESENCE_RESET,
        USER_tempstravail_REQUEST,
        USER_tempstravail_SUCCESS,
        USER_tempstravail_FAIL,
        USER_tempstravail_RESET
    } from "../constants/heuredépartconstant"


    export const userReducerheuredépart = (state = { user: null }, action) => {
        switch (action.type) {
            case JOUR_DEPART_REQUEST:
                return { loading: true, user: null }
            case JOUR_DEPART_SUCCESS:
                return {
                    loading: false,
                    user: action.payload.user,
                }
            case  JOUR_DEPART_FAIL:
                return { loading: false, user: null, error: action.payload }
            case JOUR_DEPART_RESET:
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
                case  USER_DEPART_FAIL:
                    return { loading: false, data: null, error: action.payload }
                case USER_DEPART_RESET:
                    return {}
                default:
                    return state;
            }
        
        }
        export const userReducercalculertavail = (state = { data: null }, action) => {
            switch (action.type) {
                case USER_tempstravail_REQUEST:
                    return { loading: true, data: null }
                case USER_tempstravail_SUCCESS:
                    return {
                        loading: false,
                        user: action.payload.data,
                    }
                case  USER_tempstravail_FAIL:
                    return { loading: false, data: null, error: action.payload }
                case USER_tempstravail_RESET:
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
        export const heureReducerDernier= (state = { user: null }, action) => {
            switch (action.type) {
                case HEURE_DERNIER_REQUEST:
                    return { loading: true, user: null }
                case HEURE_DERNIER_SUCCESS:
                    return {
                        loading: false,
                        user: action.payload.user,
                    }
                case HEURE_DERNIER_FAIL:
                    return { loading: false, user: null, error: action.payload }
                case HEURE_DERNIER_RESET:
                    return {}
                default:
                    return state;
            }
        
        }
    export const pourcentagePresenceReducer = (state = { pourcentagePresence: null }, action) => {
        switch (action.type) {
            case HEURE_PRESENCE_REQUEST:
                return { loading: true, pourcentagePresence: null };
            case HEURE_PRESENCE_SUCCESS:
                return { loading: false, pourcentagePresence: action.payload.user };
            case HEURE_PRESENCE_FAIL:
                return { loading: false, pourcentagePresence: null, error: action.payload };
            case HEURE_PRESENCE_RESET:
                return {};
            default:
                return state;
        }
    };

