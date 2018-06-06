<template>
    <div class="wrapper">
        <v-snackbar
      top = "top"
      :color="snackColor"
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ snackbarMessage }}
      <v-btn flat  @click.native="snackbar = false">关闭</v-btn>
    </v-snackbar>

    <v-btn class="pink white--text" style="margin-bottom:20px;" @click="addCard">添加一个新卡片</v-btn>
    <v-card  v-for="(item,index) in links" :key="index">
            <v-card-title primary-title style=" height: 70px;">
                <h4 class="headline mb-0">{{item.title}}</h4>
                <v-spacer></v-spacer>
                <div class="card-options">
                    <v-btn flat icon color="green" @click.native="editCartDialog = true; addBtnIndex = index;editCartInput=links[index].title "><v-icon>edit</v-icon></v-btn>
                     <v-tooltip bottom color="pink">
                        <v-btn slot="activator" flat icon color="pink" @click="deleteCard(index)"><v-icon>delete</v-icon></v-btn>
                        <span>删除不可恢复</span>
                    </v-tooltip>
                </div>
          
            </v-card-title>

            <v-container>
                <div v-for="(chipItem,chipIndex) in item.items" :key="chipIndex" style="display: inline-block;">
                    <v-tooltip bottom color="pink">
                <v-chip  slot="activator" @click="openLink(chipItem.link)">
                    <v-avatar>
                        <img :src="chipItem.icon" alt="">
                    </v-avatar>
                    {{chipItem.title}}
                    <span @click.stop.prevent="removeChip(index,chipIndex)" class="chip__close"><i aria-hidden="true" class="icon material-icons">cancel</i></span>
                </v-chip>
                <span>{{chipItem.description}}</span>
                </v-tooltip>
                </div>
                <v-btn fab dark small color="primary"  @click.native="addChipDialog = true; addBtnIndex = index">
                    <v-icon dark>add</v-icon>
                </v-btn>
                
            </v-container>
        </v-card>

        <v-layout row justify-center>
    <v-dialog v-model="addChipDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">新建</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
                 <v-flex xs12>
                    <v-text-field label="网址" required  v-model="addlinkLink"  v-on:keyup.13="addChipSave"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field label="标题" v-model="addlinkTitle" v-on:keyup.13="addChipSave"></v-text-field>
                </v-flex>
                <v-flex xs12>
                <v-text-field label="描述" v-model="addlinkDescription" v-on:keyup.13="addChipSave"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field label="图标" v-model="addlinkIcon" placeholder="https://ws4.sinaimg.cn/large/006tKfTcgy1fs1v1efxpgj30sg0sgac4.jpg" v-on:keyup.13="addChipSave"></v-text-field>
                </v-flex>
                <v-flex xs12>
                <v-switch label="置顶" :class="{ indigoText: switch1 }" v-model="switch1" ></v-switch>
                </v-flex>
                <small class="indigo--text">网址是必填项哦，其他可不填，按回车键保存</small>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-progress-circular indeterminate color="primary" v-show="progressShow"></v-progress-circular>
          <v-btn color="blue darken-1" flat @click.native="addChipDialog = false;">关闭</v-btn>
          <v-btn color="blue darken-1" flat @click.native="addChipSave">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="editCartDialog" persistent max-width="500px">
      <v-card>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
                 <v-flex xs12>
                    <v-text-field label="修改卡片名称"  v-model="editCartInput"  placeholder="请填入新的名称"></v-text-field>
                </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="editCartDialog = false">关闭</v-btn>
          <v-btn color="blue darken-1" flat @click.native="editCardSave">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-layout>
    </div>
</template>


