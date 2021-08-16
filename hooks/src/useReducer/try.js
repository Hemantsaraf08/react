let a=10
function b(){
    let x=30;
    console.log(a);
    function c(){
        console.log(x, a)
    }
    return c;
}
let catchedfn=b();
function va(catchedfn){
    var x=5
    console.log("inside va")
    catchedfn();
}
va(catchedfn);
