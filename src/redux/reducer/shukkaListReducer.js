import { GET_COLUMN_LIST, GET_SHUKKA_LIST } from "../../constants/actionTypes";

const initState = {
     columns: [],
     shukkaList: {
          data: [],
          message: ''
     }
};

const shukkaListReducer = (state = initState, action) => {
     console.log(state, action.type);
     switch (action.type) {
          case GET_SHUKKA_LIST:
               return {
                    ...state,
                    shukkaList: {
                         data: Array.isArray(action.payload) ? action.payload : [],
                         message: Array.isArray(action.payload) ? '' : action.payload
                    }
               };
          case GET_COLUMN_LIST:
               return {
                    ...state,
                    columns: action.payload
               };

          default:
               return state;
     }

}
export default shukkaListReducer;

