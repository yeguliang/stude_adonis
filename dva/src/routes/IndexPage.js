import React from 'react';
import {connect} from "dva";
import PropTypes from 'prop-types';

import {allUserData,creatUser,findUser,updataUser,deleteUser} from "./../services/api"

class IndexPage extends React.Component{
  state={
    allUserInformation:null,
    name:"",
    password:"",
    sex:0,
  }
  componentDidMount(){
    this.getAllUser()
  }
  getAllUser = async ()=>{
    let allUserInformation = await allUserData()
    this.setState({allUserInformation})
  }
  delete_user = async (i)=>{
    let allUserInformation = await deleteUser({params:{id:`${i}`}})
    await this.getAllUser()
  }
  creat_user = async ()=>{
    const {name,password,sex} = this.state
    await creatUser({params:{name,password,sex:(sex-0)}})
    await this.getAllUser()
  }
  updata_user = async (i)=>{
    const {name,password,sex} = this.state
    await updataUser({params:{id:i,name,password,sex:(sex-0)}})
    await this.getAllUser()
  }
  render(){
    const {  allUserInformation ,name,password} = this.state
    return (
      <div>
        <h3 style={{display:'flex',textAlign:'center',margin:'20px'}}>我是首页</h3>
        <div style={{display:'flex',flexDirection:'column',margin:'20px'}}>
          <input type='text' value={name} onChange={(e)=>{
            this.setState({name:e.target.value})
          }}/> <br/>  
          <input type='password' value = {password} onChange={(e)=>{
            this.setState({password:e.target.value})
          }}/> <br/>  
          <select name="sex" onChange={(e)=>{
            console.log(e.target.value)
            this.setState({sex:e.target.value})
          }}>
            <option value= '0' >女</option>
            <option value= '1' >男</option>
          </select>  
          <button onClick={()=>{this.creat_user()}} style={{margin:'20px 0px'}}>添加</button>
        </div> 
        <div style={{display:'flex',flexWrap:'wrap',margin:'20px'}}>
        {
            allUserInformation && allUserInformation.length > 0?
            allUserInformation.map((v,i)=>(
            <ul key={i} style={{display:'flex',flexDirection:'column',margin:'20px'}}>
              <li>姓名：{v.name}</li> 
              <li>性别：{v.sex == 0 ? "女":"男"}</li>    
              <li> 
                <button onClick={()=>{this.updata_user(v.id)}}>编辑</button>
                <button onClick={()=>{this.delete_user(v.id)}}>删除</button>
              </li>       
            </ul>
            )):null   
          }
        </div>  
      </div>
    )
  }
}

// 类型检查：
IndexPage.propTypes = {
  // content:PropTypes.string.isRequired
} 


const mapStateToProps=({indexPage})=>{
  return {
    indexPage:indexPage
  }
}
export default connect(mapStateToProps)(IndexPage);
