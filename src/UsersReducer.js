export default function UsersReducer (state, action){
    const actionPayload = action.payload;
    switch(action.type) {
        case "GET_USERS":
            return {
                ...state,
                users: actionPayload.users
            };
        case "ADD_USER_AND_CLOSE_FORM":
            return {
                ...state,
                showUserForm: false,
                users: [...state.users, actionPayload]
            };
        case "SET_QUERY":
            return{
                ...state,
                query: actionPayload.query
            };
        case "SET_SHOW_USER_FORM":
            return {
                ...state,
                showUserForm: actionPayload.showUserForm
            };

        case "SET_EDIT_USER_AND_OPEN_FORM":
            return {
                ...state,
                editUser: actionPayload.editUser,
                showUserForm: true,
            };
        case "UPDATE_USER_AND_CLOSE_FORM":
            const updateUser = {...action.payload};
            const updatedUserIndex = state.users.findIndex(user => user.ID === updateUser.ID);
            const updatedUsers = [...state.users.slice(0, updatedUserIndex), updateUser, ...state.users.slice(updatedUserIndex + 1)];
                return {
                ...state,
                    editUser: undefined,
                    showUserForm: false,
                    users: updatedUsers
                };

        default:
            return state;
    }
}
