import Swal from 'sweetalert2';

import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';


export const startNewNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection(`${ uid }/journal/notes`).add(newNote);

        dispatch( activeNote( doc.id, newNote ) );
        dispatch( addNewNote( doc.id, newNote ) );
    }
}

export const activeNote = ( id, note ) => ({

    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadNotes = ( uid ) => {
    return async( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    } 
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = ( note ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if (!note.url) {
            delete note.url;
        }

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        try {
            await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore );
        } catch( err ) {
            Swal.fire('Error', err, 'Error');
        }
        
        dispatch( refreshNote( note.id, note) );
        Swal.fire('Saved', note.title, 'success');
    }
}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active:activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        const allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

        if(!allowedExtensions.exec(file.name)){

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'the file must be an image (jpg, jpeg, png, gif)'
              });

        }else {

            const fileUrl = await fileUpload( file );
            activeNote.url = fileUrl;
    
            dispatch( startSaveNote( activeNote ) );
    
            Swal.close();
        }
    }
}

export const startDeleting = ( id ) => {
    return async( dispatch, getState) => {
        
        const { uid } = getState().auth;
        await db.doc(`${ uid }/journal/notes/${ id }`).delete();

        Swal.fire({
            title: 'Do you want to deleted?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Delete`,
            denyButtonText: `Don't Delete`,

          }).then((result) => {
            if (result.isConfirmed) {

              Swal.fire('Deleted', '' , 'success')
              dispatch( deleteNote(id) );

            } else if (result.isDenied) {

              Swal.fire('Not deleted', '', 'info')
            }
          })
    }
}

export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id
});

export const noteLogout = () => ({
    type: types.notesLogoutCleaning,

});