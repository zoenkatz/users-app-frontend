import React, {useContext, useState, useCallback} from "react";
import UsersContext from "../UsersContext";
import {DebounceInput} from 'react-debounce-input';
import UseEventListener from '../CustomHooks/UseEventListener';

const UsersControlBar = () => {
    const {state, dispatch} = useContext(UsersContext);
    const [queryInput, setQueryInput] = useState("");

    const openUserForm = useCallback(() => {
        if(!state.showUserForm) {
            dispatch({type: 'SET_SHOW_USER_FORM', payload: {showUserForm: true}});
        }
    }, [dispatch, state.showUserForm]);

    const searchUser = (e) => {
        //set query input on state
        setQueryInput(e.target.value);
    };

    const handleEnterKey = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            handleSearchClick();
        }

    };

    UseEventListener('keyup', handleEnterKey, document.getElementById('users-search'));

    const handleSearchClick = useCallback(() => {
        dispatch({type: "SET_QUERY", payload: {query: queryInput}});
    }, [queryInput, dispatch]);


    return (
        <div className="users-control-bar">
            <div className="search-lining">
                <DebounceInput type="search"
                               list="last-queries"
                               placeholder="Search for user"
                               id="users-search"
                               name="q"
                               onFocus={(event) => event.target.placeholder = ""}
                               onBlur={(event) => event.target.placeholder = "Search for user..."}
                               value={queryInput}
                               minLength={1}
                               debounceTimeout={300}
                               onChange={(event) => {
                                   searchUser(event);
                               }}

                />
                <button onClick={handleSearchClick} className="button pulse">Search</button>
            </div>
            <div className="add-new-user-button">
                <button onClick={openUserForm} className="button pulse">+ Add new user</button>
            </div>
        </div>
    );
};

export default UsersControlBar;
