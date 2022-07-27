export function isValid(value) {
    return value.length >= 10 && value.length <= 79
}

const sidebar = document.getElementById('sidebar')

export function sidebarColor(v) {
    if (v) {
        sidebar.style.backgroundColor = '#ff97b6'
    } else {
        sidebar.style.backgroundColor = '#ff0080'

    }
}
