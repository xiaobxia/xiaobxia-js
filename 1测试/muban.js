var aa =  "ll"
function cc(obj) {
    return function () {
        return console.log(obj);
    }
}
var hh = cc(aa);
hh();
aa="bb";
var kk = cc(aa);
hh();
kk();