import axios from 'axios';
import { toast } from "react-toastify";
import {
    JOUR_DEPART_REQUEST,
    JOUR_DEPART_SUCCESS,
    JOUR_DEPART_FAIL,
    USER_DEPART_REQUEST,
    USER_DEPART_FAIL,
    USER_DEPART_SUCCESS,
    HEURE_SINGLE_REQUEST,
    HEURE_SINGLE_SUCCESS,
    HEURE_SINGLE_FAIL,
} from '../constants/heuredépartconstant';

export const heuredepartjourAction = (selectedDay, selectedMonth, selectedYear) => async (dispatch) => {
    dispatch({ type: JOUR_DEPART_REQUEST });
    try {
        const { data } = await axios.get(`/api/jourmois?day=${selectedDay}&month=${selectedMonth}&Year=${selectedYear}`);
        dispatch({
            type: JOUR_DEPART_SUCCESS,
            payload: data // Assurez-vous que data contient directement les données des heures de départ
        });
        return data; // Retournez directement les données des heures de départ
    } catch (error) {
        dispatch({
            type: JOUR_DEPART_FAIL,
            payload: error.response.data.error
        });
        throw error; // Lancez l'erreur pour la capturer dans la fonction handleChange si nécessaire
    }
};
export const heureDépartAction = () => async (dispatch) => {
    dispatch({ type: USER_DEPART_REQUEST });
    try {
        // Vous pouvez ajouter ici toute logique de vérification d'authentification et de statut d'administrateur
        // Par exemple, vous pouvez vérifier si l'utilisateur est connecté et s'il a le statut d'administrateur

        // Ensuite, vous pouvez envoyer la requête GET vers "/heuredep"
        const { data } = await axios.get("/dept");

        dispatch({
            type: USER_DEPART_SUCCESS,
            payload: data
        });
        
    } catch (error) {
        dispatch({
            type: USER_DEPART_FAIL,
            payload: error.response.data.error
        });
       
    }
};
export const userSingleHeureAction  = (id) => async (dispatch) => {
    dispatch({ type: HEURE_SINGLE_REQUEST });
    try {
        const { data } = await axios.get(`/api/heure/${id}`);
        dispatch({
            type: HEURE_SINGLE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: HEURE_SINGLE_FAIL,
            payload: error.response.data.error
        });
    }
}