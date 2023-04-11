class Item {
    static id = 0;

    constructor(text) {
        this.text = text;
        this.id = Item.id++;
        this.done = false;
    }
}

export default Item;
