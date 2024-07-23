import { GET_SOUKO_LIST } from "../../constants/actionTypes";

const initState = []

const shukkaEntryReducer = (state = initState, action) => {
     console.log(state, action);
     switch (action.type) {
          case GET_SOUKO_LIST:
               console.log(action.payload);
               return action.payload

          default:
               return state;
     }

}
export default shukkaEntryReducer;