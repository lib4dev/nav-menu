
<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <el-form ref="form"  :inline="true" class="form-inline pull-left add-qx-bottom">
		    
        <div class="form-group">
          <el-button type="primary" size="small">查询</el-button>
        </div>
        <div class="form-group">
          <el-button type="success" size="small" @click="addShow">添加</el-button>
        </div>
      </el-form>

      <!-- Add Form -->
      <el-dialog title="添加公众号信息" width="40%" :visible.sync="dialogAddVisible">
        <el-form :model="addData" :rules="rules" ref="addForm">
          
          <el-form-item label="appid" prop="appid">
            <el-input v-model="addData.appid"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="secret" prop="secret">
            <el-input v-model="addData.secret"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="token" prop="token">
            <el-input v-model="addData.token"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="aes key" prop="aes_key">
            <el-input v-model="addData.aes_key"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="最后更新时间" prop="update_time">
            <el-input v-model="addData.update_time"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="支付服务商编号" prop="mchid">
            <el-input v-model="addData.mchid"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="支付服务商 key" prop="pay_key">
            <el-input v-model="addData.pay_key"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="子商户 app id" prop="sub_appid">
            <el-input v-model="addData.sub_appid"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="子商户编户号" prop="sub_mchid">
            <el-input v-model="addData.sub_mchid"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="微信授权域名" prop="wechat_host">
            <el-input v-model="addData.wechat_host"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="微信验证码模板消息编号" prop="wcode_template_id">
            <el-input v-model="addData.wcode_template_id"  autocomplete="off"></el-input>
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
        
        <el-table-column prop="appid" label="appid" ></el-table-column>
        
        <el-table-column prop="secret" label="secret" ></el-table-column>
        
        <el-table-column prop="token" label="token" ></el-table-column>
        
        <el-table-column prop="aes_key" label="aes key" ></el-table-column>
        
        <el-table-column prop="update_time" label="最后更新时间" ></el-table-column>
        
        <el-table-column prop="mchid" label="支付服务商编号" ></el-table-column>
        
        <el-table-column prop="pay_key" label="支付服务商 key" ></el-table-column>
        
        <el-table-column prop="sub_appid" label="子商户 app id" ></el-table-column>
        
        <el-table-column prop="sub_mchid" label="子商户编户号" ></el-table-column>
        
        <el-table-column prop="wechat_host" label="微信授权域名" ></el-table-column>
        
        <el-table-column prop="wcode_template_id" label="微信验证码模板消息编号" ></el-table-column>
        
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editShow(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- edit Form -->
      <el-dialog title="编辑公众号信息" width="30%" @closed="closed" :visible.sync="dialogFormVisible">
        <el-form :model="editData">

          
          <el-form-item label="secret">
            <el-input v-model="editData.secret"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="token">
            <el-input v-model="editData.token"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="aes key">
            <el-input v-model="editData.aes_key"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="支付服务商编号">
            <el-input v-model="editData.mchid"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="支付服务商 key">
            <el-input v-model="editData.pay_key"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="子商户 app id">
            <el-input v-model="editData.sub_appid"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="子商户编户号">
            <el-input v-model="editData.sub_mchid"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="微信授权域名">
            <el-input v-model="editData.wechat_host"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="微信验证码模板消息编号">
            <el-input v-model="editData.wcode_template_id"  autocomplete="off"></el-input>
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
	name: "WechatAppInfo",
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
      secret: [
        { required: true, message: "请输入secret", trigger: "blur" }
      ],
      token: [
        { required: true, message: "请输入token", trigger: "blur" }
      ],
      aes_key: [
        { required: true, message: "请输入aes key", trigger: "blur" }
      ],
      update_time: [
        { required: true, message: "请输入最后更新时间", trigger: "blur" }
      ],
      mchid: [
        { required: true, message: "请输入支付服务商编号", trigger: "blur" }
      ],
      pay_key: [
        { required: true, message: "请输入支付服务商 key", trigger: "blur" }
      ],
      sub_appid: [
        { required: true, message: "请输入子商户 app id", trigger: "blur" }
      ],
      sub_mchid: [
        { required: true, message: "请输入子商户编户号", trigger: "blur" }
      ],
      wechat_host: [
        { required: true, message: "请输入微信授权域名", trigger: "blur" }
      ],
      wcode_template_id: [
        { required: true, message: "请输入微信验证码模板消息编号", trigger: "blur" }
      ],
      },
		tableData: [{                //表数据
      appid: "appid1",
      secret: "secret1",
      token: "token1",
      aes_key: "aes_key1",
      update_time: "update_time1",
      mchid: "mchid1",
      pay_key: "pay_key1",
      sub_appid: "sub_appid1",
      sub_mchid: "sub_mchid1",
      wechat_host: "wechat_host1",
      wcode_template_id: "wcode_template_id1",
      },{
      appid: "appid2",
      secret: "secret2",
      token: "token2",
      aes_key: "aes_key2",
      update_time: "update_time2",
      mchid: "mchid2",
      pay_key: "pay_key2",
      sub_appid: "sub_appid2",
      sub_mchid: "sub_mchid2",
      wechat_host: "wechat_host2",
      wcode_template_id: "wcode_template_id2",
      },{
      appid: "appid3",
      secret: "secret3",
      token: "token3",
      aes_key: "aes_key3",
      update_time: "update_time3",
      mchid: "mchid3",
      pay_key: "pay_key3",
      sub_appid: "sub_appid3",
      sub_mchid: "sub_mchid3",
      wechat_host: "wechat_host3",
      wcode_template_id: "wcode_template_id3",
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
