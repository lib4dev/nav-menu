
<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <el-form ref="form"  :inline="true" class="form-inline pull-left add-qx-bottom">
		    
        <div class="form-group">
          <el-input clearable  placeholder="请输入appid"></el-input>
        </div>
        
        <div class="form-group">
          <el-input clearable  placeholder="请输入活动编号"></el-input>
        </div>
        
        <div class="form-group">
          <el-input clearable  placeholder="请输入商品编号"></el-input>
        </div>
        
        <div class="form-group">
          <el-button type="primary" size="small">查询</el-button>
        </div>
        <div class="form-group">
          <el-button type="success" size="small" @click="addShow">添加</el-button>
        </div>
      </el-form>

      <!-- Add Form -->
      <el-dialog title="添加交易订单" width="40%" :visible.sync="dialogAddVisible">
        <el-form :model="addData" :rules="rules" ref="addForm">
          
          <el-form-item label="appid" prop="appid">
            <el-input v-model="addData.appid"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="活动编号" prop="atv_id">
            <el-input v-model="addData.atv_id"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="参赛者编号" prop="atv_member_id">
            <el-input v-model="addData.atv_member_id"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="礼物编号" prop="atv_gift_id">
            <el-input v-model="addData.atv_gift_id"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="商品编号" prop="vts_prod_id">
            <el-input v-model="addData.vts_prod_id"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="用户编号" prop="buyer_uid">
            <el-input v-model="addData.buyer_uid"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="数量" prop="num">
            <el-input v-model="addData.num"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="支付金额" prop="amount">
            <el-input v-model="addData.amount"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="成本金额" prop="cost">
            <el-input v-model="addData.cost"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="总利润" prop="profit">
            <el-input v-model="addData.profit"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="订单状态（10.待支付 20.已支付 90.交易关闭　 91.用户取消 0 成功）" prop="status">
            <el-input v-model="addData.status"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="微信请求结果" prop="wx_request_msg">
            <el-input v-model="addData.wx_request_msg"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="微信通知结果" prop="wx_notify_msg">
            <el-input v-model="addData.wx_notify_msg"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="创建时间" prop="create_time">
            <el-input v-model="addData.create_time"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="支付开始时间" prop="payment_start_time">
            <el-input v-model="addData.payment_start_time"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="支付完成时间" prop="payment_finish_time">
            <el-input v-model="addData.payment_finish_time"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="订单完成时间" prop="order_finish_time">
            <el-input v-model="addData.order_finish_time"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="购买人姓名" prop="buyer_name">
            <el-input v-model="addData.buyer_name"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="购买人留言" prop="buyer_comment">
            <el-input v-model="addData.buyer_comment"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="交易快照" prop="snapshot">
            <el-input v-model="addData.snapshot"  autocomplete="off"></el-input>
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
        
        <el-table-column prop="order_no" label="主订单号" ></el-table-column>
        
        <el-table-column prop="appid" label="appid" ></el-table-column>
        
        <el-table-column prop="atv_id" label="活动编号" ></el-table-column>
        
        <el-table-column prop="atv_member_id" label="参赛者编号" ></el-table-column>
        
        <el-table-column prop="atv_gift_id" label="礼物编号" ></el-table-column>
        
        <el-table-column prop="vts_prod_id" label="商品编号" ></el-table-column>
        
        <el-table-column prop="buyer_uid" label="用户编号" ></el-table-column>
        
        <el-table-column prop="num" label="数量" ></el-table-column>
        
        <el-table-column prop="amount" label="支付金额" ></el-table-column>
        
        <el-table-column prop="cost" label="成本金额" ></el-table-column>
        
        <el-table-column prop="profit" label="总利润" ></el-table-column>
        
        <el-table-column prop="status" label="订单状态（10.待支付 20.已支付 90.交易关闭　 91.用户取消 0 成功）" ></el-table-column>
        
        <el-table-column prop="create_time" label="创建时间" ></el-table-column>
        
        <el-table-column prop="payment_finish_time" label="支付完成时间" ></el-table-column>
        
        <el-table-column prop="order_finish_time" label="订单完成时间" ></el-table-column>
        
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editShow(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- edit Form -->
      <el-dialog title="编辑交易订单" width="30%" @closed="closed" :visible.sync="dialogFormVisible">
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
	name: "TrdOrderMain",
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
      atv_id: [
        { required: true, message: "请输入活动编号", trigger: "blur" }
      ],
      atv_member_id: [
        { required: true, message: "请输入参赛者编号", trigger: "blur" }
      ],
      atv_gift_id: [
        { required: true, message: "请输入礼物编号", trigger: "blur" }
      ],
      vts_prod_id: [
        { required: true, message: "请输入商品编号", trigger: "blur" }
      ],
      buyer_uid: [
        { required: true, message: "请输入用户编号", trigger: "blur" }
      ],
      num: [
        { required: true, message: "请输入数量", trigger: "blur" }
      ],
      amount: [
        { required: true, message: "请输入支付金额", trigger: "blur" }
      ],
      cost: [
        { required: true, message: "请输入成本金额", trigger: "blur" }
      ],
      profit: [
        { required: true, message: "请输入总利润", trigger: "blur" }
      ],
      status: [
        { required: true, message: "请输入订单状态（10.待支付 20.已支付 90.交易关闭　 91.用户取消 0 成功）", trigger: "blur" }
      ],
      wx_request_msg: [
        { required: true, message: "请输入微信请求结果", trigger: "blur" }
      ],
      wx_notify_msg: [
        { required: true, message: "请输入微信通知结果", trigger: "blur" }
      ],
      create_time: [
        { required: true, message: "请输入创建时间", trigger: "blur" }
      ],
      payment_start_time: [
        { required: true, message: "请输入支付开始时间", trigger: "blur" }
      ],
      payment_finish_time: [
        { required: true, message: "请输入支付完成时间", trigger: "blur" }
      ],
      order_finish_time: [
        { required: true, message: "请输入订单完成时间", trigger: "blur" }
      ],
      buyer_name: [
        { required: true, message: "请输入购买人姓名", trigger: "blur" }
      ],
      buyer_comment: [
        { required: true, message: "请输入购买人留言", trigger: "blur" }
      ],
      snapshot: [
        { required: true, message: "请输入交易快照", trigger: "blur" }
      ],
      },
		tableData: [{                //表数据
      order_no: "order_no1",
      appid: "appid1",
      atv_id: "atv_id1",
      atv_member_id: "atv_member_id1",
      atv_gift_id: "atv_gift_id1",
      vts_prod_id: "vts_prod_id1",
      buyer_uid: "buyer_uid1",
      num: "num1",
      amount: "amount1",
      cost: "cost1",
      profit: "profit1",
      status: "status1",
      create_time: "create_time1",
      payment_finish_time: "payment_finish_time1",
      order_finish_time: "order_finish_time1",
      },{
      order_no: "order_no2",
      appid: "appid2",
      atv_id: "atv_id2",
      atv_member_id: "atv_member_id2",
      atv_gift_id: "atv_gift_id2",
      vts_prod_id: "vts_prod_id2",
      buyer_uid: "buyer_uid2",
      num: "num2",
      amount: "amount2",
      cost: "cost2",
      profit: "profit2",
      status: "status2",
      create_time: "create_time2",
      payment_finish_time: "payment_finish_time2",
      order_finish_time: "order_finish_time2",
      },{
      order_no: "order_no3",
      appid: "appid3",
      atv_id: "atv_id3",
      atv_member_id: "atv_member_id3",
      atv_gift_id: "atv_gift_id3",
      vts_prod_id: "vts_prod_id3",
      buyer_uid: "buyer_uid3",
      num: "num3",
      amount: "amount3",
      cost: "cost3",
      profit: "profit3",
      status: "status3",
      create_time: "create_time3",
      payment_finish_time: "payment_finish_time3",
      order_finish_time: "order_finish_time3",
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
