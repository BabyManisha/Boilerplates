<template>
  <div>
    <div class="box" id="heading">
      <h2 class="heading"> Todos </h2>
    </div>

    <div class="box todo-list">

      <div class="item" v-for="(todo, index) in todos" :key="index">
        <input type="checkbox" name="index" @change="deleteTodo(index)">
        <input type="text" :id="`id-${index}`" name="index" :value="todo" @change="updateTodo(index)">
      </div>

      <div class="item">
        <input type="text" class="newitem" name="newItem" placeholder="New Todo" autocomplete="off" required v-model="newItem" v-on:keyup.enter="addTodo">
        <button type="submit" name="list" @click="addTodo">+</button>
      </div>

    </div>

    <div class="logout">
      <a href="/logout">Logout</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Todo",
  props: {
    todos: Array
  },
  data() {
    return {
      newItem: ''
    };
  },
  methods: {
    addTodo(){
      const url = '/user/';
      let self = this;
      self.$http.post(url, {newItem: self.newItem})
      .then((data) => {
        self.newItem = '';
        const resData = data.data;
        if(resData && resData.isAuthenticated){
          self.todos = resData.todos;
        }else{
          window.location.href = '/logout';
        }
      });
    },
    deleteTodo(index){
      const url = '/user/delete';
      let self = this;
      self.$http.post(url, {index: index})
      .then((data) => {
        const resData = data.data;
        if(resData && resData.isAuthenticated){
          self.todos = resData.todos;
        }else{
          window.location.href = '/logout';
        }
      });
    },
    updateTodo(index){
      const url = '/user/update';
      let self = this;
      self.$http.post(url, {index: index, newItem: document.getElementById(`id-${index}`).value})
      .then((data) => {
        const resData = data.data;
        if(resData && resData.isAuthenticated){
          self.todos = resData.todos;
        }else{
          window.location.href = '/logout';
        }
      });
    },
  }
};
</script>
