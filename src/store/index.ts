import React, { Dispatch } from 'react';
import { Action, Store } from '../types';

const store: Store = {
    fileContent: null,
    layerArray: [],
    visibilityArray: [],
    clickedLayer: null
};

function reducer(state: Store, action: Action) {
    switch (action.type) {
        case 'setFileContent':
            return { ...state, fileContent: action.fileContent };
        case 'setLayerArray':
            return { ...state, layerArray: action.layerArray };
        case 'setVisibilityArray':
            return { ...state, visibilityArray: action.visibilityArray };
        case 'setClickedLayer':
            return { ...state, clickedLayer: action.clickedLayer };
        default:
            return state;
    }
}

const Context = React.createContext<{
    state: Store;
    dispatch: Dispatch<Action>;
}>({ state: store, dispatch: () => {} });

export default { store, reducer, Context };
