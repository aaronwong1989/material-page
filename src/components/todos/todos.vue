<template>
  <div class="text-xs-center">
     <v-badge overlap >
         <v-icon slot="badge" dark small  v-show="todos.length==0">done</v-icon>
         <span slot="badge"  v-show="todos.length>0">{{todos.length}}</span>
         
    <v-menu
      :close-on-content-click="false"
      :nudge-width="300"
      v-model="menu"
      offset-x
    >
    
    
    <v-btn  slot="activator" icon>
        <v-icon>menu</v-icon>
    </v-btn>
      <v-card>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img class='myico' src="/icon/gitlab-favicon-192x192.png" alt="ico">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>ZYBank Work - Todo</v-list-tile-title>
              <v-list-tile-sub-title>待办 · {{todos.length==0?'暂无':todos.length}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                :ripple="false"
                :class="todos.length==0 ? 'green--text' : 'grey--text'"
                icon
              >
                <v-icon>check_circle</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-text-field flat solo label="添加一条待办" v-on:keyup.13="addTodo" v-model="todoInput"></v-text-field>
        <v-divider></v-divider>
        <div style="max-height: 300px; overflow: auto;">
            <v-list v-for="(item, index) in todos" :key="index" avatar>
          <v-list-tile v-ripple>
            <v-list-tile-content>
              <v-list-tile-title style="width:250px;">{{item}}</v-list-tile-title>
            </v-list-tile-content>
            <v-btn icon @click="removeTodo(index)">
                <v-icon>cancel</v-icon>
              </v-btn>
          </v-list-tile>
        </v-list>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="menu = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
    </v-badge>
  </div>
</template>


<script type="text/ecmascript-6">
export default {
  data: () => ({
    fav: true,
    menu: false,
    todoInput:"",
    progressShow:true,
    todos:localStorage.todoList ? JSON.parse(localStorage.todoList) : ["检查和配置DNS","安装gitbash","申请gitlab账号"]
  }),
  watch: {
    menu() {
      if (this.menu) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "auto";
      }
    },
    todos: { //监听todos变化
          handler: function (items) {
            localStorage.todoList = JSON.stringify(items);
          },
          deep: true //handler:{},deep:true 深度监听todos
        }
  },
  methods:{
    addTodo(){
        if(this.todoInput == ""){
            return false;
        }
        this.todos.unshift(this.todoInput);
        this.todoInput = "";
    },
    removeTodo(index){
        this.todos.splice(index,1);
    }
  }
};
</script>

<style scope>
.myico {
  border-radius: 0 !important;
}
.badge--overlap .badge__badge {
  top: 3px;
  right: 1px;
}
.badge .badge__badge{
    background: #2196f3 !important;
}
</style>


