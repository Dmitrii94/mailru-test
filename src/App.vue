<template>
  <div id="app">
    <div id="header">
      <router-link to="/" class='header-link'>
        <img class='wiki_logo' alt="Vue logo" src="./assets/wiki.png">
        <span>My-wiki</span>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 50%;
  margin: 0 auto;
}
@media (max-width: 800px){
  #app {
    width: 70%;
  }
  #header span {
    font-size: 30px;
  }
}
@media (max-width: 680px){
  #app {
    width: 80%;
  }
}
@media (max-width: 500px){
  #app {
    width: 90%;
  }
}
.header-link{
  display: flex;
  align-items: center;
  margin-bottom:10px; 
}

.header-link span{
  margin-left: 20px;
  font-size: 50px;
  color:coral; 
}

.wiki_logo{
  width: 130px;
  height: auto;
  display: inline-block;
}
a:hover, a:active, a:focus, a:visited {
    outline: 0;
    color: black;
}
a{ 
  text-decoration: none;
}
a:hover{ 
  text-decoration: none;
}
</style>
