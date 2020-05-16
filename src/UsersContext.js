import React from 'react';

const UsersContext = React.createContext({
    users: [],
    query: '',
    showUserForm: false,
    editUser: undefined
});

export default UsersContext;
