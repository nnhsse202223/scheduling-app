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

//console.log(repDataTester);
// This version lists it out in the same way that repDataTester is currently formatted above

for(var i = 0 ; i < repDataTester.length ; i++){
    var repDataRows = repDataTester[i];
    console.log(`Period: ` + repDataRows.period + `\tClass: ` + repDataRows.class + `\tRoom: ` + repDataRows.room
        + `\tCo-Teacher Name: ` + repDataRows.coTeacher);
}