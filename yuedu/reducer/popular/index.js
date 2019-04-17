import Types from '../../action/Types'

const defaultState = {

};

export default function onAction(state = defaultState, action) {

    switch (action.type) {

        // 开始下拉刷新
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [action.key]: {
                    ...state[action.key],
                    isLoading: true,
                    hideLoadingMore: true,
                }
            };
        // 下拉刷新成功    
        case Types.POPULAR_REFRESH_SUCCESS:
            return {
                ...state,
                [action.key]: {
                    ...state[action.key],
                    allItems: action.allItems,
                    items: action.items,
                    isLoading: false,
                    hideLoadingMore: true,
                    page: 1
                }
            };
        // 下拉刷新失败    
        case Types.POPULAR_REFRESH_FAIL:

            return {
                ...state,
                [action.key]: {
                    ...state[action.key],
                    isLoading: false,
                    hideLoadingMore: true,
                }
            };

        //正在加载更多    
        case Types.POPULAR_LOAD_MORE:
            return {
                ...state,
                [action.key]: {
                    ...state[action.key],
                    isLoading: false,
                    hideLoadingMore: false,
                }
            };

        //加载更多成功
        case Types.POPULAR_LOAD_MORE_SUCCESS:
            return {
                ...state,
                [action.key]: {
                    ...state[action.key],
                    isLoading: false,
                    hideLoadingMore: true,
                    items: action.items,
                    page: action.page
                }
            };
        default:
            return state;
    }

}