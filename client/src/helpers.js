
export const isAuth=()=>{
if(localStorage.getItem('token')){
	return true
}else{
	return false
 }
}