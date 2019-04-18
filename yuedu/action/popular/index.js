import Types from '../Types';
import DataStore from '../../js/dao/DataStore';

/**
 * 下拉刷新
 * @param {*} url 
 */
export function onRefreshPopular(url, key, page_size) {

    return dispatch => {
        dispatch({ type: Types.POPULAR_REFRESH });
        let dataStore = new DataStore();
        dataStore.fetchData(url)
            .then(data => {
                //返回数据样式参看res/data/popular.json
                setTimeout(()=>{
                    let allItems = data.data.items; // 返回的所有数据
                    let items = [];
                    //刷新默认取0-page_size的数据
                    if (Array.isArray(allItems) && allItems.length > 0) {
                        items = allItems.slice(0, page_size);
                    }
                    console.log('items->'+items.length);
                    //刷新成功
                    dispatch({
                        type: Types.POPULAR_REFRESH_SUCCESS,
                        allItems: allItems,//下载的所有数据，模拟分页的所有数据
                        items: items,
                        key:key,
                       })
                },1000);
                
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

/**
 * 上拉加载更多
 */
export function onLoadMorePopular(url, key,allItems,page_size,page,callback) {

    return dispatch => {

        dispatch({ type: Types.POPULAR_LOAD_MORE, key })

        setTimeout(() => {
             
            //截取对应页码的数据
            let items=[];
            items=(page+1)*page_size<allItems.length?allItems.slice(0,(page+1)*page_size):allItems;
            dispatch({ 
                type: Types.POPULAR_LOAD_MORE_SUCCESS, 
                key:key,
                allItems:allItems,
                items:items,
                page: page+1
             })
            if((page)*page_size>=allItems.length&&typeof callback === 'function'){
                callback();
            }
            

        }, 1000);
    }
}

