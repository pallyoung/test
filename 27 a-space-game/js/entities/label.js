Label.prototype = new Label();
Label.prototype.constructor = Button;

function Label() {
    this.text;

    this.Update = function (time) {
    }

    this.Draw = function () {

        // draw text
        ctx.textAlign = 'center';
        ctx.font = 'bold 24px Kelly Slab';

        ctx.fillStyle = '#000';
        ctx.fillText(this.text, this.posX + this.sizeX / 2 + 1, this.posY + this.sizeY / 2 + 8);
        ctx.fillText(this.text, this.posX + this.sizeX / 2 - 1, this.posY + this.sizeY / 2 + 8);
        ctx.fillText(this.text, this.posX + this.sizeX / 2, this.posY + this.sizeY / 2 + 8 + 1);
        ctx.fillText(this.text, this.posX + this.sizeX / 2, this.posY + this.sizeY / 2 + 8 - 1);

        ctx.fillStyle = '#eee';
        ctx.fillText(this.text, this.posX + this.sizeX / 2, this.posY + this.sizeY / 2 + 8);
    }
}

