


const state = {
    todos: [],
    duplicateTodos: []
};

const getters = {
    getTodos: state => state.todos,
    getTodosCount: state => state.duplicateTodos.length,
    getActiveTodosCount: state => state.duplicateTodos.filter(x => x.isCompleted === false).length,
    getCompletedTodosCount: state => state.duplicateTodos.filter(x => x.isCompleted === true).length
};

const actions = {
    addTodo({ commit }, todo) {
        commit('newTodo', todo);
    },
    markTodoAsCompleted({ commit }, todo) {
        commit('setMarkTodoAsCompleted', todo);
    },
    clearCompletedTodos({ commit }) {
        commit('setClearCompletedTodos');
    },
    filterCompletedTodos({ commit }) {
        commit('getCompletedTodos');
    },
    filterActiveTodos({ commit }) {
        commit('getActiveTodos');
    },
    filterAllTodos({ commit }) {
        commit('getAllTodos');
    },
    deleteTodo({ commit, index }) {
        commit('removeTodo', index);
    },
};

const mutations = {
    newTodo: (state, todo) => {
        state.todos.unshift(todo);
        state.duplicateTodos.unshift(todo);
    },
    setMarkTodoAsCompleted: (state, todo) => {
        const getTodo = state.todos.find(x => x.id === todo.id);
        getTodo.isCompleted = true;

        const getDuplicateTodo = state.duplicateTodos.find(x => x.id === todo.id);
        getDuplicateTodo.isCompleted = true;
    },
    setClearCompletedTodos: (state) => {
        state.todos = state.todos.filter(x => x.isCompleted === false);
        state.duplicateTodos = state.duplicateTodos.filter(x => x.isCompleted === false);

    },
    getCompletedTodos: (state) => {
        state.todos = state.duplicateTodos.filter(x => x.isCompleted === true);
    },
    getActiveTodos: (state) => {
        state.todos = state.duplicateTodos.filter(x => x.isCompleted === false);
    },
    getAllTodos: (state) => {
        state.todos = state.duplicateTodos.slice();
    },
    removeTodo: (state, index) => {
        state.duplicateTodos.splice(index, 1);
        state.todos.splice(index, 1);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
