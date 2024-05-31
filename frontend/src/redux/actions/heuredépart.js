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
    HEURE_DERNIER_REQUEST,
    HEURE_DERNIER_SUCCESS,
    HEURE_DERNIER_FAIL,
    HEURE_PRESENCE_REQUEST,
    HEURE_PRESENCE_SUCCESS,
    HEURE_PRESENCE_FAIL,
} from '../constants/heuredépartconstant';

export const heuredepartjourAction = (selectedDay, selectedMonth, selectedYear) => async (dispatch) => {
    dispatch({ type: JOUR_DEPART_REQUEST });
    try {
        const { data } = await axios.get(`/api/jourmois?day=${selectedDay}&month=${selectedMonth}&year=${selectedYear}`);
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
        const { data } = await axios.get("/api/dept");

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
        const { user } = await axios.get(`/api/heure/${id}`);
        dispatch({
            type: HEURE_SINGLE_SUCCESS,
            payload: user
        });

    } catch (error) {
        dispatch({
            type: HEURE_SINGLE_FAIL,
            payload: error.response.user.error
        });
    }
}


export const getDerniereEntreeSortieAction  = (id) => async (dispatch) => {
    dispatch({ type: HEURE_DERNIER_REQUEST });
    try {
        const { data } = await axios.get(`/api/dernierentreesortie/${id}`);
        dispatch({
            type: HEURE_DERNIER_SUCCESS,
            payload: data
        });
        console.log("Données récupérées avec succès :", data); // Ajoutez un console.log pour afficher les données récupérées
    } catch (error) {
        dispatch({
            type: HEURE_DERNIER_FAIL,
            payload: error.response.data.error
        });
    }
    
}


export const pourcentagePresenceAction = () => async (dispatch) => {
    dispatch({ type: HEURE_PRESENCE_REQUEST });
    
    try {
        const { data } = await axios.get(`/api/pourcentagepresence`);
        dispatch({ type: HEURE_PRESENCE_SUCCESS, payload: data });
        return data
    } catch (error) {
        dispatch({ type: HEURE_PRESENCE_FAIL, payload: error.response.data.error });
    }
};