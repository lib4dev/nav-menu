
<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <el-form ref="form"  :inline="true" class="form-inline pull-left add-qx-bottom">
		    
        <div class="form-group">
          <el-input clearable  placeholder="请输入活动编号"></el-input>
        </div>
        
        <div class="form-group">
          <el-input clearable  placeholder="请输入投票时间"></el-input>
        </div>
        
        <div class="form-group">
          <el-button type="primary" size="small">查询</el-button>
        </div>
        <div class="form-group">
          <el-button type="success" size="small" @click="addShow">添加</el-button>
        </div>
      </el-form>

      <!-- Add Form -->
      <el-dialog title="添加参赛者投票明细" width="40%" :visible.sync="dialogAddVisible">
        <el-form :model="addData" :rules="rules" ref="addForm">
          
          <el-form-item label="活动编号" prop="atv_id">
            <el-input v-model="addData.atv_id"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="参赛编号" prop="atv_member_id">
            <el-input v-model="addData.atv_member_id"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="投票用户" prop="voting_uid">
            <el-input v-model="addData.voting_uid"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="投票 IP" prop="voting_ip">
            <el-input v-model="addData.voting_ip"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="投票数量" prop="voted_count">
            <el-input v-model="addData.voted_count"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="投票时间" prop="create_time">
            <el-input v-model="addData.create_time"  autocomplete="off"></el-input>
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
        
        <el-table-column prop="atv_voting_id" label="投票明细" ></el-table-column>
        
        <el-table-column prop="atv_id" label="活动编号" ></el-table-column>
        
        <el-table-column prop="atv_member_id" label="参赛编号" ></el-table-column>
        
        <el-table-column prop="voting_uid" label="投票用户" ></el-table-column>
        
        <el-table-column prop="voting_ip" label="投票 IP" ></el-table-column>
        
        <el-table-column prop="voted_count" label="投票数量" ></el-table-column>
        
        <el-table-column prop="create_time" label="投票时间" ></el-table-column>
        
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editShow(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- edit Form -->
      <el-dialog title="编辑参赛者投票明细" width="30%" @closed="closed" :visible.sync="dialogFormVisible">
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
	name: "AtvMemberVoting",
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
      atv_member_id: [
        { required: true, message: "请输入参赛编号", trigger: "blur" }
      ],
      voting_uid: [
        { required: true, message: "请输入投票用户", trigger: "blur" }
      ],
      voting_ip: [
        { required: true, message: "请输入投票 IP", trigger: "blur" }
      ],
      voted_count: [
        { required: true, message: "请输入投票数量", trigger: "blur" }
      ],
      create_time: [
        { required: true, message: "请输入投票时间", trigger: "blur" }
      ],
      },
		tableData: [{                //表数据
      atv_voting_id: "atv_voting_id1",
      atv_id: "atv_id1",
      atv_member_id: "atv_member_id1",
      voting_uid: "voting_uid1",
      voting_ip: "voting_ip1",
      voted_count: "voted_count1",
      create_time: "create_time1",
      },{
      atv_voting_id: "atv_voting_id2",
      atv_id: "atv_id2",
      atv_member_id: "atv_member_id2",
      voting_uid: "voting_uid2",
      voting_ip: "voting_ip2",
      voted_count: "voted_count2",
      create_time: "create_time2",
      },{
      atv_voting_id: "atv_voting_id3",
      atv_id: "atv_id3",
      atv_member_id: "atv_member_id3",
      voting_uid: "voting_uid3",
      voting_ip: "voting_ip3",
      voted_count: "voted_count3",
      create_time: "create_time3",
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
