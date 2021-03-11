import { createStore } from 'redux';

export const TODO_ACTION_READY = {type: "todo/ready"};

const monReducteur = (state = {todo: "INIT"}, action)=>{
    console.log("~~ Appel du reducer de Redux ~~");
    console.log(action);
    switch (action.type) {
        case TODO_ACTION_READY.type:
            return {...state,todo: "IDLE"};
        case "todo/post":
            return {...state,todo: "ADDING"};
        case "todo/post/ok":
            return {...state,todo: "DONE"};
        case "todo/reset":
        default:
            return {...state,todo: "INIT"};
    }
};

export default createStore(monReducteur);
