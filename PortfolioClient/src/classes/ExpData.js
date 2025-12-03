export default class ExpData { 
    constructor(eName,cName,eDesc,sDate,eDate,photo = "",companyLink = "") {
        if(!sDate instanceof Date || !eDate instanceof Date) {
            throw new Error("Invalid date(s) provided");
        }
        if(eDate < sDate){
            throw new Error("EndDate is earlier than StartDate");
        }

        this.experienceName = eName;
        this.companyName = cName;
        this.experienceDesc = eDesc;
        this.startDate = sDate;
        this.endDate = eDate;
        this.photo = photo;
        this.companyLink = companyLink;
    }
    get ExperienceName() {
        return this.experienceName;
    }
    get CompanyName() {
        return this.companyName;
    }
    get ExperienceDesc() {
        return this.experienceDesc;
    }
    get StartDate() {
        return this.startDate;
    }
    get EndDate() {
        return this.endDate;
    }
    get Photo() {
        return this.photo;
    }
    get CompanyLink() {
        return this.companyLink;
    }
}