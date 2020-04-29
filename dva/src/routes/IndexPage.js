import React from "react";
import { connect } from "dva";
import PropTypes from "prop-types";

import {
  allUserData,
  creatUser,
  findUser,
  updataUser,
  deleteUser,
  uploadFile,
} from "./../services/api";

class IndexPage extends React.Component {
  state = {
    allUserInformation: null,
    name: "",
    password: "",
    sex: 0,
    form_Data: null,
  };
  componentDidMount() {
    this.getAllUser();
  }
  getAllUser = async () => {
    let allUserInformation = await allUserData();
    this.setState({ allUserInformation });
  };
  delete_user = async (i) => {
    let allUserInformation = await deleteUser({ params: { id: `${i}` } });
    await this.getAllUser();
  };
  creat_user = async () => {
    const { name, password, sex } = this.state;
    await creatUser({ params: { name, password, sex: sex - 0 } });
    await this.getAllUser();
  };
  updata_user = async (i) => {
    const { name, password, sex } = this.state;
    await updataUser({ params: { id: i, name, password, sex: sex - 0 } });
    await this.getAllUser();
  };
  submit = async () => {
    let { form_Data } = this.state;
    let formdata = new FormData();
    for (let i in form_Data) {
      formdata.append(`file`, form_Data[i]);
    }
    let re = await uploadFile({ params: formdata });
    console.log("=>", re);
  };
  render() {
    const { allUserInformation, name, password } = this.state;
    return (
      <div>
        <h3 style={{ display: "flex", textAlign: "center", margin: "20px" }}>
          我是首页
        </h3>
        <input
          type="file"
          // name="profile_pic"
          multiple="multiplt"
          onChange={(e) => {
            console.log(e.target.files);
            this.setState({ form_Data: e.target.files });
          }}
        />
        <button
          type="submit"
          onClick={() => {
            this.submit();
          }}
        >
          Submit
        </button>
        {/* <div style={{display:'flex',flexDirection:'column',margin:'20px'}}>
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
        </div>   */}
      </div>
    );
  }
}

// 类型检查：
IndexPage.propTypes = {
  // content:PropTypes.string.isRequired
};

const mapStateToProps = ({ indexPage }) => {
  return {
    indexPage: indexPage,
  };
};
export default connect(mapStateToProps)(IndexPage);
