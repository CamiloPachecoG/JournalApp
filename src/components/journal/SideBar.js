import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

import { JournalEntries } from './JournalEntries';


export const SideBar = () => {


    const dispatch = useDispatch();

    const { name } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch( startLogout() );
    }

    const handleAddNew = () => {
        dispatch( startNewNote() );
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <i className="fas fa-user"></i>
                    <span> { name }</span>
                </h3>


                <button 
                    className="btn mt-5"
                    onClick={ handleLogout }
                >
                    <span>Logout</span>
                </button>
            </div>

            <div 
                className="journal__new-entry"
                onClick={ handleAddNew }
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>
            </div>

            <JournalEntries />

        </aside>
    )
}
