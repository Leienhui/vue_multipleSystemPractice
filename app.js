const express = require('express');
const app = express();
// 对文件名进行处理
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const url = require('url');
// 裁剪
const gm = require('gm')
// 开放静态资源
app.use(express.static('upload'))

app.post('/upPic', (req, res) => {
    // CORS跨域，设置响应头
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST')
    //创建一个formidable表单，这是API文档上面的语句
    const form = formidable({
        multiples: true,
        uploadDir: __dirname + '/upload',
        keepExtensions: true
    });
    //处理上传的请求
    form.parse(req, (err, fields, files) => {
        const base = path.parse(files.pic.path).base
        res.send(base);
    });
});
// 代理跨域
app.post('/api/up', (req, res) => {
    const form = formidable({
        multiples: true,
        uploadDir: __dirname + '/upload',
        keepExtensions: true
    });
    //处理上传的请求
    form.parse(req, (err, fields, files) => {
        const base = path.parse(files.pic.path).base
        res.json({ base })
    })
});
// /api是代理跨域的前缀，写在vue.config.js中
app.get('/api/getdb', (req, res) => {
    // 读取db.txt
    fs.readFile('./db.txt', 'utf-8', (err, result) => {
        console.log(result)
        res.json(JSON.parse(result))
    })
})
// 读取所有文件夹的名字
app.get('/api/folderName', (req, res) => {
    const arr = fs.readFileSync('./db2.txt', 'utf-8')
    res.json(JSON.parse(arr))

})
// 得到文件夹中的图片
app.get('/api/folderPic', (req, res) => {
    const directory = url.parse(req.url, true).query.directory
    // 读取db2.txt
    const arr = fs.readFileSync('./db.txt', 'utf-8')
    const arrObj = JSON.parse(arr)
    res.json(arrObj.filter((item) => { return item.directory == directory || (directory == '未分类图片' || directory == '') && (item.directory == undefined || item.directory == '') }))

})
// 存储db图片资源数据库。点击前端的图片上传组件的step2的确定按钮的时候，进行写数据库的操作。
app.post('/api/addToDb', (req, res) => {
    // 存入小小数据库中db.txt
    // 创建一个formidable表单，这是API文档上面的语句
    const form = formidable({});
    console.log(1111)
    form.parse(req, (err, fields, files) => {
        // 得到POST传来的两个参数，第一个数文件名的数组，第二个是文件夹名字
        const filenamearr = fields.filenamearr;
        const directory = fields.directory;

        // 思路：先打开db.txt，然后改，最后写。
        // 为什么这么麻烦，因为我们没有用MySQL数据库。如果用了MySQL就一句话
        // 注意，因为可能同时有很多文件正在写，所以这里必须是Sync后缀，表示同步。
        // 同步就是排队；不会说一个文件和另一个文件交叉。
        const result = fs.readFileSync('./db.txt');
        var arr = JSON.parse(result.toString());
        // 合并数组
        arr = [...arr, ...filenamearr.map(item => ({
            directory,
            'fileName': item,
            'title': '未命名图片'
        }))];
        // 写
        fs.writeFileSync('./db.txt', JSON.stringify(arr));
        res.send('ok');
    });
});
// 重命名图片
app.post('/api/resetPicName', (req, res) => {
    // 存入小小数据库中db.txt
    // 创建一个formidable表单，这是API文档上面的语句
    const form = formidable({});

    form.parse(req, (err, fields, files) => {
        // 得到POST传来的两个参数，第一个数文件名的数组，第二个是文件夹名字
        const filename = fields.filename;
        const title = fields.title;
        console.log(filename)
        console.log(title)

        // 思路：先打开db.txt，然后改，最后写。
        // 为什么这么麻烦，因为我们没有用MySQL数据库。如果用了MySQL就一句话
        // 注意，因为可能同时有很多文件正在写，所以这里必须是Sync后缀，表示同步。
        // 同步就是排队；不会说一个文件和另一个文件交叉。
        const content = fs.readFileSync('./db.txt');
        var arr = JSON.parse(content.toString());
        // 改
        arr = arr.map(item => item.fileName == filename ? {
            ...item,
            title
        } : item);
        // 写
        fs.writeFileSync('./db.txt', JSON.stringify(arr));
        res.send('ok');
    });
});
app.get('/api/cutPic',(req,res)=>{
    const width = url.parse(req.url, true).query.width
    const height = url.parse(req.url, true).query.height
    const top = url.parse(req.url, true).query.top
    const left = url.parse(req.url, true).query.left
    const originRateNowpic = url.parse(req.url, true).query.originRateNowpic
    // 裁剪图片名称
    const filename = url.parse(req.url, true).query.filename
    gm('./upload/'+filename)
    .crop(width*originRateNowpic, height*originRateNowpic,left*originRateNowpic, top*originRateNowpic )
    .write('./upload/'+filename, function (err) {
      if (!err) res.send('ok');
    });
})
//8080是前端代码，3000是后端代码。
app.listen(3000);