<script type="text/ecmascript-6">
let linksJson = localStorage.linksJson
  ? JSON.parse(localStorage.linksJson)
  : [
      {
        title: "我",
        items: [
          {
            title: "我的博客",
            icon:
              "https://ws2.sinaimg.cn/large/006tNc79gy1fpv9bxu35bj305k05k0sp.jpg",
            description: "我的博客",
            link: "https://zc95.github.io/"
          },
          {
            title: "我的github",
            icon: "https://assets-cdn.github.com/favicon.ico",
            description: "我的github",
            link: "https://github.com/zc95"
          }
        ]
      },
      {
        title: "学习网站",
        items: [
          {
            title: "菜鸟教程",
            icon: "http://static.runoob.com/images/favicon.ico",
            description: "菜鸟教程",
            link: "http://www.runoob.com/"
          },
          {
            title: "饥人谷",
            icon:
              "https://jirengu.com/addons/theme/stv1/_static/image/favicon.ico?v=20141107",
            description: "靠谱的前端学习社区",
            link: "https://jirengu.com/"
          },
          {
            title: "MDN",
            icon:
              "https://developer.mozilla.org/static/img/favicon144.e7e21ca263ca.png",
            description: "MDN",
            link: "https://developer.mozilla.org/zh-CN/"
          },
          {
            title: "freecodecamp",
            icon:
              "https://www.freecodecamp.cn/favicons/apple-touch-icon-152x152.png",
            description: "开启你的软件工程师生涯",
            link: "https://www.freecodecamp.cn/"
          },
          {
            title: "ruanyifeng 阮一峰的博客",
            icon:
              "https://ws4.sinaimg.cn/large/006tKfTcgy1fs1v1efxpgj30sg0sgac4.jpg",
            description: "ruanyifeng 阮一峰的博客",
            link: "http://www.ruanyifeng.com/blog/"
          },
          {
            title: "segmentfault",
            icon:
              "https://static.segmentfault.com/v-5b17ff84/global/img/favicon.ico",
            description: "思否",
            link: "https://segmentfault.com/"
          },
          {
            title: "掘金",
            icon: "https://b-gold-cdn.xitu.io/favicons/v2/apple-touch-icon.png",
            description: "掘金",
            link: "https://juejin.im/"
          },
          {
            title: "慕课网",
            icon:
              "https://www.imooc.com/static/img/common/touch-icon-iphone-retina.png",
            description: "程序员的梦工厂",
            link: "https://www.imooc.com/"
          },
          {
            title: "腾讯课堂",
            icon:
              "https://ws4.sinaimg.cn/large/006tKfTcgy1fs1v1efxpgj30sg0sgac4.jpg",
            description: "专业的在线教育平台",
            link: "https://ke.qq.com/"
          }
        ]
      },
      {
        title: "工具",
        items: [
          {
            title: "Iconfont",
            icon:
              "//gtms04.alicdn.com/tps/i4/TB1_oz6GVXXXXaFXpXXJDFnIXXX-64-64.ico",
            description: "Iconfont",
            link: "http://www.iconfont.cn/"
          },
          {
            title: "有道翻译",
            icon:
              "https://ws2.sinaimg.cn/large/006tKfTcgy1fs2173hjtvj303g03gt8t.jpg",
            description: "有道翻译",
            link: "http://fanyi.youdao.com/"
          },
          {
            title: "Regexper",
            icon: "https://regexper.com/favicon.ico",
            description: "JavaScript 正则可视化工具",
            link: "https://regexper.com/"
          },
          {
            title: "send.firefox",
            icon: "https://send.firefox.com/favicon-32.4efdbe5a.png",
            description: "firefox 私密、安全的文件分享服务",
            link: "https://send.firefox.com/"
          }
        ]
      },
      {
        title: "框架",
        items: [
          {
            title: "angular",
            icon:
              "https://www.angular.cn/assets/images/logos/angular/angular.svg",
            description: "一套框架，多种平台 移动端 & 桌面端",
            link: "https://www.angular.cn/"
          },
          {
            title: "react",
            icon:
              "http://react-china.org/uploads/default/37/58d7637262ac6228.png",
            description: "react",
            link: "http://react-china.org/"
          },
          {
            title: "vuejs",
            icon: "https://cn.vuejs.org/images/logo.png",
            description: "渐进式 JavaScript 框架",
            link: "https://cn.vuejs.org/"
          }
        ]
      },
      {
        title: "UI",
        items: [
          {
            title: "layui",
            icon:
              "https://ws4.sinaimg.cn/large/006tKfTcgy1fs1v1efxpgj30sg0sgac4.jpg",
            description: "layui",
            link: "http://www.layui.com"
          },
          {
            title: "SUI Mobile",
            icon:
              "https://ws4.sinaimg.cn/large/006tKfTcgy1fs1v1efxpgj30sg0sgac4.jpg",
            description: "轻量，小巧且精美的UI库",
            link: "http://m.sui.taobao.org/"
          },
          {
            title: "vuetifyjs",
            icon: "https://vuetifyjs.com/static/vuetify-logo-300.png",
            description: "Material Design Component Framework",
            link: "https://vuetifyjs.com/zh-Hans/"
          },
          {
            title: "framework7",
            icon: "http://framework7.cn/i/favicon.png",
            description: "可以构建精美的iOS & Android 应用",
            link: "http://framework7.cn/"
          },
          {
            title: "element 饿了么",
            icon: "http://element-cn.eleme.io/favicon.ico",
            description: "element 饿了么",
            link: "http://element-cn.eleme.io/"
          },
          {
            title: "bulma.io",
            icon: "https://bulma.io/favicons/favicon.ico?v=201701041855",
            description: "bulma.io",
            link: "https://bulma.io"
          }
        ]
      }
    ];
