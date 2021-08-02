const getDefaultState = () => {
    return {
        mealName: "",
        snacksName: "",
        remark: "",
        totalPrice: 0,
        timestamp: 0
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
    },
    SET_TOTALPRICE: (state, totalPrice) => {
        state.totalPrice = totalPrice
    },
    SET_TIMESTAMP: (state, timestamp) => {
        state.timestamp = timestamp
    }

}


export default {
    namespaced: true,
    state,
    mutations,
}