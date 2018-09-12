import fetch from 'create-api';

class Life {
  constructor() {
    this.$api = fetch;
  }

  /**
   * 置顶列表
   */
  getStickList() {
    return this.$api.get('content/content_top', {});
  }

  /**
   * 关注列表
   * @param created_at
   * @param feed_type
   */
  getFocusList(created_at, feed_type) {
    return this.$api.get('/user/personalize', {created_at, feed_type});
  }

  /**
   * 热门话题
   */
  getHotTopicList() {
    return this.$api.get('/hot_topic_list', {});
  }

  /**
   * 动态列表
   * @param page
   */
  getMomentList(page) {
    return this.$api.get('content/dynamic_list', {page});
  }

  /**
   * 评论列表
   * @param entity_id
   * @param entity_type
   * @param page
   */
  getCommentsList({entity_id, entity_type = 1, page}) {
    return this.$api.get('/content/comments_list', {entity_id, entity_type, page});
  }

  /**
   * 用户信息
   * @param other_user_id
   */
  getUserInfo(other_user_id) {
    return this.$api.get('/user_detail', {other_user_id});
  }

  /**
   * 用户动态
   * @param other_user_id
   * @param page
   */
  getUserDynamic(other_user_id, page) {
    return this.$api.get('/content/get_user_dynamic', {other_user_id, page});
  }

  /**
   * 动态详情
   * @param entity_id
   * @param entity_type
   * @param page
   */
  getMomentDetail(entity_id) {
    return this.$api.get('content/moment_detail', {entity_id});
  }

  /**
   * 活动详情
   * @param activity_id
   */
  getActivityDetail(activity_id) {
    return this.$api.post('content/activity_detail', {activity_id});
    // return this.$api.get('content/getactivity_detail', {activity_id});
  }

  /**
   * 文章详情
   * @param article_id
   * @param preview
   */
  getArticleDetail(article_id, preview) {
    return this.$api.get('/article_detail', {article_id, preview});
  }

  /**
   * 话题详情
   * @param topic_id
   * @param preview
   */
  getTopicDetail({topic_id, preview}) {
    return this.$api.get('/topic_detail', {topic_id, preview});
  }

  /**
   * 话题列表
   * @param entity_type
   * @param entity_id
   * @param page
   */
  getTopicDynamic({entity_type, entity_id, page}) {
    return this.$api.get('content/each_dynamic_list', {entity_type, entity_id, page});
  }

  /**
   * 话题简介
   */
  getTopicIntro({topic_id, preview}) {
    return this.$api.get('/content/topic_mobile', {topic_id, preview});
  }

  /**
   * 关注/粉丝列表
   */
  getFansOrIdols(data){
    return this.$api.get('/user/fansOrIdols', data);
  }

  /**
   * 赞列表
   * @param entity_id
   * @param entity_type
   * @param page
   */
  getThumbList({entity_id, entity_type, page}) {
    return this.$api.get('/content/thumb_up_list', {entity_id, entity_type, page});
  }
}

// 单列模式返回对象
let instance;
export default () => {
  if (instance) return instance;
  instance = new Life();
  return instance;
};
