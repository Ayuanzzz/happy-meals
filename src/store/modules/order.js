const getDefaultState = () => {
    return {
        mealName: "",
        snacksName: "",
        remark: ""
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_MEAL: (state, mealName) => {
        state.mealName = mealName
    },
    SET_SNACKS: (state, snacksName) => {
        state.snacksName = snacksName
    },
    SET_REMARK: (state, remark) => {
        state.remark = remark
    }
}


export default {
    namespaced: true,
    state,
    mutations,
}