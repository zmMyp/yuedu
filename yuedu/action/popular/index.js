import Types from '../Types';
import DataStore from '../../js/dao/DataStore';

/**
 * 下来刷新
 * @param {*} url 
 */
export function onRefreshPopular(url,key) {

    return dispatch => {
        dispatch({ type: Types.POPULAR_REFRESH });
        let dataStore = new DataStore();
        dataStore.fetchData(url)
            .then(data => {
                //返回数据样式参看res/data/popular.json
              dispatch({
                    type: Types.POPULAR_REFRESH_SUCCESS,
                    items: data.data.items,
                    key
                 })
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: Types.POPULAR_REFRESH_FAIL,
                    error,
                    key
                });
            })
    }
}