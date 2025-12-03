export default class AddExpData { 
    constructor(eName,oName,eDesc,sDate,eDate,photo = "",companyLink = "") {
        if(!sDate instanceof Date || !eDate instanceof Date) {
            throw new Error("Invalid date(s) provided");
        }
        if(eDate < sDate){
            throw new Error("EndDate is earlier than StartDate");
        }

        this.experienceName = eName;
        this.organizationName = oName;
        this.experienceDesc = eDesc;
        this.startDate = sDate;
        this.endDate = eDate;
        this.photo = photo;
    }
    get ExperienceName() {
        return this.experienceName;
    }
    get OrganizationName() {
        return this.organizationName;
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
}