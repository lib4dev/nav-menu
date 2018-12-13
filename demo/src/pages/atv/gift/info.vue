
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
          <el-input clearable  placeholder="请输入可抵票数"></el-input>
        </div>
        
        <div class="form-group">
          <el-button type="primary" size="small">查询</el-button>
        </div>
        <div class="form-group">
          <el-button type="success" size="small" @click="addShow">添加</el-button>
        </div>
      </el-form>

      <!-- Add Form -->
      <el-dialog title="添加活动礼物信息" width="40%" :visible.sync="dialogAddVisible">
        <el-form :model="addData" :rules="rules" ref="addForm">
          
          <el-form-item label="活动编号" prop="atv_id">
            <el-input v-model="addData.atv_id"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="商品编号" prop="vts_prod_id">
            <el-input v-model="addData.vts_prod_id"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="可抵票数" prop="ticket_count">
            <el-input v-model="addData.ticket_count"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="售价" prop="price">
            <el-input v-model="addData.price"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="显示名称" prop="show_name">
            <el-input v-model="addData.show_name"  autocomplete="off"></el-input>
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
        
        <el-table-column prop="atv_gift_id" label="礼物编号" ></el-table-column>
        
        <el-table-column prop="atv_id" label="活动编号" ></el-table-column>
        
        <el-table-column prop="vts_prod_id" label="商品编号" ></el-table-column>
        
        <el-table-column prop="price" label="售价" ></el-table-column>
        
        <el-table-column prop="show_name" label="显示名称" ></el-table-column>
        
        <el-table-column prop="status" label="状态" ></el-table-column>
        
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editShow(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- edit Form -->
      <el-dialog title="编辑活动礼物信息" width="30%" @closed="closed" :visible.sync="dialogFormVisible">
        <el-form :model="editData">

          
          <el-form-item label="可抵票数">
            <el-input v-model="editData.ticket_count"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="售价">
            <el-input v-model="editData.price"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="显示名称">
            <el-input v-model="editData.show_name"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="状态">
            <el-input v-model="editData.status"  autocomplete="off"></el-input>
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
	name: "AtvGiftInfo",
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
      vts_prod_id: [
        { required: true, message: "请输入商品编号", trigger: "blur" }
      ],
      ticket_count: [
        { required: true, message: "请输入可抵票数", trigger: "blur" }
      ],
      price: [
        { required: true, message: "请输入售价", trigger: "blur" }
      ],
      show_name: [
        { required: true, message: "请输入显示名称", trigger: "blur" }
      ],
      status: [
        { required: true, message: "请输入状态", trigger: "blur" }
      ],
      },
		tableData: [{                //表数据
      atv_gift_id: "atv_gift_id1",
      atv_id: "atv_id1",
      vts_prod_id: "vts_prod_id1",
      price: "price1",
      show_name: "show_name1",
      status: "status1",
      },{
      atv_gift_id: "atv_gift_id2",
      atv_id: "atv_id2",
      vts_prod_id: "vts_prod_id2",
      price: "price2",
      show_name: "show_name2",
      status: "status2",
      },{
      atv_gift_id: "atv_gift_id3",
      atv_id: "atv_id3",
      vts_prod_id: "vts_prod_id3",
      price: "price3",
      show_name: "show_name3",
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
