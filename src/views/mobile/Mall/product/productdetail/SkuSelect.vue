<template>
  <div class="sku-select">
    <mt-popup
      class="lb_footer"
      v-model="sku_popup.status"
      position="bottom"
      modal="true"
      closeOnClickModal="true"
    >
      <div class="sku_select">
        <current-sku :currentSku="currentSku"></current-sku>
        <div class="product_options">
          <option-items
            v-for="(item,index) in skuType"
            :optionType="skuType[index]"
            :optionTitle="index" :key="index"
            :currentTitle="current_title"
            @to-parent="listenItems"
          >
          </option-items>
          <shop-amount :currentSku="currentSku" @to-parent="getAmount"></shop-amount>
        </div>
        <a href="javascript:;" @click="confirm">确定</a>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import {os} from '../../../../../utils/business/judge.js';
  import frequent from '../../../../../mixins/frequent.js';
  import {CurrentSku, OptionItems, ShopAmount} from './skuselect/index.js';

  export default {
    mixins: [frequent],
    components: {
      CurrentSku, OptionItems, ShopAmount
    },
    data() {
      return {
        currentSpu: [], // ETC 原始sku列表
        skuList: [], // ETC 新生成sku列表
        skuType: {}, // ETC 存储类别
        typeIsSelected: {}, // ETC 被选中的类别
        skuResultList: [], // ETC 存储每次的候选结果集
        currentSku: [], // ETC 当前显示的sku
        current_title: '', // ETC 当前点击的类别
        amount: 1
      };
    },
    created() {
      // 保存最原始的sku数组
      this.currentSpu = this.product_info;
      // 筛查原始sku
      this.skuFilter();
      // 初始化类型
      this.typeInit();
      // 类型加一个标识状态，0为未选，1为选中，2为不可
      this.addStateToType();
      // 首次加载默认显示第一个sku
      this.currentSku = this.currentSpu.options;
    },
    watch: {
      currentSku(cur){
        this.$emit('to-parent', cur);
      },
      // 阻止默认滚动事件
      'sku_popup.status'(cur){
        if(cur){
          document.body.style.overflow = 'hidden';
          document.documentElement.style.overflow = 'hidden';
          if(!os().isDeskTop) document.querySelector('.product-detail').style.position = 'fixed';
        } else {
          document.body.style.overflow = 'visible';
          document.documentElement.style.overflow = 'visible';
          if(!os().isDeskTop) document.querySelector('.product-detail').style.position = 'static';
        }
      }
    },
    methods: {
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
      optionChangeHandler(title, item){
        this.attrChangeHandler(title, item);
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
      // 存储类别属性改变
      attrChangeHandler(attr, attrInfo){
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
      listenItems(title, item){
        let that = this;
        // 获取当前点击的类别
        that.current_title = title;

        that.optionChangeHandler(title, item);
      },
      getAmount(data){
        let that = this;
        that.amount = data;
      },
      confirm(){
        let that = this;
        if(that.sku_popup.type === 1) {
          that.$emit('to-skuResult', that.skuResultList);
          that.$store.dispatch('product_detail/changeSkuPopup', {status: false});
        } else {
          that.intercept();
        }
      }
    },
    computed: {
      ...mapState({
        product_info: (store) => store.product_detail.product_info,
        sku_popup: (store) => store.product_detail.sku_popup
      })
    }
  };
</script>
<style lang="scss" scoped>
  @import '../../../../../assets/scss/_base.scss';

  .sku-select{
    .mint-popup{
      width: 7.5rem;
      border-radius: 0.2rem 0.2rem 0 0;
      .sku_select{
        .product_options{
          max-height: 4rem;
          overflow: auto;
        }
        a{
          display: block;
          margin:  0.15rem auto;
          width: 6.9rem;
          height: 0.8rem;
          border-radius: 0.4rem;
          font-size: 0.32rem;
          font-weight: 300;
          line-height: 0.8rem;
          text-align: center;
          color: #ffffff;
          background-color: $darkBlue;
        }
      }
    }
  }
</style>
<style lang="scss">
  .sku-select{
    .mint-popup{
      z-index: 3001!important;
    }
    .v-modal{
      z-index: 3000!important;
    }
  }
  .mint-toast{
    z-index: 3002!important;
  }
</style>


