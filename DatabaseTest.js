
class DatabaseTest
{
    constructor()
    {
        this.myRoomArray;
        this.myTeacherArray;
        this.myClassArray;

        this.room1 = Room("FACS", 129);
        this.room2 = Room("FACS", 130);
        this.room3 = Room("Tech", 121);
        this.teacher1 = Teacher("AgentP", "FACS");
        this.teacher2 = Teacher("AngelP","FACS");
        this.teacher3 = Teacher("Schmitt", "Tech");
        this.class1 = Classes("Senior_Foods", "FACS");
        this.class2 = Classes("Junior_Foods", "FACS");
        this.class3 = Classes("Software Engineering 1/2", "Tech");

        this.myRoomArray = [room1, room2, room3];
        this.myTeacherArray = [teacher1, teacher2, teacher3];
        this.myClassArray = [class1, class2, class3];
    }
}