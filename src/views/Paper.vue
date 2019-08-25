
<template>
  <div class="paper">
    <div class="paper-buttons">
      <div v-on:click='historyBack'>
        <Button :title='"Назад"'></Button>
      </div>
      <div v-if="mode == 'view'">
        <router-link :to="{ path: paper.id + '/edit',  }" class='paper-button'>
          <Button :title='"Редактировать"'></Button>
        </router-link>
      </div>
      <div v-else-if="mode == 'edit' || mode == 'create'">
        <div v-on:click='savePaper'>
          <Button :title='"Сохранить"'></Button>
        </div>
      </div>
    </div>
    
    <div class="paper-content">
      <div class='paper-view' v-if="mode == 'view'">
        <div class='paper-view--title'>{{paper.title}}</div>
        <div class='paper-view--description' v-html='paperContent'></div>
      </div>
      <div v-else-if="mode == 'edit' || mode === 'create'" class='paper-edit' v-on:click='validatorReset'>
        <input v-bind:class="{ invalid: idInvalid }" v-model="currentData.id" placeholder="id">
        <input v-bind:class="{ invalid: titleInvalid }" v-model="currentData.title" placeholder="Заголовок">
        <textarea v-bind:class="{ invalid: descriptionInvalid }" v-model="currentData.description" placeholder="Текст статьи"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'home',
  data: function () {
    return {
       currentData: null,
       paperContent: null,
       idInvalid: false,
       titleInvalid: false,
       descriptionInvalid: false,
    }
  },
  components: {
    Button
  },
  computed: {
    paper(){
      return this.$store.getters.getPaper(this.$route.params.paperId)
    },
    mode(){
      if (this.$route.params.mode){
        return this.$route.params.mode
      } else {
        if (this.$route.params.paperId == 'create'){
          return 'create'
        } else {
          return 'view'
        }
      }
    }
  },
  beforeMount() {
    this.currentData = Object.assign({}, this.paper);
    this.paperContent = this.parsContent(this.currentData.description);
  },
  methods:{
    savePaper(){
      let editPaper = {};
      if (this.mode =='create') {
        editPaper = {
          id: this.currentData.id,
          title: this.currentData.title,
          description: this.currentData.description
        };
      } else if (this.mode =='edit') {
        editPaper = {
          id: this.paper.id,
          newId: this.currentData.id,
          title: this.currentData.title,
          description: this.currentData.description
        };
      }
      let validate = this.validator(this.currentData)
      if (validate){
        this.$store.commit('updatPeapper', {value: editPaper, mode: this.mode});
        this.paperContent = this.parsContent(this.currentData.description);
        this.$router.push({ path: '../'+ this.currentData.id })
      }
    },
    historyBack(){
      this.$router.go(-1);
    },
    validator(data){
      let idPattern = /[-0-9a-zA-Z.]*/;
      let titlePattern = /^$/;
      let descriptionPattern = /^$/;
      let idTest = idPattern.test(data.id);
      if (idTest){
        idTest = titlePattern.test(data.id);
      }
      let titleTest = titlePattern.test(data.title);
      let descriptionTest = descriptionPattern.test(data.description);
      if (idTest) {
        this.idInvalid = true;
      }
      if (titleTest) {
        this.titleInvalid = true;
      }
      if (descriptionTest) {
        this.descriptionInvalid = true;
      }
      if (!idTest && !titleTest && !descriptionTest){
        return true
      }
    },
    validatorReset(){
      this.idInvalid = false;
      this.titleInvalid = false;
      this.descriptionInvalid = false;
    },
    replacer(str) {
      let matchId = str.match(/(\({2}).*(\[{1})/)[0];
      let matchName = str.match(/(\[{1}).*(\]{1})/)[0];
      let id = matchId.substring(2, matchId.length - 1);
      let name = matchName.substring(1, matchName.length - 1);
      return `
        <a class='paperlinks' href='/`+ id +`' }" >
          <span >`+name+`</span>
        </a>
      `;
    },

    parsContent(content){
      let newString = content.replace(/(\({2})[^\){2}]*(\){2})/g, this.replacer);
      return newString
    }
  }
}
</script>

<style scoped>
.paper{
  font-family: Arial, Helvetica, sans-serif;
  flex: 1;
  display: flex;
  flex-direction: column; 
}
.paper-content{
  flex: 1;
}
.paper-edit{
   height: 100%;
   display: flex;
   flex-direction: column;
}
input{
  width: 100%;
  height: 30px;
  padding: 10px;
  text-align: center;
  outline: none;
  border: none;
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
}
textarea{
  width: 100%;
  padding: 10px;
  resize: none;
  outline: none;
  border: none;
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
  flex: 1;
  text-align: justify;
  box-sizing: border-box;
}
.paper-view{
  width: 100%;
}
.paper-view div{
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  
}
.paper-view--title{
  text-align: center;
  font-size: 20px;
}
.paper-view--description{
  text-align: justify;
  font-size: 15px;
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
.invalid{
  border: 1px solid red;
}
</style>

<style>
.paperlinks{
  color: coral;
  font-weight: bold;
  text-decoration: none;
}
</style>