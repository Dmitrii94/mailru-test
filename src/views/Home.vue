<template>
  <div class="home">
    <router-link :to="{ path: '/create',  }" class='create-button'>
      <Button :title='"Создать статью"'></Button>
    </router-link>
    <div v-for="paper in papers" :key="paper.id">
      <router-link :to="{ path: paper.id,  }" class='list-row'>
        <div class='row-title'>{{paper.title}}</div>
        <div class='button-block'>
          <router-link :to="{ path: paper.id + '/edit',  }" class='paper-button'>
            <span >edit</span>
          </router-link>
          <a class='paper-button' v-on:click.prevent='deletePaper(paper.id)'>delete</a>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Button from '@/components/Button.vue';

export default {
  name: 'home',
  components: {
    Button
  },
  methods:{
    deletePaper(paperId){
      this.$store.commit('deletePaper', paperId);
    }
  },
  computed: {
    papers(){
      return this.$store.getters.getPapers
    }
  }

}
</script>

<style scoped>
.home{
  font-family: Arial, Helvetica, sans-serif;
}
.list-row{
  display: flex;
  flex-direction: row;
  padding: 10px;
  font-size: 18px;
}
.list-row:hover{
  background-color: rgba(215, 87, 44, 0.144);
  
}
.row-title{
  display: inline;
  flex: 1;
}
.paper-button{
  display: inline;
  margin-left: 15px;
}
a:hover, a:active, a:focus, a:visited, a:link  {
    outline: 0;
    color: black;
}
a{ 
  text-decoration: none;
}
a:hover{ 
  text-decoration: none;
}
.button-block a:hover{
  color: coral;
}
</style>

