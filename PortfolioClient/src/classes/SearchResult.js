export default class SearchResult {
    constructor(sData) {
        this.name = sData.name;
        this.type = sData.type;
        this.desc = sData.description;
        this.impDesc = sData.importantDescription;
        this.imgPath = sData.imgPath;
    }

    get Name() { return this.name; }
    get Type() { return this.type; }
    get Desc() { return this.desc; }
    get ImpDesc() { return this.impDesc; }
    get ImgPath() { return this.imgPath; }
}