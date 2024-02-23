const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const Blog = require(`./models/blog`);
const dbUri = `mongodb+srv://hanoun00:hanoun1234@hisoka.yxifnzk.mongodb.net/dbtest?retryWrites=true&w=majority&appName=Hisoka`
             
mongoose.connect(dbUri)
.then(()=> { 
     app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})
.catch((err) => { console.error(err); });



app.set(`view engine`, `ejs`);
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + `/public`));



app.get(`/` , (req , res)=>{//yep
    res.redirect('/blogs');
});

app.get(`/about`,(req,res)=>{
    res.render(`about`,{title:`About`});
})

app.get('/blogs', (req,res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{res.render('index',{title:'All Blogs', blogs:result})})
    .catch((err)=>{console.log(err)})
});

app.post('/blogs',(req,res)=>{
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
        res.redirect('/blogs');
    }).catch((err)=>{
        console.log(err);
    })
})


app.delete( '/blogs/:id' , ( req , res )=>{
    const id=req.params.id;
    Blog.findByIdAndDelete({_id : id})
    .then(()=>{
        res.json({redirect: '/blogs'})
    })
    .catch((err)=> {
        console.log(err)
    });
});



app.get('/blogs/create',(req,res)=>{
        res.render('create', {title:`Create a blog`})
});

app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('details', {title:'Blog Details' , blog: result})
    })
    .catch((err)=>{
        console.log(err);
    })
});


app.get('/single-blog', (req,res)=>{
    Blog.findById()
    .then((result)=>{res.send(result)})
    .catch((err)=>{console.log(err)})
});



app.use(``,(req,res)=>{
    res.status(404).render(`404`,{title: `404`}) ;
});