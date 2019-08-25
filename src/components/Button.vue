<template>
  <div class="button">
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    title: String
  }
};
</script>


<style scoped>

.button{
  text-decoration: none;
  padding: 1.3rem;
  border: solid 1px;
  width: 10rem;
  margin-bottom: 1rem;
  margin-left: .5rem;
  text-align: center;
  transition: .2s;
  border-radius: .5rem;
  cursor: pointer;
  user-select: none;
}
.button:hover{
  border-color:lightsalmon;
  color: white;
  background: lightsalmon;

}
</style>
