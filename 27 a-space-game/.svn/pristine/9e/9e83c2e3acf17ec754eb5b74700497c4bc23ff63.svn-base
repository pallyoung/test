function Entity() {
    this.posX;
    this.posY;
    this.sizeX;
    this.sizeY;
    this.velX; // velocity
    this.velY;
    this.targetX;
    this.targetY;
    this.direction;

    this.Draw = function () { }

    this.Update = function () { }

    this.CollidesWith = function (other) {
        if (
            this.posX + this.sizeX >= other.posX
            && this.posX <= other.posX + other.sizeX
            && this.posY + this.sizeY >= other.posY
            && this.posY <= other.posY + other.sizeY
            )
            return true;
        else
            return false;
    }

    this.CollidesWithPixel = function (x,y) {
        if (
            x >= this.posX
            && x <= this.posX + this.sizeX
            && y >= this.posY
            && y <= this.posY + this.sizeY
            )
            return true;
        else
            return false;
    }
}
