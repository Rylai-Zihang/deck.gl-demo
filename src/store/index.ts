import React, { Dispatch } from 'react';
import { Action, Store } from '../types';

const store: Store = {
    fileContent: null,
    clickedLayer: '',
    layerStatus: {}
};

function reducer(state: Store, action: Action) {
    switch (action.type) {
        case 'setFileContent':
            return { ...state, fileContent: action.fileContent };
        case 'setLayerStatus':
            return { ...state, layerStatus: action.layerStatus };
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
