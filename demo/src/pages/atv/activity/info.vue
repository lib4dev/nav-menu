
<template>
  <div class="panel panel-default">
    <div class="panel-body">
      <el-form ref="form"  :inline="true" class="form-inline pull-left add-qx-bottom">
		    
        <div class="form-group">
          <el-input clearable  placeholder="请输入活动标题"></el-input>
        </div>
        
        <div class="form-group">
          <el-input clearable  placeholder="请输入创建时间"></el-input>
        </div>
        
        <div class="form-group">
          <el-button type="primary" size="small">查询</el-button>
        </div>
        <div class="form-group">
          <el-button type="success" size="small" @click="addShow">添加</el-button>
        </div>
      </el-form>

      <!-- Add Form -->
      <el-dialog title="添加活动表" width="40%" :visible.sync="dialogAddVisible">
        <el-form :model="addData" :rules="rules" ref="addForm">
          
          <el-form-item label="appid" prop="appid">
            <el-input v-model="addData.appid"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="活动标题" prop="title">
            <el-input v-model="addData.title"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="活动标识" prop="tag">
            <el-input v-model="addData.tag"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="活动链接" prop="url">
            <el-input v-model="addData.url"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="开始时间" prop="expire_start">
            <el-input v-model="addData.expire_start"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="结束时间" prop="expire_end">
            <el-input v-model="addData.expire_end"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="参赛人数" prop="member_count">
            <el-input v-model="addData.member_count"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="投票总数" prop="voted_count">
            <el-input v-model="addData.voted_count"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="投票人数" prop="involved_count">
            <el-input v-model="addData.involved_count"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="访问总数" prop="visit_count">
            <el-input v-model="addData.visit_count"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="礼物总数" prop="gift_count">
            <el-input v-model="addData.gift_count"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="创建时间" prop="create_time">
            <el-input v-model="addData.create_time"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="更新时间" prop="update_time">
            <el-input v-model="addData.update_time"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="投票规则" prop="voting_rule">
            <el-input v-model="addData.voting_rule"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="操作人" prop="operator">
            <el-input v-model="addData.operator"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="状态（1：禁用 0：启用）" prop="status">
            <el-input v-model="addData.status"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="背景音乐" prop="music">
            <el-input v-model="addData.music"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="活动规则" prop="rule">
            <el-input v-model="addData.rule"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="活动介绍" prop="intro">
            <el-input v-model="addData.intro"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="奖品明细" prop="prize">
            <el-input v-model="addData.prize"  autocomplete="off"></el-input>
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
        
        <el-table-column prop="atv_id" label="活动编号" ></el-table-column>
        
        <el-table-column prop="appid" label="appid" ></el-table-column>
        
        <el-table-column prop="title" label="活动标题" ></el-table-column>
        
        <el-table-column prop="tag" label="活动标识" ></el-table-column>
        
        <el-table-column prop="url" label="活动链接" ></el-table-column>
        
        <el-table-column prop="expire_start" label="开始时间" ></el-table-column>
        
        <el-table-column prop="expire_end" label="结束时间" ></el-table-column>
        
        <el-table-column prop="member_count" label="参赛人数" ></el-table-column>
        
        <el-table-column prop="voted_count" label="投票总数" ></el-table-column>
        
        <el-table-column prop="involved_count" label="投票人数" ></el-table-column>
        
        <el-table-column prop="visit_count" label="访问总数" ></el-table-column>
        
        <el-table-column prop="gift_count" label="礼物总数" ></el-table-column>
        
        <el-table-column prop="create_time" label="创建时间" ></el-table-column>
        
        <el-table-column prop="update_time" label="更新时间" ></el-table-column>
        
        <el-table-column prop="voting_rule" label="投票规则" ></el-table-column>
        
        <el-table-column prop="operator" label="操作人" ></el-table-column>
        
        <el-table-column prop="status" label="状态（1：禁用 0：启用）" ></el-table-column>
        
        <el-table-column prop="music" label="背景音乐" ></el-table-column>
        
        <el-table-column prop="rule" label="活动规则" ></el-table-column>
        
        <el-table-column prop="intro" label="活动介绍" ></el-table-column>
        
        <el-table-column prop="prize" label="奖品明细" ></el-table-column>
        
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editShow(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- edit Form -->
      <el-dialog title="编辑活动表" width="30%" @closed="closed" :visible.sync="dialogFormVisible">
        <el-form :model="editData">

          
          <el-form-item label="活动标题">
            <el-input v-model="editData.title"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="活动标识">
            <el-input v-model="editData.tag"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="开始时间">
            <el-input v-model="editData.expire_start"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="结束时间">
            <el-input v-model="editData.expire_end"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="投票规则">
            <el-input v-model="editData.voting_rule"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="状态（1：禁用 0：启用）">
            <el-input v-model="editData.status"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="背景音乐">
            <el-input v-model="editData.music"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="活动规则">
            <el-input v-model="editData.rule"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="活动介绍">
            <el-input v-model="editData.intro"  autocomplete="off"></el-input>
          </el-form-item>
          
          <el-form-item label="奖品明细">
            <el-input v-model="editData.prize"  autocomplete="off"></el-input>
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
	name: "AtvActivityInfo",
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
      title: [
        { required: true, message: "请输入活动标题", trigger: "blur" }
      ],
      tag: [
        { required: true, message: "请输入活动标识", trigger: "blur" }
      ],
      url: [
        { required: true, message: "请输入活动链接", trigger: "blur" }
      ],
      expire_start: [
        { required: true, message: "请输入开始时间", trigger: "blur" }
      ],
      expire_end: [
        { required: true, message: "请输入结束时间", trigger: "blur" }
      ],
      member_count: [
        { required: true, message: "请输入参赛人数", trigger: "blur" }
      ],
      voted_count: [
        { required: true, message: "请输入投票总数", trigger: "blur" }
      ],
      involved_count: [
        { required: true, message: "请输入投票人数", trigger: "blur" }
      ],
      visit_count: [
        { required: true, message: "请输入访问总数", trigger: "blur" }
      ],
      gift_count: [
        { required: true, message: "请输入礼物总数", trigger: "blur" }
      ],
      create_time: [
        { required: true, message: "请输入创建时间", trigger: "blur" }
      ],
      update_time: [
        { required: true, message: "请输入更新时间", trigger: "blur" }
      ],
      voting_rule: [
        { required: true, message: "请输入投票规则", trigger: "blur" }
      ],
      operator: [
        { required: true, message: "请输入操作人", trigger: "blur" }
      ],
      status: [
        { required: true, message: "请输入状态（1：禁用 0：启用）", trigger: "blur" }
      ],
      music: [
        { required: true, message: "请输入背景音乐", trigger: "blur" }
      ],
      rule: [
        { required: true, message: "请输入活动规则", trigger: "blur" }
      ],
      intro: [
        { required: true, message: "请输入活动介绍", trigger: "blur" }
      ],
      prize: [
        { required: true, message: "请输入奖品明细", trigger: "blur" }
      ],
      },
		tableData: [{                //表数据
      atv_id: "atv_id1",
      appid: "appid1",
      title: "title1",
      tag: "tag1",
      url: "url1",
      expire_start: "expire_start1",
      expire_end: "expire_end1",
      member_count: "member_count1",
      voted_count: "voted_count1",
      involved_count: "involved_count1",
      visit_count: "visit_count1",
      gift_count: "gift_count1",
      create_time: "create_time1",
      update_time: "update_time1",
      voting_rule: "voting_rule1",
      operator: "operator1",
      status: "status1",
      music: "music1",
      rule: "rule1",
      intro: "intro1",
      prize: "prize1",
      },{
      atv_id: "atv_id2",
      appid: "appid2",
      title: "title2",
      tag: "tag2",
      url: "url2",
      expire_start: "expire_start2",
      expire_end: "expire_end2",
      member_count: "member_count2",
      voted_count: "voted_count2",
      involved_count: "involved_count2",
      visit_count: "visit_count2",
      gift_count: "gift_count2",
      create_time: "create_time2",
      update_time: "update_time2",
      voting_rule: "voting_rule2",
      operator: "operator2",
      status: "status2",
      music: "music2",
      rule: "rule2",
      intro: "intro2",
      prize: "prize2",
      },{
      atv_id: "atv_id3",
      appid: "appid3",
      title: "title3",
      tag: "tag3",
      url: "url3",
      expire_start: "expire_start3",
      expire_end: "expire_end3",
      member_count: "member_count3",
      voted_count: "voted_count3",
      involved_count: "involved_count3",
      visit_count: "visit_count3",
      gift_count: "gift_count3",
      create_time: "create_time3",
      update_time: "update_time3",
      voting_rule: "voting_rule3",
      operator: "operator3",
      status: "status3",
      music: "music3",
      rule: "rule3",
      intro: "intro3",
      prize: "prize3",
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
