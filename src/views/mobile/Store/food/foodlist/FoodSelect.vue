<template>
  <div class="food-select">
    <ul class="select-item">
      <li v-for="(item, index) in skuType" :key="index">
        <h4>{{index}}</h4>
        <div class="item">
          <span v-for="(val, i) in item" :key="i"
            :class="{disabled: val.state === 2, active: val.state === 1}"
            @click="optionItemClick(index, val)">{{val.type}}</span>
        </div>
      </li>
      <li class="item-count">
        <h4>数量</h4>
        <section class="input">
          <span class="icon" @click="decrease">
            <i class="iconfont icon-jianhao"></i>
          </span>
          <span class="num">{{amount}}</span>
          <span class="icon" @click="increase">
            <i class="iconfont icon-shopping_ic_number_a"></i>
          </span>
        </section>
      </li>
    </ul>
    <a href="javascript:;" class="select-btn">
      <span @click="closePopup">选好了</span>
    </a>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import frequent from '../../../../../mixins/frequent.js';
  import {setTimer, warning} from '../../../../../utils/business/tools.js';

  export default {
    mixins: [frequent],
    data() {
      return {
        currentSpu: [], // ETC 原始sku列表
        skuList: [], // ETC 新生成sku列表
        skuType: {}, // ETC 存储类别
        typeIsSelected: {}, // ETC 被选中的类别
        skuResultList: [], // ETC 存储每次的候选结果集
        currentSku: [], // ETC 当前显示的sku
        current_title: '', // ETC 当前点击的类别
        amount: 1 // ETC 购物车数量
      };
    },
    created() {
      let that = this;
      // 保存最原始的sku数组
      that.currentSpu = that.food_popup.source;
      // 筛查原始sku
      that.skuFilter();
      // 初始化类型
      that.typeInit();
      // 类型加一个标识状态，0为未选，1为选中，2为不可
      that.addStateToType();
      // 首次加载默认显示第一个sku
      that.currentSku = that.currentSpu.options;
    },
    mounted() {
      setTimer(() => {
        const selectBox = this.$el.querySelector('.select-item');
        if(selectBox.scrollHeight > selectBox.clientHeight) {
          // 阻止冒泡
          this.$el.querySelector('.select-item').addEventListener('touchmove', (e) => {
            e.stopPropagation ? e.stopPropagation() : window.event.cancelBubble = true;
          });
        }
      });
    },
    methods: {
      // 关闭弹框并拦截
      closePopup() {
        let that = this;
        that.$store.dispatch('food_list/cutFoodPopup', {status: false});
        that.intercept();
      },
      // 购物车数量增加
      increase(){
        let that = this;
        if(that.currentSku.length !== 1) {
          warning('请先选择规格', 2000);
          return;
        }
        if(that.amount >= that.currentSku[0].stock){
          warning('您购买的宝贝太多了', 2000);
          return;
        }
        that.amount++;
      },
      // 购物车数量减少
      decrease(){
        let that = this;
        if(that.currentSku.length !== 1) {
          warning('请先选择规格', 2000);
          return;
        }
        if(that.amount <= 1){
          warning('不能再少了，亲', 2000);
          return;
        }
        that.amount--;
      },
      // 筛查原始sku
      skuFilter(){
        let that = this;

        const itemFilter = Oval => {
          let listItem = {};
          that.currentSpu.specs.forEach(Sitem => {
            Sitem.items.forEach(Sval => {
              if((Oval.specId === Sitem.specId) && (Oval.specItemId === Sval.specItemId)) listItem[Sitem.specTitle] = Sval.specItemTitle;
            });
          });
          for(let key in listItem) return [key, listItem[key]];
        };
        // 对所有sku遍历
        that.currentSpu.options.forEach(Oitem => {
          let listItem = {};
          Oitem.specItems.forEach(Oval => listItem[itemFilter(Oval)[0]] = itemFilter(Oval)[1]);
          // 保存新的sku列表
          that.skuList.push(listItem);
        });
      },
      // 筛选出所有的存储类别
      typeInit(){
        let that = this;
        that.skuList.forEach((item) => {
          Object.keys(item).forEach((val) => {
            // skuType
            if(that.skuType[val] && that.skuType[val].indexOf(item[val]) === -1){
              that.skuType[val].push(item[val]);
            }else if(!that.skuType[val]){
              that.skuType[val] = [item[val]];
            }
            // typeIsSelected
            if(!that.typeIsSelected[val]){
              that.typeIsSelected[val] = 0;
            }
          });
        });
      },
      // 将所有存储类别进行分类,并标注状态
      addStateToType(){
        let that = this;
        for(let key in that.skuType){
          that.skuType[key].forEach((item, index) => {
            that.skuType[key][index] = {'type': item, 'state': 0};
            // currentSku只有一个时，默认选中
            if(that.skuType[key].length === 1) that.skuType[key][index] = {'type': item, 'state': 1};
          });
        }

        that.skuType = Object.assign({}, that.skuType);
      },
      // 存储类别属性改变
      optionChangeHandler(attr, attrInfo){
        let that = this;
        // 保存点击触发时候的状态
        let attrState = attrInfo.state;
        // 更改当前属性
        that.skuType[attr].forEach((item) => {
          if(item.type === attrInfo.type){
            item.state = 1;
          } else {
            // 同类属性的状态变化
            item.state = 2;
            // item.state = 0;
          }
        });
        // 更改其他属性,首先统计有几个属性被选择
        let count = 0;
        Object.keys(that.typeIsSelected).forEach((item) => {
          count += that.typeIsSelected[item];
        });
        // 如果本次选择的是disabled,则必须重新从原始数据集进行筛选
        if(attrState === 2){
          that.resetTypeSelectedState();
          that.selectRightData(that.skuList, attr, attrInfo);
        // 如果本次选择的是active,则取消选中状态
        } else if(attrState === 1){
          that.skuType[attr].forEach((item) => {
            item.state = 0;
          });
        // 否则进入下一个逻辑
        } else {
          // 如果count = 0; 则是第一次选择,应该从原始数据集中进行筛选
          if(count === 0){
            that.resetTypeSelectedState();
            that.selectRightData(that.skuList, attr, attrInfo);

          /*
           * 如果count !== 0; 则是已有属性被选中,需要判断这次是新选还是更改
           * 新选则从上次的结果集进行筛选,更改则依然从原始数据集进行筛选
           */
          } else {
            if(that.typeIsSelected[attr]){
              that.selectRightData(that.skuList, attr, attrInfo);
            } else {
              that.selectRightData(that.skuResultList, attr, attrInfo);
            }
          }
        }
      },
      // 状态处理函数
      selectRightData(dataList, attr, attrInfo){
        let that = this;
        that.typeIsSelected[attr] = 1;
        that.skuResultList = [];

        dataList.forEach((item) => {
          if(item[attr] === attrInfo.type){
            that.skuResultList.push(item);
          }
        });


        that.typeToSku();
        // 根据结果数据集进行对各个属性重新赋值渲染
        let tempSkuType = {};
        that.skuResultList.forEach((item) => {
          Object.keys(item).forEach((val) => {
            // skuType
            if(tempSkuType[val] && tempSkuType[val].indexOf(item[val]) === -1){
              tempSkuType[val].push(item[val]);
            } else if(!tempSkuType[val]){
              tempSkuType[val] = [item[val]];
            }
          });
        });

        for(let key in tempSkuType){
          if(that.typeIsSelected[key] === 0){
            for(let i = 0, LEN = that.skuType[key].length; i < LEN; i++){
              let currEle = that.skuType[key][i];
              if(tempSkuType[key].indexOf(currEle.type) > -1){
                currEle.state = 0;
              } else {
                currEle.state = 2;
              }
            }
          }
        }
      },
      // 重置被选中类别的状态
      resetTypeSelectedState(){
        let that = this;
        for(let key in that.typeIsSelected){
          that.typeIsSelected[key] = 0;
        }
      },
      // 根据筛选出来的结果集去展示对应的sku
      typeToSku(){
        let that = this;
        // 清空sku
        that.currentSku = [];
        // 遍历查找当前所选sku
        that.skuList.forEach((item, key) => {
          that.skuResultList.forEach((val) => {
            if(item === val){
              that.currentSku.push(that.currentSpu.options[key]);
            }
          });
        });
      },
      // 监听子组件emit过来的事件
      optionItemClick(title, item){
        let that = this;
        that.closePopup();
        return;
        // 获取当前点击的类别
        that.current_title = title;

        that.optionChangeHandler(title, item);
      }
    },
    computed: mapState({
      food_popup: (store) => store.food_list.food_popup
    })
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .food-select {
    .select-item {
      padding: 0.4rem 0.3rem 0;
      height: 4rem;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      li {
        display: flex;
        margin-bottom: 0.1rem;
        h4 {
          display: flex;
          align-items: center;
          width: 0.9rem;
          height: 0.6rem;
          font-size: 0.3rem;
          font-weight: 400;
          color: $themeColor;
        }
        .item {
          flex: 1;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          span {
            box-sizing: border-box;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            height: 0.6rem;
            padding: 0.1rem 0.3rem;
            margin: 0 0.3rem 0.3rem 0;
            border-radius: 0.3rem;
            border: 0.02rem solid $borderColor;
            font-size: 0.3rem;
            color: $themeColor;
            &:last-child{
              margin-right: 0;
            }
            &.active{
              border-color: $darkBlue;
              color: $darkBlue;
            }
            &.disabled{
              border: 0.02rem solid #eeeeee;
              color: #b6b6b6;
            }
          }
        }
      }
    }
    .item-count {
      display: flex;
      align-items: center;
      padding-bottom: 0.1rem;
      h4 {
        display: flex;
        align-items: center;
        width: 0.9rem;
        height: 0.6rem;
        font-size: 0.3rem;
        font-weight: 400;
        color: $themeColor;
      }
      .input{
        box-sizing: border-box;
        display: flex;
        width: 2.1rem;
        height: 0.58rem;
        border-radius: 0.03rem;
        border: 0.01rem solid #f5f5f5;
        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 0.58rem;
          height: 0.58rem;
          background-color: $intervalColor;
          &.min i{
            color: $subColor;
          }
          i {
            font-size: 0.26rem;
            color: $themeColor;
          }
        }
        .num {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.3rem;
          font-weight: 400;
          height: 0.58rem;
          color: $themeColor;
        }
      }
    }
    .select-btn {
      padding: 0 0.3rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      span {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 1.36rem;
        height: 0.6rem;
        border-radius: 0.3rem;
        background-color: $darkBlue;
        font-size: 0.26rem;
        color: #fff;
      }
    }
  }
</style>
