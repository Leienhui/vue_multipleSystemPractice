<template>
    <div>
        <!-- enctype:指定form的编码格式 -->
        <!-- application/x-www-form-urlencoded:表示用多媒体编码 -->
        <!-- action提交的网址 -->
        <!-- method:提交方式 -->
        <form enctype="multipart/form-data" action="http://127.0.0.1:3000/upPic" method="post">
        <input type="file" name="pic">
        <button type="submit">提交</button>
        </form>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

</style>
