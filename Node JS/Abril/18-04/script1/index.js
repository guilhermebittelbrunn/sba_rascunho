const redux = require('redux');

const state = {
    value: 3,
};

const increment_action = (value) => {
    return {
        type: 'INCREMENT',
        payload: value,
    };
};
const decrement_action = (value) => {
    return {
        type: 'DECREMENT',
        payload: value,
    };
};

const allReducers = redux.combineReducers({
    count: countReducer,
    list: reducerList,
});
const combineStore = redux.createStore(allReducers);

function countReducer(stateValue = state.value, action) {
    switch (action.type) {
        case 'INCREMENT':
            return (stateValue += action.payload);
        case 'DECREMENT':
            return (stateValue -= action.payload);
        default:
            return stateValue;
    }
}

const AddItem = (item) => {
    return { type: 'ADD_ITEM', payload: item };
};
const RemoveItem = { type: 'REMOVE_ITEM' };

function reducerList(list = ['item antigo'], action) {
    switch (action.type) {
        case 'ADD_ITEM':
            return [...list, action.payload];
        case 'REMOVE_ITEM':
            return [...list.slice(0, list.length - 1)];
        default:
            return list;
    }
}
combineStore.subscribe(() => {
    console.log(combineStore.getState());
});

combineStore.dispatch(increment_action(2));
combineStore.dispatch(increment_action(2));
combineStore.dispatch(increment_action(3));
combineStore.dispatch(decrement_action(3));

combineStore.dispatch(AddItem('item 1'));
combineStore.dispatch(AddItem('item 2'));
combineStore.dispatch(RemoveItem);
combineStore.dispatch(RemoveItem);
