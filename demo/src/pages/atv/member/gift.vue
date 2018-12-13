
<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <el-form ref="form"  :inline="true" class="form-inline pull-left add-qx-bottom">
		    
        <div class="form-group">
          <el-input clearable  placeholder="请输入活动编号"></el-input>
        </div>
        
        <div class="form-group">
          <el-input clearable  placeholder="请输入商品编号"></el-input>
        </div>
        
        <div class="form-group">
          <el-input clearable  placeholder="请输入活动礼物编号"></el-input>
        </div>
        
        <div class="form-group">
          <el-button type="primary" size="small">查询</el-button>
        </div>
        <div class="form-group">
          <el-button type="success" size="small" @click="addShow">添加</el-button>
        </div>
      </el-form>

      <!-- Add Form -->
      <el-dialog title="添加参赛者礼物明细" width="40%" :visible.sync="dialogAddVisible">
        <el-form :model="addData" :rules="rules" ref="addForm">
          
          <el-form-item label="活动编号" prop="atv_id">
            <el-input v-model="addData.atv_id"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="商品编号" prop="atv_member_id">
            <el-input v-model="addData.atv_member_id"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="活动礼物编号" prop="atv_gift_id">
            <el-input v-model="addData.atv_gift_id"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="参赛编号" prop="uid">
            <el-input v-model="addData.uid"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="礼物数量" prop="gift_count">
            <el-input v-model="addData.gift_count"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="礼物票数" prop="gift_voted_count">
            <el-input v-model="addData.gift_voted_count"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="赠送人姓名" prop="giver_name">
            <el-input v-model="addData.giver_name"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="赠送人留言" prop="comment">
            <el-input v-model="addData.comment"  autocomplete="off"></el-input>
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
        
        <el-table-column prop="atv_mgift_id" label="礼物赠送编号" ></el-table-column>
        
        <el-table-column prop="atv_id" label="活动编号" ></el-table-column>
        
        <el-table-column prop="atv_member_id" label="商品编号" ></el-table-column>
        
        <el-table-column prop="atv_gift_id" label="活动礼物编号" ></el-table-column>
        
        <el-table-column prop="uid" label="参赛编号" ></el-table-column>
        
        <el-table-column prop="gift_count" label="礼物数量" ></el-table-column>
        
        <el-table-column prop="gift_voted_count" label="礼物票数" ></el-table-column>
        
        <el-table-column prop="giver_name" label="赠送人姓名" ></el-table-column>
        
        <el-table-column prop="comment" label="赠送人留言" ></el-table-column>
        
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editShow(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- edit Form -->
      <el-dialog title="编辑参赛者礼物明细" width="30%" @closed="closed" :visible.sync="dialogFormVisible">
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
	name: "AtvMemberGift",
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
        { required: true, message: "请输入商品编号", trigger: "blur" }
      ],
      atv_gift_id: [
        { required: true, message: "请输入活动礼物编号", trigger: "blur" }
      ],
      uid: [
        { required: true, message: "请输入参赛编号", trigger: "blur" }
      ],
      gift_count: [
        { required: true, message: "请输入礼物数量", trigger: "blur" }
      ],
      gift_voted_count: [
        { required: true, message: "请输入礼物票数", trigger: "blur" }
      ],
      giver_name: [
        { required: true, message: "请输入赠送人姓名", trigger: "blur" }
      ],
      comment: [
        { required: true, message: "请输入赠送人留言", trigger: "blur" }
      ],
      },
		tableData: [{                //表数据
      atv_mgift_id: "atv_mgift_id1",
      atv_id: "atv_id1",
      atv_member_id: "atv_member_id1",
      atv_gift_id: "atv_gift_id1",
      uid: "uid1",
      gift_count: "gift_count1",
      gift_voted_count: "gift_voted_count1",
      giver_name: "giver_name1",
      comment: "comment1",
      },{
      atv_mgift_id: "atv_mgift_id2",
      atv_id: "atv_id2",
      atv_member_id: "atv_member_id2",
      atv_gift_id: "atv_gift_id2",
      uid: "uid2",
      gift_count: "gift_count2",
      gift_voted_count: "gift_voted_count2",
      giver_name: "giver_name2",
      comment: "comment2",
      },{
      atv_mgift_id: "atv_mgift_id3",
      atv_id: "atv_id3",
      atv_member_id: "atv_member_id3",
      atv_gift_id: "atv_gift_id3",
      uid: "uid3",
      gift_count: "gift_count3",
      gift_voted_count: "gift_voted_count3",
      giver_name: "giver_name3",
      comment: "comment3",
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
