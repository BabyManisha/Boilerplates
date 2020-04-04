<template>
  <v-app>
    <v-content>
      <div class="container">
        <Todo v-if="isAuthenticated" :todos="todos" />
        <div v-else>
          <h1>Welcome to ToDo App</h1>
          <a href="/auth/google" class="a-input">
            Login with Google
          </a>
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<script>
import Todo from './components/Todo';

export default {
  name: 'App',
  components: {
    Todo,
  },
  data: () => ({
    isAuthenticated: false,  
    todos: []
  }),
  created(){
    const url = '/user/';
    let self = this;
    self.$http.get(url)
    .then((data) => {
      const resData = data.data;
      if(resData && resData.isAuthenticated){
        self.isAuthenticated = true;
        self.todos = resData.todos;
      }else{
        self.isAuthenticated = false;
      }
    });
  }
};
</script>