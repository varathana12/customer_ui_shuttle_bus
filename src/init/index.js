const path = window.location.pathname
var array = path.split('/');
export const init_status_app_bar = array[array.length -1] === "profile" ? true : false;

export const init_route_name = array[array.length-1]