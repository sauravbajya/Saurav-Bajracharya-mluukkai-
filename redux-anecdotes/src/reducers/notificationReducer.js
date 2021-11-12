
const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.message
        default:
            return state
    }
}

//action creator

export const notify = (message, time) => {
    return dispatch => {
        dispatch({
            type: 'NOTIFICATION',
            message:message,
        })
         setTimeout(() => {
            dispatch({
                type: 'NOTIFICATION',
                message: null,
            })
        }, time*1000)
      
    }
}

export default notificationReducer