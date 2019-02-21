<template>
  <div class="wrapper">
    <v-snackbar top="top" :color="snackColor" v-model="snackbar" :timeout="timeout">
      {{ snackbarMessage }}
      <v-btn flat @click.native="snackbar = false">关闭</v-btn>
    </v-snackbar>

    <v-btn class="pink white--text" style="margin-bottom:20px;" @click="addCard">添加一个新卡片</v-btn>
    <v-btn class="pink white--text" style="margin-bottom:20px;" @click="pullList">获取首页更新</v-btn>
    <v-card v-for="(item,index) in links" :key="index">
      <v-card-title primary-title style=" height: 70px;">
        <h4 class="headline mb-0">{{item.title}}</h4>
        <v-spacer></v-spacer>
        <div class="card-options">
          <v-btn
            flat
            icon
            color="green"
            @click.native="editCartDialog = true; addBtnIndex = index;editCartInput=links[index].title "
          >
            <v-icon>edit</v-icon>
          </v-btn>
          <v-tooltip bottom color="pink">
            <v-btn slot="activator" flat icon color="pink" @click="deleteCard(index)">
              <v-icon>delete</v-icon>
            </v-btn>
            <span>删除不可恢复</span>
          </v-tooltip>
        </div>
      </v-card-title>

      <v-container>
        <div
          v-for="(chipItem,chipIndex) in item.items"
          :key="chipIndex"
          style="display: inline-block;"
        >
          <v-tooltip bottom color="pink">
            <v-chip slot="activator" @click="openLink(chipItem.link)">
              <v-avatar>
                <img :src="chipItem.icon" alt>
              </v-avatar>
              {{chipItem.title}}
              <span
                @click.stop.prevent="removeChip(index,chipIndex)"
                class="chip__close"
              >
                <i aria-hidden="true" class="icon material-icons">cancel</i>
              </span>
            </v-chip>
            <span>{{chipItem.description}}</span>
          </v-tooltip>
        </div>
        <v-btn
          class="addBtnSmall"
          fab
          dark
          small
          color="primary"
          @click.native="addChipDialog = true; addBtnIndex = index"
        >
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
                  <v-text-field
                    label="网址"
                    required
                    v-model="formInfo.addlinkLink"
                    v-on:keyup.13="addChipSave"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="标题"
                    v-model="formInfo.addlinkTitle"
                    v-on:keyup.13="addChipSave"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="描述"
                    v-model="formInfo.addlinkDescription"
                    v-on:keyup.13="addChipSave"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="图标"
                    v-model="formInfo.addlinkIcon"
                    placeholder="/icon/link.ico"
                    v-on:keyup.13="addChipSave"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-switch
                    label="置顶"
                    :class="{ indigoText: formInfo.switch1 }"
                    v-model="formInfo.switch1"
                  ></v-switch>
                </v-flex>
                <small class="indigo--text">网址是必填项哦，其他可不填，按回车键保存</small>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-progress-circular indeterminate color="primary" v-show="progressShow"></v-progress-circular>
            <v-btn
              color="blue darken-1"
              flat
              @click.native="addChipDialog = false; formInfo.addlinkLink = '';formInfo.addlinkDescription = '';formInfo.addlinkTitle = '';formInfo.addlinkIcon = '';"
            >关闭</v-btn>
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
                  <v-text-field
                    label="修改卡片名称"
                    v-model="editCartInput"
                    placeholder="请填入新的名称"
                    v-on:keyup.13="editCardSave"
                  ></v-text-field>
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
let linksJsonv3 = localStorage.linksJsonv3
  ? JSON.parse(localStorage.linksJsonv3)
  : window.listData.concat();
export default {
  data() {
    return {
      links: linksJsonv3,
      addChipDialog: false,
      addBtnIndex: 0,
      formInfo: {
        addlinkTitle: "",
        addlinkLink: "",
        addlinkDescription: "",
        addlinkIcon: "",
        switch1: false
      },
      snackbar: false,
      snackbarMessage: "hello",
      timeout: 1500,
      snackColor: "error",
      progressShow: false,
      editCartDialog: false,
      editCartInput: ""
    };
  },
  watch: {
    //监听数据变化
    links: {
      //监听links变化
      handler: function(items) {
        localStorage.linksJsonv3 = JSON.stringify(items);
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
      if (
        this.formInfo.addlinkLink === "" ||
        this.formInfo.addlinkLink === null
      ) {
        this.snackColor = "error";
        this.snackbarMessage = "网址不能为空";
        this.snackbar = true;
        return false;
      }
      if (this.formInfo.addlinkLink.indexOf("http") < 0) {
        this.formInfo.addlinkLink = "https://" + this.formInfo.addlinkLink;
      }
      if (
        this.formInfo.addlinkTitle === "" ||
        this.formInfo.addlinkTitle === null
      ) {
        this.formInfo.addlinkTitle = this.formInfo.addlinkLink.replace(
          /www.|.com|.net|.cn|http:|https:|\/\//g,
          ""
        );
      }
      if (
        this.formInfo.addlinkDescription === "" ||
        this.formInfo.addlinkDescription === null
      ) {
        this.formInfo.addlinkDescription = this.formInfo.addlinkTitle;
      }
      if (
        this.formInfo.addlinkIcon === "" ||
        this.formInfo.addlinkIcon === null
      ) {
        this.formInfo.addlinkIcon = "/icon/link.ico";
      }
      let self = this;
      this.progressShow = true;
      setTimeout(function() {
        if (self.formInfo.switch1) {
          self.links[self.addBtnIndex].items.unshift({
            title: self.formInfo.addlinkTitle,
            icon: self.formInfo.addlinkIcon,
            description: self.formInfo.addlinkDescription,
            link: self.formInfo.addlinkLink
          });
        } else {
          self.links[self.addBtnIndex].items.push({
            title: self.formInfo.addlinkTitle,
            icon: self.formInfo.addlinkIcon,
            description: self.formInfo.addlinkDescription,
            link: self.formInfo.addlinkLink
          });
        }

        self.addChipDialog = false;
        self.formInfo.addlinkLink = "";
        self.formInfo.addlinkDescription = "";
        self.formInfo.addlinkTitle = "";
        self.formInfo.addlinkIcon = "";
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
    pullList() {
      // 来自服务器的数
      let srvJsonList = JSON.stringify(window.listData);
      // 备份用户的首页
      localStorage.linksJsonv4 = JSON.stringify(this.links);
      // 覆盖用户数据
      this.links = JSON.parse(srvJsonList);
      localStorage.linksJsonv3 = srvJsonList;

      this.snackColor = "cyan darken-2";
      this.snackbarMessage = "您原来的首页信息备份在localStorage.linksJsonv4中，请注意保存！";
      this.snackbar = true;
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
@media screen and (max-width: 550px) {
  .addBtnSmall {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>


