import { GET_COLUMN_LIST, GET_SHUKKA_LIST, GET_SOUKO_LIST } from "../constants/actionTypes"

export const searchShukka = (data) => {
    // console.log("shukaa =>>", data);
    return {
        type: GET_SHUKKA_LIST,
        payload: data
    }
}

export const getColumns = (data) => {
    console.log(data)
    return {
        type: GET_COLUMN_LIST,
        payload: data
    }
}

export const getSoukoList = (data) => {
    return {
        type: GET_SOUKO_LIST,
        payload: data
    }
}