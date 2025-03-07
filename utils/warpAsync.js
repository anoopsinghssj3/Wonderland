// function wrapAsync(fn) {
//     return function (err, req, res, next) {
//         fn(err, req, res, next).catch(next);
//     }
// }

// module.exports = wrapAsync;

//wrong version of wrapasync
// module.exports = (fn) => {
//     return (err, req, res, next)=> {
//         fn(err, req, res, next).catch(next);
//     }
// }


module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}