import { createStore } from 'vuex';

export default createStore({
    state: {
        logCheck: localStorage.getItem('logCheck') === 'true' || false,
        adminCheck: localStorage.getItem('adminCheck') === 'true' || false,
    },
    mutations: {
        setLogCheck(state, value) {
            state.logCheck = value;
            localStorage.setItem('logCheck', value);
        },
        setAdminCheck(state, value) {
            state.adminCheck = value;
            localStorage.setItem('adminCheck', value);
        },
    },
});