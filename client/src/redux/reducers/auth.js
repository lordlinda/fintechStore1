const initState={
	token:'',
	Msg:'',
	loading:false,
	name:'',
	isAuth:false,
	sucess:false,
	products:[],
	cart:[],
	history:[]
}
const token = localStorage.getItem('token')

export default (state=initState,action)=>{
	switch(action.type){
		case 'signUp':
		return {
			...state,
			token:action.payload.token,
			name:action.payload.name,
			loading:false,
			isAuth:true
		}
		case 'signIn':
		return {
			...state,
			token:action.payload.token,
			loading:false,
			isAuth:true
		}

		case 'setLoading':
		return {
			...state,
			loading:true,
			isAuth:token ? true :false
		}
		case 'authError':
		return {
			...state,
			loading:false,
			isAuth:false,
			Msg:action.payload,

		}
		case 'forgetPassword':
		case 'resetPassword':
		case 'signout':
		return {
			...state,
			loading:false,
			isAuth:false,
			Msg:action.payload,
			sucess:true
		}
		case 'getProducts':
		case 'getByCategory':
		return {
			...state,
			loading:false,
			products:action.payload,
			isAuth:token ? true :false
			
		}
		case 'AddToCart':
		return {
			...state,
			cart:[action.payload,...state.cart],
			isAuth:token ? true :false
			
		}
		case 'removeFromCart':
		return {
			...state,
			cart:state.cart.filter(cartItem => cartItem.id !== action.payload ),
			isAuth:token ? true :false
			
		}
		case 'makePayment':
		return {
			...state,
			cart:[],
			Msg:action.payload,
			sucess:true,
			isAuth:token ? true :false

		}
		case 'getPurchases':
		return {
			...state,
			history:action.payload,
			isAuth:token ? true :false
		}
		default:
		return state
	}
}