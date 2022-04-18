<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 title="黑马头条">
      <template #left>
        <van-icon name="arrow-left"
                  size="20"
                  @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap"
           v-if="loading">
        <van-loading color="#3296fa"
                     vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail"
           v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info"
                  center
                  :border="false">
          <van-image class="avatar"
                     slot="icon"
                     round
                     fit="cover"
                     :src="article.aut_photo" />
          <div slot="title"
               class="user-name">{{article.aut_name}}</div>
          <div slot="label"
               class="publish-date">{{article.pubdate | relativeTime}}</div>
          <followbtn :isfollow="article.is_followed"
                     :user_id="article.aut_id"
                     class="follow-btn"
                     @upfollow="article.is_followed=$event"></followbtn>

        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body"
             v-html="article.content"
             ref="article-content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论列表 -->
        <comment :articleId="article.art_id"
                 @onload="count=$event.total_count"
                 @reaply-click="OnReaply"
                 :list="commentlist"></comment>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn"
                      type="default"
                      round
                      @click="ispostShow=true"
                      size="small">写评论</van-button>
          <!-- 消息总数 -->
          <van-icon name="comment-o"
                    :badge="count"
                    color="#777" />
          <!-- 收藏组件 -->
          <collect v-model="article.is_collected"
                   :articleId="article.art_id"
                   class="btn-item"></collect>
          <!--点赞组件 -->
          <liked v-model="article.attitude"
                 class="btn-item"
                 :articleId="article.art_id"></liked>
          <van-icon name="share"
                    color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!--  发布评论 -->
        <van-popup v-model="ispostShow"
                   position="bottom">
          <commentPost :target="article.art_id"
                       :ispostShow.sync="ispostShow"
                       @uppost="addpost"></commentPost>
        </van-popup>

      </div>

      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if='Errstatus==404'
           class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap"
           v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn"
                    @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->

      <!-- 评论回复 -->
      <van-popup v-model="isreplsyShow"
                 style="height: 100%"
                 position="bottom">
        <commentReaply v-if="isreplsyShow "
                       :comment="comment_item"
                       @close="isreplsyShow=false"></commentReaply>
      </van-popup>
    </div>

  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import { ImagePreview } from 'vant';
import Followbtn from '@/components/followbtn.vue';
import collect from '@/components/collect.vue'
import liked from '@/components/like.vue'
import comment from './cmoponents/comment.vue'
import commentPost from "./cmoponents/comment-post.vue"
import commentReaply from './cmoponents/comment-reaply.vue'
// 图片预览


export default {
  name: 'ArticleIndex',
  components: { Followbtn, collect, liked, comment, commentPost, commentReaply },
  provide: function () {
    return {
      article_id: this.article_id
    }
  },
  props: {
    article_id: {
      type: [Number, String],
      required: true
    }
  },

  data () {
    return {
      article: {},
      loading: true,
      Errstatus: 0,
      followloading: false,
      count: '',
      ispostShow: false, // 控制发布是不弹出
      commentlist: [], //  子组件传给父亲   共同管理这个数据
      isreplsyShow: false,
      comment_item: ''
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {
  },
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticle(this.article_id)
        this.article = data.data
        // 初始化图片节点
        setTimeout(() => {
          this.page()
        })
      } catch (err) {
        if (err?.response.status === 404) {
          this.Errstatus = 404
        }
      }
      this.loading = false
    },
    // tpage
    page () {
      const pages = this.$refs["article-content"].querySelectorAll('img')
      const images = []
      pages.forEach((ele, index) => {
        images.push(ele.src)
        ele.onclick = () => {
          ImagePreview({
            images,
            startPosition: index, // 图片初始位置  还要获取所有图片 
          });
        }
      });
    },
    // 发布
    addpost (data) {
      this.commentlist.unshift(data.new_obj)
    },
    // 回复弹出层
    OnReaply (comment) {
      console.log(comment);
      this.comment_item = comment
      this.isreplsyShow = true

    }

  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>

