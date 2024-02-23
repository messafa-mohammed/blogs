const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const blogRoutes = require(`./routes/blogRoutes`)
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

//Blog routes

app.use(`/blogs`,blogRoutes); //adds the blog route to our application. It's like saying "


app.use(``,(req,res)=>{
    res.status(404).render(`404`,{title: `404`}) ;
});