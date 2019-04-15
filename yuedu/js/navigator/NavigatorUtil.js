

/**
 * 全局导航类
 */

export default class NavigatorUtil{

    // 跳转到任何页面
    static goPage(params,page){
        const{navigation}=params;
        // if(!navigation){
        //     console.log('navigation is null');
        //     return;
        // }
        navigation.navigate(page,{
            ...params
        });
    }
    // 返回首页
    static goBack(params){
        const{navigation}=params;
        navigation.goBack();
    }
    // 导航到主页
    static resetToHomePage(params){
        const{navigation}=params;
        navigation.navigate("Main");
    }

}