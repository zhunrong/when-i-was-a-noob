require.config({
    baseUrl: 'js/',
    paths: {
        Bird: 'roles/Bird',
        Land: 'roles/Land',
        Pipe: 'roles/Pipe',
        Score: 'roles/Score',
        Sky: 'roles/Sky',
        FlappyBird: 'FlappyBird',
        util: 'util'
    }
});
require(['FlappyBird','util'], function (FlappyBird,util) {
    var flappyBird = new FlappyBird({
        imgLoad: util.imgLoad,
        getContext: util.getContext,
        selector: 'body'
    });
    flappyBird.init();
})