export default {
  data() {
    return {
      links: linksJson,
      addChipDialog: false,
      addBtnIndex: 0,
      addlinkTitle: "",
      addlinkLink: "",
      addlinkDescription: "",
      addlinkIcon: "",
      snackbar: false,
      snackbarMessage: "hello",
      timeout: 1500,
      snackColor: "error",
      progressShow: false,
      switch1: false,
      editCartDialog: false,
      editCartInput: ""
    };
  },
  watch: {
    //监听数据变化
    links: {
      //监听links变化
      handler: function(items) {
        localStorage.linksJson = JSON.stringify(items);
      },
      deep: true //handler:{},deep:true 深度监听todos
    }
  },
  methods: {
    openLink(link) {
      window.open(link);
    },
    removeChip(index, chipIndex) {
      this.links[index].items.splice(chipIndex, 1);
    },
    addChipSave() {
      if (this.addlinkLink === "" || this.addlinkLink === null) {
        this.snackColor = "error";
        this.snackbarMessage = "网址不能为空";
        this.snackbar = true;
        return false;
      }
      if (this.addlinkLink.indexOf("http") < 0) {
        this.addlinkLink = "https://" + this.addlinkLink;
      }
      if (this.addlinkTitle === "" || this.addlinkTitle === null) {
        this.addlinkTitle = this.addlinkLink.replace(
          /www.|.com|.net|.cn|http:|https:|\/\//g,
          ""
        );
      }
      if (this.addlinkDescription === "" || this.addlinkDescription === null) {
        this.addlinkDescription = this.addlinkTitle;
      }
      if (this.addlinkIcon === "" || this.addlinkIcon === null) {
        this.addlinkIcon =
          "https://ws4.sinaimg.cn/large/006tKfTcgy1fs1v1efxpgj30sg0sgac4.jpg";
      }
      var self = this;
      this.progressShow = true;
      setTimeout(function() {
        if (self.switch1) {
          self.links[self.addBtnIndex].items.unshift({
            title: self.addlinkTitle,
            icon: self.addlinkIcon,
            description: self.addlinkDescription,
            link: self.addlinkLink
          });
        } else {
          self.links[self.addBtnIndex].items.push({
            title: self.addlinkTitle,
            icon: self.addlinkIcon,
            description: self.addlinkDescription,
            link: self.addlinkLink
          });
        }

        self.addChipDialog = false;
        self.addlinkLink = "";
        self.addlinkDescription = "";
        self.addlinkTitle = "";
        self.addlinkIcon = "";
        self.progressShow = false;
      }, 820);
    },
    addCard() {
      if (this.links[0].items.length == 0) {
        this.snackColor = "error";
        this.snackbarMessage = "请勿重复操作";
        this.snackbar = true;
        return false;
      } else {
        this.snackColor = "cyan darken-2";
        this.snackbarMessage = "成功添加新卡片";
        this.snackbar = true;
      }
      this.links.unshift({ title: "新卡片", items: [] });
    },
    deleteCard(index) {
      this.links.splice(index, 1);
    },
    editCardSave() {
      if (this.editCartInput == "") {
        this.snackColor = "error";
        this.snackbarMessage = "卡片名称不能为空";
        this.snackbar = true;
        return false;
      }
      this.links[this.addBtnIndex].title = this.editCartInput;
      this.editCartDialog = false;
    }
  }
};
</script>

<style scope>
.wrapper {
  width: 100%;
}
.wrapper > .card {
  margin-bottom: 20px;
  width: 100%;
  text-align: left;
  transition: box-shadow 0.4s;
  -moz-transition: box-shadow 0.4s; /* Firefox 4 */
  -webkit-transition: box-shadow 0.4s; /* Safari and Chrome */
  -o-transition: box-shadow 0.4s; /* Opera */
}
.wrapper > .card:hover {
  box-shadow: 2px 3px 7px 2px rgba(3, 3, 3, 0.42);
}

.chip__content:hover,
.card:hover {
  cursor: pointer;
}

.card__title .card-options {
  display: none;
}

.card__title:hover .card-options {
  display: inline-block;
}

.chip .chip__content {
  text-transform: capitalize;
  padding: 0 5px 0 12px;
}

.chip .avatar {
  width: 32px !important;
  height: 32px !important;
  margin-left: -12px;
  margin-right: 8px;
  background-color: white;
}
.indigoText label {
  color: #3875cc !important;
  font-weight: 700;
}
</style>


