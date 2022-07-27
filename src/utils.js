export function isValid(value) {
    return value.length >= 10
}

export function sidebarColor(v) {
    if(v){
        sidebar.style.backgroundColor = '#ff97b6'
    }else{
        sidebar.style.backgroundColor = '#ff0080'

    }
}
