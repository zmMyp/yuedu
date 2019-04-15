import Types from '../../action/Types'

const defaultState = {
    theme: 'blue'
}

export default function onAction(state = defaultState, action) {

    switch (action.type) {
        case Types.THEME_CHANGE:

            return {// 合并状态state
                ...state,
                theme: action.theme
            }
        default:
            return state
    }
}