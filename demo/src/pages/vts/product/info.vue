
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
      <el-dialog title="添加产品信息" width="40%" :visible.sync="dialogAddVisible">
        <el-form :model="addData" :rules="rules" ref="addForm">
          
          <el-form-item label="产品名称" prop="product_name">
            <el-input v-model="addData.product_name"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="原价" prop="original_price">
            <el-input v-model="addData.original_price"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="成本价" prop="cost_price">
            <el-input v-model="addData.cost_price"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="图片地址" prop="image_url">
            <el-input v-model="addData.image_url"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="使用说明" prop="description">
            <el-input v-model="addData.description"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="库存数量" prop="stock_count">
            <el-input v-model="addData.stock_count"  autocomplete="off"></el-input>
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
        
        <el-table-column prop="vts_prod_id" label="商品编号" ></el-table-column>
        
        <el-table-column prop="product_name" label="产品名称" ></el-table-column>
        
        <el-table-column prop="original_price" label="原价" ></el-table-column>
        
        <el-table-column prop="cost_price" label="成本价" ></el-table-column>
        
        <el-table-column prop="image_url" label="图片地址" ></el-table-column>
        
        <el-table-column prop="description" label="使用说明" ></el-table-column>
        
        <el-table-column prop="stock_count" label="库存数量" ></el-table-column>
        
        <el-table-column prop="status" label="状态" ></el-table-column>
        
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editShow(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- edit Form -->
      <el-dialog title="编辑产品信息" width="30%" @closed="closed" :visible.sync="dialogFormVisible">
        <el-form :model="editData">

          
          <el-form-item label="产品名称">
            <el-input v-model="editData.product_name"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="原价">
            <el-input v-model="editData.original_price"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="成本价">
            <el-input v-model="editData.cost_price"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="图片地址">
            <el-input v-model="editData.image_url"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="使用说明">
            <el-input v-model="editData.description"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="库存数量">
            <el-input v-model="editData.stock_count"  autocomplete="off"></el-input>
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
	name: "VtsProductInfo",
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
      product_name: [
        { required: true, message: "请输入产品名称", trigger: "blur" }
      ],
      original_price: [
        { required: true, message: "请输入原价", trigger: "blur" }
      ],
      cost_price: [
        { required: true, message: "请输入成本价", trigger: "blur" }
      ],
      image_url: [
        { required: true, message: "请输入图片地址", trigger: "blur" }
      ],
      description: [
        { required: true, message: "请输入使用说明", trigger: "blur" }
      ],
      stock_count: [
        { required: true, message: "请输入库存数量", trigger: "blur" }
      ],
      status: [
        { required: true, message: "请输入状态", trigger: "blur" }
      ],
      },
		tableData: [{                //表数据
      vts_prod_id: "vts_prod_id1",
      product_name: "product_name1",
      original_price: "original_price1",
      cost_price: "cost_price1",
      image_url: "image_url1",
      description: "description1",
      stock_count: "stock_count1",
      status: "status1",
      },{
      vts_prod_id: "vts_prod_id2",
      product_name: "product_name2",
      original_price: "original_price2",
      cost_price: "cost_price2",
      image_url: "image_url2",
      description: "description2",
      stock_count: "stock_count2",
      status: "status2",
      },{
      vts_prod_id: "vts_prod_id3",
      product_name: "product_name3",
      original_price: "original_price3",
      cost_price: "cost_price3",
      image_url: "image_url3",
      description: "description3",
      stock_count: "stock_count3",
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
