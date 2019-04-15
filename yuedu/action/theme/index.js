import Types from '../Types';

export function onThemeChange(theme){

    return {
        type: Types.THEME_CHANGE,
        theme: theme
    }
}