<template>
    <div>
        <div class="row">
            <div class="offset-xl-3 col-xl-6 card">

                    <div class="row" style="text-align: center; padding-right: 50px;">
                        <div class="offset-xl-1 col-xl-11">
                            <form class="form-group" v-on:submit.prevent="onAddTodo">
                                <input
                                        class="form-control"
                                        type="text"
                                        placeholder="What needs to be done"
                                        v-model="title">
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-12" v-for="(todo, index) in getTodos" v-bind:key="todo.id">

                            <div class="row" id="parent">
                                <div class="col-xl-1" v-on:click="onMarkTodoAsCompleted(todo)">

                                </div>
                                <div class="col-xl-9">
                                    <div v-on:click="enableEditMode(todo)" v-if="!todo.editMode">

                                        <span v-if="todo.isCompleted" v-bind:class="{'is-completed': todo.isCompleted}">
                                            <i class="fas fa-check-circle"></i>  {{ todo.title }}
                                        </span>

                                        <span v-else>
                                            {{ todo.title }}
                                        </span>


                                    </div>
                                    <div v-if="todo.editMode">
                                        <form v-on:submit.prevent="enableEditMode(todo)">
                                            <input class="form-control"
                                                   ref="input"
                                                   type="text"
                                                   v-model="todo.title">
                                        </form>
                                    </div>
                                </div>
                                <div class="col-xl-1 child"
                                     v-on:click="onDeleteTodo(index)"
                                     style="opacity: .6; cursor: pointer">
                                    <i class="fas fa-times"></i>
                                </div>
                            </div>
                        </div>
                        <div class="row actions" style="padding-left: 20px; padding-right: 20px;">
                            <div class="col-xl-4">
                               <span v-if="getActiveTodosCount !== 0"> {{ getActiveTodosCount }}
                                <span v-if="getActiveTodosCount === 1">item left</span>
                                <span v-else>items left</span>
                               </span>
                            </div>

                            <div class="col-xl-5" v-if="getTodosCount !== 0">
                                <span style="padding-right: 20px; cursor: pointer"
                                      @click="onGetAllTodos">
                                    All
                                </span>
                                <span style="padding-left: 20px; padding-right: 20px; cursor: pointer"
                                      @click="onGetActiveTodos">
                                    Active
                                </span>
                                <span style="padding-left: 20px; cursor: pointer"
                                      @click="onGetCompletedTodos">
                                    Completed
                                </span>
                            </div>

                            <div v-if="getCompletedTodosCount > 0"
                                 @click="onClearCompleted"
                                 class="col-xl-3" style="text-align: right; cursor: pointer">
                                Clear completed
                            </div>
                        </div>
                    </div>

            </div>
        </div>
    </div>
</template>


<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: 'Todos',
        computed: mapGetters(['getTodos',
            'getTodosCount',
            'getActiveTodosCount',
            'getCompletedTodosCount']),
        data() {
            return {
                editMode: false,
                title: ''
            }
        },
        methods: {
            ...mapActions(
                [
                    'addTodo',
                    'markTodoAsCompleted',
                    'filterCompletedTodos',
                    'filterActiveTodos',
                    'filterAllTodos',
                    'clearCompletedTodos',
                    'deleteTodo'
                ]
            ),
            onAddTodo() {
                if (this.title !== '') {
                    const todo = {id: Date.now(), title: this.title, editMode: false, isCompleted: false};
                    this.addTodo(todo);
                    this.title = '';
                }
            },
            enableEditMode(todo) {
                this.getTodos.forEach(x => {
                    if (x.id !== todo.id) {
                        x.editMode = false;
                    }
                });
                todo.editMode = !todo.editMode;
            },
            onMarkTodoAsCompleted(todo) {
                this.markTodoAsCompleted(todo);
            },
            onGetCompletedTodos() {
                this.filterCompletedTodos();
            },
            onGetActiveTodos() {
                this.filterActiveTodos();
            },
            onGetAllTodos() {
                this.filterAllTodos();
            },
            onClearCompleted() {
                this.clearCompletedTodos();
            },
            onDeleteTodo(index) {
                this.deleteTodo(index);
            }
        }
    }
</script>


<style scoped lang="scss">
    .card {
        -webkit-box-shadow: 4px 10px 71px -7px rgba(153,153,153,0.59);
        -moz-box-shadow: 4px 10px 71px -7px rgba(153,153,153,0.59);
        box-shadow: 4px 10px 71px -7px rgba(153,153,153,0.59),
        0 1px 1px rgba(119, 119, 119, 0.15),
        0 10px 0 -5px #fff,
        0 10px 1px -4px rgba(119, 119, 119, 0.15),
        0 20px 0 -10px #fff,
        0 20px 1px -9px rgba(119, 119, 119, 0.15);
    }
    .actions{
        width: 100%!important;
        font-size: 14px;
        opacity: .7;
        padding-left: 15px;
        padding-right: 15px;
    }
    .is-completed {
        text-decoration: line-through;
        opacity: .5;
    }
    #parent .child{
        display: none;
    }
    #parent:hover .child{
        display: block;
    }
</style>
