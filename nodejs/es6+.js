async function b(){
    console.log(1);
}
a().finally(() => {
    console.log('finally');
})