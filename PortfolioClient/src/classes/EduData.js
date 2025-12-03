export default class EduData { 
    constructor(eTitle,school,eDesc,sDate,eDate,photo = "",schoolLink = "") {
        if(!sDate instanceof Date || !eDate instanceof Date) {
            throw new Error("Invalid date(s) provided");
        }
        if(eDate < sDate){
            throw new Error("EndDate is earlier than StartDate");
        }

        this.educationTitle = eTitle;
        this.school = school;
        this.educationDesc = eDesc;
        this.startDate = sDate;
        this.endDate = eDate;
        this.photo = photo;
        this.schoolLink = schoolLink;
    }
    get EducationTitle() {
        return this.educationTitle;
    }
    get School() {
        return this.school;
    }
    get EducationDesc() {
        return this.educationDesc;
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
    get SchoolLink() {
        return this.schoolLink;
    }
}