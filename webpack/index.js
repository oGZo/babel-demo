Promise.resolve(1).then(() => {
    console.log('origin promise');
}).finally(() => {
    console.log('finally');
})
a = 1n;
import('./async.js').then(() => {
    console.log(1);
})