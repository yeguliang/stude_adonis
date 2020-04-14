import {allUserData,creatUser,findUser,updataUser,deleteUser} from "../services/api"
export default {
  namespace: 'indexPage',
  state: {
    allUserData:null,
  },
  effects:{
    *get_all_user({ payload }, { put, call }) {
      let allUserData = yield allUserData()
      yield put({
        type:'setState',
        payload:{
          allUserData 
        }
      }) 
    },
  },
  reducers:{
    setState(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
 

//   Subscription 语义是订阅，用于订阅一个数据源，然后根据条件 dispatch 需要的 action。
// 数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。

  subscriptions:{
    haha({dispatch,history}){
      history.listen(({pathname})=>{
        if(pathname==="/user"){
          dispatch({
            type:"testPath"
          })
        }
      })
    }
  }

};
