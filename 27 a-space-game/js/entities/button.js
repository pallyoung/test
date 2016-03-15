Button.prototype = new Entity();
Button.prototype.constructor = Button;

function Button() {
    this.gameScreen;
    this.text;
    this.sizeY = 50;
    this.mouseOver = false;
    this.clickCallback;

    this.Update = function (time) {
    }

    this.Draw = function () {

        ctx.beginPath();
        if (this.mouseOver)
            ctx.fillStyle = '#438CDB';
        else
            ctx.fillStyle = '#194D85';
        ctx.strokeStyle = '#B6D3F1';
        ctx.lineWidth = 2;
        ctx.fillRect(this.posX, this.posY, this.sizeX, this.sizeY);
        ctx.strokeRect(this.posX, this.posY, this.sizeX, this.sizeY);
        ctx.closePath();

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

    this.onMouseMove = function (evt) {
        mouseCurrentX = evt.pageX - canvasPosX;
        mouseCurrentY = evt.pageY - canvasPosY;
        this.mouseOver = (this.CollidesWithPixel(mouseCurrentX, mouseCurrentY));
    }

    this.onMouseUp = function (evt) {
        mouseCurrentX = evt.pageX - canvasPosX;
        mouseCurrentY = evt.pageY - canvasPosY;
        if (this.CollidesWithPixel(mouseCurrentX, mouseCurrentY)) {
            this.clickCallback();
        }
    }
    

}

