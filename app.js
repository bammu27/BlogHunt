const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const _ = require('lodash');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.use(express.static('public'));

let posts = [];

const homecontent = "At [Your Blog Name], we strive to bring you the latest and most exciting content in [your blog's niche]. Our dedicated team of writers and experts are passionate about sharing valuable information, tips, and insights to enhance your knowledge and enrich your life. Join Our Community:We believe in the power of community and the exchange of ideas. Join our vibrant community of [number] passionate readers and contributors. Share your thoughts, ask questions, and connect with like-minded individuals who share your interestsStay in the loop by subscribing to our newsletter. Receive exclusive content, updates on new articles, and special offers straight to your inbox. Don't miss out on the opportunity to be part of our growing community.";

const aboutcontent ="we are dedicated to providing you with valuable information and resources in the [your blog's niche] industry. Our mission is to inspire, educate, and entertain our readers through well-researched articles, engaging stories, and expert insights.";


const contactcontent ="hank you for visiting our blog! If you have any questions, suggestions, or feedback, please feel free to reach out to us using the contact information below:"



app.get('/',(req,res)=>{

  
    res.render('home',{content:homecontent,blog:posts});
    console.log(posts)


})

app.get('/about',(req,res)=>{

    res.render('about',{content:aboutcontent});

})
app.get('/contact',(req,res)=>{


    res.render('contact',{content:contactcontent});

})

app.get('/compose',(req,res)=>{

    res.render('compose')

})

// ...

app.post('/', (req, res) => {
    var postobj = { 'title':_.lowerCase(req.body.title), 'post': req.body.blog };
    posts.push(postobj);
    res.redirect('/')
   
  });
  
  app.get('/posts/:title', (req, res) => {
    const requestedTitle = _.lowerCase(req.params.title);
    let foundPost = null;
  
    posts.forEach((post) => {
      if (_.lowerCase(post.title) === requestedTitle) {
        foundPost = post;
      }
    });
  
    if (foundPost) {
      res.render('post', { title: foundPost.title, singleblog: foundPost.post });
    } else {
      res.send('notfound');
    }
  });
  
  
  // ...
  
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})


