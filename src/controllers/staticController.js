module.exports ={
    index(req,res,next){
        res.render("static/index", {title:"The Coin Life"});
    },

    about(req,res,next){
        res.render("static/about",{title:"About Us"});
    }
}