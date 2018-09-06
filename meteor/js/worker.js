onmessage = function (e) {
    var data = e.data;
    var obj = data.obj;
    console.log(+new Date());
    console.log('worker', data);
    obj.a++;
    postMessage({
        obj: obj
    });
}