

export const types = {

    //Login
    login: '[auth] login',
    logout: '[auth] logout',

    //Errores de validacion
    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',

    //Loading for disable button
    uiStarLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',
    
    //All notes
    notesAddNew: '[Notes] New Note',
    notesActive: '[Notes] Set active note',
    notesLoad: '[Notes] Load notes',
    notesUpdated: '[Notes] Update note',
    notesFileUrl: '[Notes] Update image url',
    notesDelete: '[Notes] Delete note',
    notesLogoutCleaning: '[Notes] Logout Cleaning'
}