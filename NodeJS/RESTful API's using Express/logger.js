function log(req, res, next) {
    console.log('Logger...');
    next(); //it ending middleware function
}
