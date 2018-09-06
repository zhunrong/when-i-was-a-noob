class Rock extends Meteor {
    constructor(options) {
        super(options);
        this.color = options.color || ["#200101", "#200701", "#ecd449", "#f87f4b"];
        this.gravity = 0.1;
    }
}