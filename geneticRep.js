/* Genetic Represenation of the best children from this generation
    (and best parent)
        This includes the Teacher, Room, & Class classes
*/

let teacherTester = 'Sissel';
let repDataTester = [
    {period: 1, class: 'Programming 1', room: '123', coTeacher: null},
    {period: 2, class: 'Programming 1', room: '123', coTeacher: null},
    {period: 4, class: 'Programming 2', room: '123', coTeacher: null},
    {period: 7, class: 'AP Com Sci', room: '121', coTeacher: null},
    {period: 8, class: 'Consumer Ec', room: '128', coTeacher: 'Lynne'}
];
// FIXME: update with the created classes
// Currently [Period, Class, Room, Co-Teacher]


document.getElementById("teacherName").innerHTML = teacherTester;

for(var i = 0 ; i < repDataTester.length ; i++){
    var repDataRows = repDataTester[i];
    
    //Java format, use   document.getElementById(id).innerHTML = ____;
    //System.out.println(repDataRows.period);
    //System.out.println(repDataRows.class);
    //System.out.println(repDataRows.room);
    //System.out.println(repDataRows.coTeacher);
//https://stackoverflow.com/questions/6458128/accessing-javascript-variable-stored-in-an-array
//https://stackoverflow.com/questions/35995273/how-to-run-html-file-using-node-js 
//might help
}
/*
document.getElementById("p1").innerHTML =
document.getElementById("p2").innerHTML =
document.getElementById("p4").innerHTML =
document.getElementById("p7").innerHTML =
document.getElementById("p8").innerHTML =
*/