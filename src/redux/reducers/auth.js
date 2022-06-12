
// import ActionTypes from '../actions/actionTypes' ;

const INITIAL_STATE = {
    isAuthenticated : false ,
    access_token : '' ,
}

export default ( state={INITIAL_STATE} , action={} ) => {
    switch(action.type) {
        default :
            return state ;
    }
}