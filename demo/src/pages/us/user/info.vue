
<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <el-form ref="form"  :inline="true" class="form-inline pull-left add-qx-bottom">
		    
        <div class="form-group">
          <el-input clearable  placeholder="请输入appid"></el-input>
        </div>
        
        <div class="form-group">
          <el-input clearable  placeholder="请输入openid"></el-input>
        </div>
        
        <div class="form-group">
          <el-input clearable  placeholder="请输入昵称"></el-input>
        </div>
        
        <div class="form-group">
          <el-button type="primary" size="small">查询</el-button>
        </div>
        <div class="form-group">
          <el-button type="success" size="small" @click="addShow">添加</el-button>
        </div>
      </el-form>

      <!-- Add Form -->
      <el-dialog title="添加用户基本信息" width="40%" :visible.sync="dialogAddVisible">
        <el-form :model="addData" :rules="rules" ref="addForm">
          
          <el-form-item label="appid" prop="appid">
            <el-input v-model="addData.appid"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="openid" prop="openid">
            <el-input v-model="addData.openid"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="昵称" prop="nick_name">
            <el-input v-model="addData.nick_name"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="头像地址" prop="head_url">
            <el-input v-model="addData.head_url"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="addData.phone"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="邮箱地址" prop="e_mail">
            <el-input v-model="addData.e_mail"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="状态（0：启用 1.禁用 2.锁定）" prop="status">
            <el-input v-model="addData.status"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="创建时间" prop="create_time">
            <el-input v-model="addData.create_time"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="更新时间" prop="update_time">
            <el-input v-model="addData.update_time"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="是否是粉丝（0：是 1：否）" prop="is_fans">
            <el-input v-model="addData.is_fans"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="用户来源（0.微信关注 1. 二维码）" prop="source">
            <el-input v-model="addData.source"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="推荐人" prop="referee">
            <el-input v-model="addData.referee"  autocomplete="off"></el-input>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="resetForm(`addForm`)">取 消</el-button>
          <el-button size="small" type="success" @click="add(`addForm`)">确 定</el-button>
        </div>
      </el-dialog>
      <!--Add Form -->
    </div>
    <el-scrollbar style="height:100%">
      <el-table :data="tableData" border style="width: 100%">
        
        <el-table-column prop="uid" label="主键" ></el-table-column>
        
        <el-table-column prop="appid" label="appid" ></el-table-column>
        
        <el-table-column prop="openid" label="openid" ></el-table-column>
        
        <el-table-column prop="nick_name" label="昵称" ></el-table-column>
        
        <el-table-column prop="head_url" label="头像地址" ></el-table-column>
        
        <el-table-column prop="phone" label="联系电话" ></el-table-column>
        
        <el-table-column prop="e_mail" label="邮箱地址" ></el-table-column>
        
        <el-table-column prop="status" label="状态（0：启用 1.禁用 2.锁定）" ></el-table-column>
        
        <el-table-column prop="create_time" label="创建时间" ></el-table-column>
        
        <el-table-column prop="update_time" label="更新时间" ></el-table-column>
        
        <el-table-column prop="is_fans" label="是否是粉丝（0：是 1：否）" ></el-table-column>
        
        <el-table-column prop="source" label="用户来源（0.微信关注 1. 二维码）" ></el-table-column>
        
        <el-table-column prop="referee" label="推荐人" ></el-table-column>
        
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editShow(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- edit Form -->
      <el-dialog title="编辑用户基本信息" width="30%" @closed="closed" :visible.sync="dialogFormVisible">
        <el-form :model="editData">

          
          <el-form-item label="appid">
            <el-input v-model="editData.appid"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="openid">
            <el-input v-model="editData.openid"  autocomplete="off"></el-input>
          </el-form-item>
          

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="success" size="small" @click="edit">确 定</el-button>
        </div>
      </el-dialog>
    </el-scrollbar>
    <div class="page-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pi"
        :page-size="params.ps"
        :page-sizes="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalcount">
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
	name: "UsUserInfo",
	data () {
		return {
    dialogAddVisible:false,     //添加表单显示隐藏
    dialogFormVisible:false,    //编辑表单显示隐藏
		pageSizes: [10, 20, 50, 100], 
		params:{pi:1,ps:10},        //页码，页容量控制
    totalcount: 0,              //数据总条数
    editData:{},                //编辑数据对象
    addData:{},                 //添加数据对象 
    rules: {                    //数据验证规则
      appid: [
        { required: true, message: "请输入appid", trigger: "blur" }
      ],
      openid: [
        { required: true, message: "请输入openid", trigger: "blur" }
      ],
      nick_name: [
        { required: true, message: "请输入昵称", trigger: "blur" }
      ],
      head_url: [
        { required: true, message: "请输入头像地址", trigger: "blur" }
      ],
      phone: [
        { required: true, message: "请输入联系电话", trigger: "blur" }
      ],
      e_mail: [
        { required: true, message: "请输入邮箱地址", trigger: "blur" }
      ],
      status: [
        { required: true, message: "请输入状态（0：启用 1.禁用 2.锁定）", trigger: "blur" }
      ],
      create_time: [
        { required: true, message: "请输入创建时间", trigger: "blur" }
      ],
      update_time: [
        { required: true, message: "请输入更新时间", trigger: "blur" }
      ],
      is_fans: [
        { required: true, message: "请输入是否是粉丝（0：是 1：否）", trigger: "blur" }
      ],
      source: [
        { required: true, message: "请输入用户来源（0.微信关注 1. 二维码）", trigger: "blur" }
      ],
      referee: [
        { required: true, message: "请输入推荐人", trigger: "blur" }
      ],
      },
		tableData: [{                //表数据
      uid: "uid1",
      appid: "appid1",
      openid: "openid1",
      nick_name: "nick_name1",
      head_url: "head_url1",
      phone: "phone1",
      e_mail: "e_mail1",
      status: "status1",
      create_time: "create_time1",
      update_time: "update_time1",
      is_fans: "is_fans1",
      source: "source1",
      referee: "referee1",
      },{
      uid: "uid2",
      appid: "appid2",
      openid: "openid2",
      nick_name: "nick_name2",
      head_url: "head_url2",
      phone: "phone2",
      e_mail: "e_mail2",
      status: "status2",
      create_time: "create_time2",
      update_time: "update_time2",
      is_fans: "is_fans2",
      source: "source2",
      referee: "referee2",
      },{
      uid: "uid3",
      appid: "appid3",
      openid: "openid3",
      nick_name: "nick_name3",
      head_url: "head_url3",
      phone: "phone3",
      e_mail: "e_mail3",
      status: "status3",
      create_time: "create_time3",
      update_time: "update_time3",
      is_fans: "is_fans3",
      source: "source3",
      referee: "referee3",
      }]
		}
  },
  mounted(){
    this.init()
  },
	methods:{
    /*
    *初始化操作
    */
    init(){
      
    },
    /*
    *查询数据并赋值
    */
    query(){

    },
    /*
    *改变页容量
    */
		handleSizeChange(val) {
		  this.params.ps = val
    },
    /*
    *改变当前页码
    */
    handleCurrentChange(val) {
      this.params.pi = val
    },
    /*
    *重置添加表单
    */
    resetForm(formName) {
      this.dialogAddVisible = false
      this.$refs[formName].resetFields();
    },
    /*
    *编辑表单关闭事件
    */
    closed(){
      console.log("colsed")
    },
    /*
    *添加表单显示
    */
    addShow(){
      this.addData = {}
      this.dialogAddVisible = true;
    },
    /*
    *添加数据提交操作
    */
    add(formName){
      console.log(this.addData)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert(`submit!`);
          this.dialogAddVisible = false;
        } else {
          console.log(`error submit!!`);
          return false;
        }
      });
      
    },
    /**
    *编辑表单显示
    *@val 当前行的数据对象
    */
    editShow(val){
      console.log(val);
      this.editData = val
      this.dialogFormVisible = true;
    },
    /*
    *编辑数据提交
    */
    edit(){
      console.log(this.editData);
      this.dialogFormVisible = false;
    },
    /**
    *删除数据
    *@val 要删除的数据对象
    */
    del(val){
      console.log(val)
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log(val);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });          
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .page-pagination{padding: 10px 15px;text-align: right;}
</style>
