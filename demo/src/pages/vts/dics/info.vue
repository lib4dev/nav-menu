
<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <el-form ref="form"  :inline="true" class="form-inline pull-left add-qx-bottom">
		    
        <div class="form-group">
          <el-input clearable  placeholder="请输入值"></el-input>
        </div>
        
        <div class="form-group">
          <el-input clearable  placeholder="请输入分类"></el-input>
        </div>
        
        <div class="form-group">
          <el-button type="primary" size="small">查询</el-button>
        </div>
        <div class="form-group">
          <el-button type="success" size="small" @click="addShow">添加</el-button>
        </div>
      </el-form>

      <!-- Add Form -->
      <el-dialog title="添加数据字典表" width="40%" :visible.sync="dialogAddVisible">
        <el-form :model="addData" :rules="rules" ref="addForm">
          
          <el-form-item label="名称" prop="name">
            <el-input v-model="addData.name"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="值" prop="value">
            <el-input v-model="addData.value"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="分类" prop="type">
            <el-input v-model="addData.type"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="排序编号" prop="sort_id">
            <el-input v-model="addData.sort_id"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="分组编号" prop="group_code">
            <el-input v-model="addData.group_code"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="状态 0 启用 1 禁用" prop="status">
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
        
        <el-table-column prop="id" label="编号" ></el-table-column>
        
        <el-table-column prop="name" label="名称" ></el-table-column>
        
        <el-table-column prop="value" label="值" ></el-table-column>
        
        <el-table-column prop="type" label="分类" ></el-table-column>
        
        <el-table-column prop="sort_id" label="排序编号" ></el-table-column>
        
        <el-table-column prop="group_code" label="分组编号" ></el-table-column>
        
        <el-table-column prop="status" label="状态 0 启用 1 禁用" ></el-table-column>
        
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editShow(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- edit Form -->
      <el-dialog title="编辑数据字典表" width="30%" @closed="closed" :visible.sync="dialogFormVisible">
        <el-form :model="editData">

          
          <el-form-item label="名称">
            <el-input v-model="editData.name"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="值">
            <el-input v-model="editData.value"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="分类">
            <el-input v-model="editData.type"  autocomplete="off"></el-input>
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
	name: "VtsDicsInfo",
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
      name: [
        { required: true, message: "请输入名称", trigger: "blur" }
      ],
      value: [
        { required: true, message: "请输入值", trigger: "blur" }
      ],
      type: [
        { required: true, message: "请输入分类", trigger: "blur" }
      ],
      sort_id: [
        { required: true, message: "请输入排序编号", trigger: "blur" }
      ],
      group_code: [
        { required: true, message: "请输入分组编号", trigger: "blur" }
      ],
      status: [
        { required: true, message: "请输入状态 0 启用 1 禁用", trigger: "blur" }
      ],
      },
		tableData: [{                //表数据
      id: "id1",
      name: "name1",
      value: "value1",
      type: "type1",
      sort_id: "sort_id1",
      group_code: "group_code1",
      status: "status1",
      },{
      id: "id2",
      name: "name2",
      value: "value2",
      type: "type2",
      sort_id: "sort_id2",
      group_code: "group_code2",
      status: "status2",
      },{
      id: "id3",
      name: "name3",
      value: "value3",
      type: "type3",
      sort_id: "sort_id3",
      group_code: "group_code3",
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
