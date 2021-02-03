import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes)

    const handleSave = () => {
        
        dispatch( startSaveNote( active ) );
    }

    const handlePictureUpload = ( ) => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {

        const file = e.target.files[0];
        if ( file ) {
            dispatch( startUploading( file ) );
        }
    }

    
    return (
        <div className="notes__appbar">
            <span> { moment(active.date).format('LL') } </span>

            <input
                id="fileSelector" 
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />


            <div>
                <i class="far fa-images"></i>
                <button 
                    className="btn"
                    onClick={ handlePictureUpload }
                >
                    Picture
                </button>

                <i class="far fa-save"></i>
                <button 
                    className="btn "
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
