import React, {useContext, useReducer} from 'react';
import UsersContext from './UsersContext';
import UsersReducer from './UsersReducer';
import './App.scss';
import UsersTable from "./components/UsersTable";
import UsersControlBar from "./components/UsersControlBar";
import AddUser from './components/AddUser';

function App() {
    const initialState = useContext(UsersContext);
    const [state, dispatch] = useReducer(UsersReducer, initialState);

    return (
        <UsersContext.Provider value={{state, dispatch}}>
            <div className='users-app'>
                <div className='users-app-content'>
                    <div className="main-app">
                        <UsersControlBar/>
                        <div className="users-app-table">
                            <UsersTable/>
                        </div>
                    </div>
                    {state.showUserForm ?
                        (<div className="side-app">
                            <div className="users-app-new-user">
                                <AddUser/>
                            </div>
                        </div>) : ''}
                </div>
            </div>
        </UsersContext.Provider>
    );
}

export default App;
