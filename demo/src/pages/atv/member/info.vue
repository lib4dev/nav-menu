
<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <el-form ref="form"  :inline="true" class="form-inline pull-left add-qx-bottom">
		    
        <div class="form-group">
          <el-input clearable  placeholder="请输入活动编号"></el-input>
        </div>
        
        <div class="form-group">
          <el-button type="primary" size="small">查询</el-button>
        </div>
        <div class="form-group">
          <el-button type="success" size="small" @click="addShow">添加</el-button>
        </div>
      </el-form>

      <!-- Add Form -->
      <el-dialog title="添加活动参赛者信息" width="40%" :visible.sync="dialogAddVisible">
        <el-form :model="addData" :rules="rules" ref="addForm">
          
          <el-form-item label="活动编号" prop="atv_id">
            <el-input v-model="addData.atv_id"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="用户编号" prop="uid">
            <el-input v-model="addData.uid"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="参赛序号" prop="member_no">
            <el-input v-model="addData.member_no"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="用户姓名" prop="member_name">
            <el-input v-model="addData.member_name"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="头像" prop="head_img">
            <el-input v-model="addData.head_img"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="addData.mobile"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="投票总数" prop="voted_count">
            <el-input v-model="addData.voted_count"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="投票人数" prop="involved_count">
            <el-input v-model="addData.involved_count"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="礼物总数" prop="gift_count">
            <el-input v-model="addData.gift_count"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="礼物票数" prop="gift_voted_count">
            <el-input v-model="addData.gift_voted_count"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="访问总数" prop="visit_count">
            <el-input v-model="addData.visit_count"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="简介" prop="intro">
            <el-input v-model="addData.intro"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="状态" prop="status">
            <el-input v-model="addData.status"  autocomplete="off"></el-input>
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
        
        <el-table-column prop="atv_member_id" label="参赛编号" ></el-table-column>
        
        <el-table-column prop="atv_id" label="活动编号" ></el-table-column>
        
        <el-table-column prop="uid" label="用户编号" ></el-table-column>
        
        <el-table-column prop="member_no" label="参赛序号" ></el-table-column>
        
        <el-table-column prop="member_name" label="用户姓名" ></el-table-column>
        
        <el-table-column prop="head_img" label="头像" ></el-table-column>
        
        <el-table-column prop="mobile" label="手机号" ></el-table-column>
        
        <el-table-column prop="voted_count" label="投票总数" ></el-table-column>
        
        <el-table-column prop="involved_count" label="投票人数" ></el-table-column>
        
        <el-table-column prop="gift_count" label="礼物总数" ></el-table-column>
        
        <el-table-column prop="gift_voted_count" label="礼物票数" ></el-table-column>
        
        <el-table-column prop="visit_count" label="访问总数" ></el-table-column>
        
        <el-table-column prop="intro" label="简介" ></el-table-column>
        
        <el-table-column prop="status" label="状态" ></el-table-column>
        
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editShow(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- edit Form -->
      <el-dialog title="编辑活动参赛者信息" width="30%" @closed="closed" :visible.sync="dialogFormVisible">
        <el-form :model="editData">

          

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
	name: "AtvMemberInfo",
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
      atv_id: [
        { required: true, message: "请输入活动编号", trigger: "blur" }
      ],
      uid: [
        { required: true, message: "请输入用户编号", trigger: "blur" }
      ],
      member_no: [
        { required: true, message: "请输入参赛序号", trigger: "blur" }
      ],
      member_name: [
        { required: true, message: "请输入用户姓名", trigger: "blur" }
      ],
      head_img: [
        { required: true, message: "请输入头像", trigger: "blur" }
      ],
      mobile: [
        { required: true, message: "请输入手机号", trigger: "blur" }
      ],
      voted_count: [
        { required: true, message: "请输入投票总数", trigger: "blur" }
      ],
      involved_count: [
        { required: true, message: "请输入投票人数", trigger: "blur" }
      ],
      gift_count: [
        { required: true, message: "请输入礼物总数", trigger: "blur" }
      ],
      gift_voted_count: [
        { required: true, message: "请输入礼物票数", trigger: "blur" }
      ],
      visit_count: [
        { required: true, message: "请输入访问总数", trigger: "blur" }
      ],
      intro: [
        { required: true, message: "请输入简介", trigger: "blur" }
      ],
      status: [
        { required: true, message: "请输入状态", trigger: "blur" }
      ],
      },
		tableData: [{                //表数据
      atv_member_id: "atv_member_id1",
      atv_id: "atv_id1",
      uid: "uid1",
      member_no: "member_no1",
      member_name: "member_name1",
      head_img: "head_img1",
      mobile: "mobile1",
      voted_count: "voted_count1",
      involved_count: "involved_count1",
      gift_count: "gift_count1",
      gift_voted_count: "gift_voted_count1",
      visit_count: "visit_count1",
      intro: "intro1",
      status: "status1",
      },{
      atv_member_id: "atv_member_id2",
      atv_id: "atv_id2",
      uid: "uid2",
      member_no: "member_no2",
      member_name: "member_name2",
      head_img: "head_img2",
      mobile: "mobile2",
      voted_count: "voted_count2",
      involved_count: "involved_count2",
      gift_count: "gift_count2",
      gift_voted_count: "gift_voted_count2",
      visit_count: "visit_count2",
      intro: "intro2",
      status: "status2",
      },{
      atv_member_id: "atv_member_id3",
      atv_id: "atv_id3",
      uid: "uid3",
      member_no: "member_no3",
      member_name: "member_name3",
      head_img: "head_img3",
      mobile: "mobile3",
      voted_count: "voted_count3",
      involved_count: "involved_count3",
      gift_count: "gift_count3",
      gift_voted_count: "gift_voted_count3",
      visit_count: "visit_count3",
      intro: "intro3",
      status: "status3",
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
