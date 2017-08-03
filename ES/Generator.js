/**
 * Created by xiaobxia on 2017/8/3.
 */
function* hellow() {
    yield 'a';
    let b = yield 'b';
    console.log('let b : ', b);
}
let itHellow = hellow();
console.log(itHellow.next());
console.log(itHellow.next());
//let b的值需要由next给出
console.log(itHellow.next('b'));