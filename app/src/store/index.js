import { createStore } from 'vuex';
import UsersService from "@/services/UsersService";

export default createStore({
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null,
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
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user)); // Зберігаємо у localStorage
        },
        clearUser(state) {
            state.user = null;
            localStorage.removeItem('user'); // Видаляємо з localStorage
        },
    },
    actions: {
        async fetchProfile() {
            try {
                const response = await UsersService.profile();
                this.user = response.data;
                console.log("User:", this.user);
            } catch (error) {
                console.error("Error fetching profile:", error);
                this.$router.push("/login");
            }
        },
        logOut({ commit }) {
            commit('setLogCheck', false);
            commit('setAdminCheck', false);
            commit('clearUser');
            localStorage.removeItem('token');
        },
    },
    getters: {
        isAuthenticated: (state) => state.logCheck,
        isAdmin: (state) => state.adminCheck,
        getUser: (state) => state.user,
    },
});

