import { createStore } from 'vuex'

const store = createStore({
    state: {
        //[x, y, w, h]
        platform: [0, 0, 0, 0],
        baffle: [0, 0, 0, 0],
        isPlaying: false,
        currentScore: 0,
    },
    mutations: {
    },
    actions: {
    },
    getters: {
    }
})

export default store;