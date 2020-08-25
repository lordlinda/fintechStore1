import axios from 'axios'
import {toast} from 'react-toastify'


export const  setAuth=()=>{
  if(localStorage.token){
    return dispatch=>{
       dispatch({
        type:'auth'
       })
    }
  }
}

export const signUp=(user)=>{
	return async dispatch=>{
		dispatch({
               	type:'setLoading'
               })
      await axios
                .post('/users/signup',user)
                .then(res=>{
                	dispatch({
                		type:'signUp',
                		payload:res.data
                	})
                  dispatch(setAuth())
                   localStorage.setItem('token',res.data.token)
                }).catch(err=>{
                  //console.log(err)
                  toast.error(err.response.data.msg)
                  dispatch({
                		type:'authError',
                		payload:err.response.data.msg
                	})
                })
	}
}

export const signIn=(user)=>{
	return async dispatch=>{
		dispatch({
               	type:'setLoading'
               })
      await axios
                .post('/users/signin',user)
                .then(res=>{
                	console.log(res.data)
                	dispatch({
                		type:'signIn',
                		payload:res.data
                	})
                  
                   localStorage.setItem('token',res.data.token)
                   dispatch(setAuth())
                }).catch(err=>{
                  toast.error(err.response.data.msg)
                  dispatch({
                		type:'authError',
                		payload:err
                	})
                })
	}
}

export const forgetPassword=(email)=>{
	return async dispatch=>{
		dispatch({
               	type:'setLoading'
               })
      await axios
                .post('/users/forgetPassword',{email:email})
                .then(res=>{
                	//console.log(res.data)
                	dispatch({
                		type:'forgetPassword',
                		payload:res.data.msg
                	})
                }).catch(err=>{
                  dispatch({
                		type:'authError',
                		payload:'Please try again'
                	})
                })
	}
}

export const resetPassword=(password,token)=>{
	return async dispatch=>{
		dispatch({
               	type:'setLoading'
               })
      await axios
                .patch('/users/resetPassword',{password:password,token:token})
                .then(res=>{
                	console.log(res.data)
                	dispatch({
                		type:'resetPassword',
                		payload:res.data.msg
                	})
                }).catch(err=>{
                  dispatch({
                		type:'authError',
                		payload:err.response.data.msg
                	})
                })
	}
}

export const getProducts=()=>{
	return async dispatch=>{
		dispatch({
               	type:'setLoading'
               })
      await axios
                .post('/products/getProducts')
                .then(res=>{
                	//console.log(res.data)
                	dispatch({
                		type:'getProducts',
                		payload:res.data.products
                	})
                  dispatch(setAuth())
                }).catch(err=>{
                  console.log(err)
                })
	}
}
export const getByCategory=(category)=>{
  return async dispatch=>{
    dispatch({
                type:'setLoading'
               })
    await axios
                .post('/products/getProducts',{category:category})
                .then(res=>{
                  console.log(res.data)
                  dispatch({
                    type:'getByCategory',
                    payload:res.data.products
                  })
                  dispatch(setAuth())
                }).catch(err=>{
                  console.log(err)
                })
  }
}

export const addToCart=(item)=>{
  return dispatch=>{
    dispatch({
       type:'AddToCart',
       payload:item
    })
   dispatch(setAuth())
  }

}

export const removeFromCart=(item)=>{
  return dispatch=>{
    dispatch({
       type:'removeFromCart',
       payload:item
    })
   dispatch(setAuth())
  }

}

export const makePayment=(data)=>{
  return async dispatch=>{
               dispatch({
                type:'setLoading'
               })
     await axios.post('/users/handlePayments',data)
                .then(res=>{
                  //console.log(res.data)
                  dispatch({
                 type:'makePayment',
                 payload:res.data.msg
              })
                dispatch(setAuth())
                }).catch(err=>{
                  dispatch({
                    type:'paymenterror',
                    payload:err.response.data.msg
                  })
                })
  }
}


export const getHistory=()=>{
  return async dispatch=>{
               dispatch({
                type:'setLoading'
               })
     await axios.get('/users/history')
                .then(res=>{
                  //console.log(res.data)
                  dispatch({
                 type:'getPurchases',
                 payload:res.data.history
              })
               dispatch(setAuth())
                }).catch(err=>{
                  dispatch({
                    type:'paymenterror',
                    payload:err
                  })
                })
  }
}
export const signOut=()=>{
  return dispatch=>{
    localStorage.removeItem('token')
    dispatch({
          type:'signout',
          payload:''
    })
  }
}

