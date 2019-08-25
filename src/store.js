import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    papers:[
      {
        id: 'machine',
        title: 'Машина',
        description: 'Маши́на (лат. machina — «устройство, конструкция», от др.-греч. μηχανή — «приспособление, способ») — техническое ((device[приспособление])) выполняющее механические движения для преобразования ((energy[энергии])), материалов и информации.'
      },
      {
        id: 'energy',
        title: 'Энергия',
        description: 'Эне́ргия (др.-греч. ἐνέργεια — действие, деятельность, сила, мощь) — скалярная физическая величина, являющаяся единой мерой различных форм движения и взаимодействия материи, мерой перехода движения материи из одних форм в другие. Используется человеком для приведения ((machine[машин])) в действие'
      },
      {
        id: 'device',
        title: 'Приспособление',
        description: 'Рукотворный объект (прибор, механизм, конструкция, установка) со сложной внутренней структурой, созданный для выполнения определённых функций, обычно в области техники. используется в ((machine[машинах]))'
      },
    ]
  },
  mutations: {
    updatPeapper: (state, params) => {
      if (params.mode == 'create') {
        state.papers.push(params.value);
      } else if (params.mode == 'edit') {
        let paper = state.papers.find(paper => paper.id === params.value.id);
        if (paper){
          paper.id = params.value.newId;
          paper.title = params.value.title;
          paper.description = params.value.description;
        }
      }
    },
    deletePaper: (state, paperId) => {
      for (let i = 0; i < state.papers.length; i++){
        if (state.papers[i].id == paperId) {
          state.papers.splice(i, 1);
        }
      }
    }

  },
  actions: {
    
  },
  getters: {
    getPaper: (state) => (id) => {
      if (id == 'create') {
        return {
          id: '',
          title: '',
          description: ''
        }
      }
      let paper = state.papers.find(paper => paper.id === id);
      if (paper) {
        return paper
      } else {
        return {
          id: '404',
          title: '404',
          description: '404'
        }
      }

    },
    getPapers: state => {
      return state.papers;
    }
  }
})
