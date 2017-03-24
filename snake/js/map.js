function Map(mapContainerSelector) {
    this.mapView = [];
    this.mapContainer = document.querySelector(mapContainerSelector);
    this.createMap = function () {
        for (var i = 0; i < 100; i++) {
            this.mapView[i] = [];
            for (var j = 0; j < 100; j++) {
                this.mapView[i][j] = document.createElement('li');
                this.mapContainer.appendChild(this.mapView[i][j]);
            }
        }
    }
    this.createFood=function(){
        var row = Math.floor(Math.random() * 100);
        row = row > 99 ? 99 : row;
        var col = Math.floor(Math.random() * 100);
        col = col > 99 ? 99 : col;
        if (this.mapView[row][col].classList.contains('snake')) {
            this.createFood();
            return;
        }
        this.mapView[row][col].classList.add('food');
    }
    this.initial=function(){
        this.createMap();
        this.createFood();
    }
}