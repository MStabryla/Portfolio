export default class RepoData { 
    constructor(repoData) {
        this.id = repoData.id;
        this.name = repoData.name;
        this.url = repoData.url;
        this.default_branch = repoData.default_branch;
        this.img_url = repoData.imgUrl;
        this.updated_at = new Date(Date.parse(repoData.updatedAt));
        this.updated_at = this.updated_at.toLocaleDateString();
        this.created_at = new Date(Date.parse(repoData.createdAt));
        this.created_at = this.created_at.toLocaleDateString();
        this.visible = repoData.visible;
        this.tags = repoData.tags;
        this.desc = repoData.readme;
    }
    get Id() { return this.id; }
    get Name() { return this.name; }
    get Url() { return this.url; }
    get Default_branch() { return this.default_branch; }
    get Img_url() { return this.img_url; }
    get Created_at() { return this.created_at; }
    get Updated_at() { return this.updated_at; }
    get Visible() { return this.visible; }
    get Tags() { return this.tags; }
    get DescPl() { return this.descPl; }
    get DescEn() { return this.descEn; }
}