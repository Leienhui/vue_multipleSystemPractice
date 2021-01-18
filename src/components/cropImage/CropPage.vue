<template>
    <div>
        <div class="cutBox">
            <div class="left">
                <div ref="bigimgbox" class='bigimgbox' :style="{'width':nowpicW+'px','height':nowpicH+'px'}">
                    <!-- 这里一定要等图片不是0的情况才上数，否则会出现拽不动和大小改变不了 -->
                    <VueDragResize :style="{backgroundImage:`url(${baseURL}${nowCropImage})`,backgroundSize:calcBackgroundSize(),backgroundPosition:calcBackgroundPosition()}" v-if="nowpicW!==0&&nowpicH!==0" :isActive="true" :w="width" :h="height" v-on:resizing="resize" v-on:dragging="resize" :parentLimitation="true" :aspectRatio="true">
                        <div class="cutbox" :style="{width: width+ 'px',height:height+'px',left:left+'px',top:top+'px'}">
                        </div>
                    </VueDragResize>
                </div>

            </div>
            <div class="right">
                <div class="big">
                    <img :src="baseURL+nowCropImage" alt="" :style="{width:calcWidth(140),height:calcHeight(140),top:calcTop(140),left:calcLeft(140)}">
                </div>
                <div class="middle">
                    <img :src="baseURL+nowCropImage" alt="" :style="{width:calcWidth(100),height:calcHeight(100),top:calcTop(100),left:calcLeft(100)}">
                </div>
                <div class="small">
                    <img :src="baseURL+nowCropImage" alt="" :style="{width:calcWidth(60),height:calcHeight(60),top:calcTop(60),left:calcLeft(60)}">
                </div>
                <button @click="cutPic">剪裁</button>
            </div>
        </div>
    </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize'
import picHttpInstance from './../../http/picHttp'
export default {
  props: ['nowCropImage'],
  mounted () {
    const img = new Image()
    img.src = this.baseURL + this.nowCropImage
    img.className = 'bigimg'
    img.onload = () => {
      this.originpicW = img.width
      this.originpicH = img.height
      //  先得到图片真实宽高再给图片设置最大宽高
      img.style.maxWidth = 500 + 'px'
      img.style.maxHeight = 300 + 'px'
      //   得到计算后属性(图片压缩后的值)
      this.nowpicW = parseInt(getComputedStyle(img)['width'])
      this.nowpicH = parseInt(getComputedStyle(img)['height'])
      console.log(this.nowpicW, this.nowpicH)
    }
    this.$refs.bigimgbox.appendChild(img)
  },
  data () {
    return {
      baseURL: 'http://127.0.0.1:3000/',
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      //   图片真正的宽高
      originpicW: 0,
      originpicH: 0,
      // 当前图片的宽高
      nowpicW: 0,
      nowpicH: 0
      // 裁切块的各种值
    }
  },
  methods: {
    resize (newRect) {
      this.width = newRect.width
      this.height = newRect.height
      this.top = newRect.top
      this.left = newRect.left
    },
    calcWidth (a) {
      return this.nowpicW / this.width * a + 'px'
    },
    calcHeight (a) {
      return this.nowpicH / this.height * a + 'px'
    },
    calcTop (a) {
      return -this.top / this.height * a + 'px'
    },
    calcLeft (a) {
      return -this.left / this.width * a + 'px'
    },
    calcBackgroundSize () {
      return this.nowpicW + 'px ' + this.nowpicH + 'px'
    },
    calcBackgroundPosition () {
      return '-' + this.left + 'px  -' + this.top + 'px'
    },
    async cutPic () {
      const {data: res} = await picHttpInstance.cutPic(
        {
          width: this.width,
          height: this.height,
          top: this.top,
          left: this.left,
          originRateNowpic: this.originpicW / this.nowpicW,
          filename: this.nowCropImage
        }
      )
      this.$Message.success(res)
      this.$emit('success')
    }

  },
  components: {
    VueDragResize
  }
}

</script>

<style lang="less" scoped>
.cutBox{
    width: 700px;
    height: 400px;
    .left{
        width: 500px;
        height: 400px;
        float: left;
        background-image: url('./../../../img/hbg.jpg');
        position: relative;
        .bigimgbox{
            position: absolute;
            top:50%;
            left:50%;
            transform:translateX(-50%) translateY(-50%);
             &::before{
                 content: '';
                     position: absolute;
                     top: 0;
                     left: 0;
                     width: 100%;
                     height: 100%;
                     background-color:black;
                     opacity: .3;
                 }
            .bigimg{
                 position :absolute;
                 top:50%;
                 left:50%;
                 transform:translateX(-50%) translateY(-50%);

            }
            .cutbox{
                border: 1px solid black !important;
                overflow: hidden;
            }
        }

    }
    .right{
        width: 200px;
        height: 400px;
        float: left;
        background-color: #ccc;
        .big{
            width: 140px;
            height: 140px;
            border: 1px solid black;
            margin: 10px;
            overflow: hidden;
            position: relative;
            img{
                position: absolute;
            }

        }
        .middle{
             width: 100px;
            height: 100px;
            border: 1px solid black;
            margin: 10px;
            overflow: hidden;
             position: relative;
            img{
                position: absolute;
            }

        }
        .small{
             width: 60px;
            height: 60px;
            border: 1px solid black;
            margin: 10px;
            position: relative;
            overflow: hidden;
            img{
                position: absolute;
            }

        }
    }
}

</style>
