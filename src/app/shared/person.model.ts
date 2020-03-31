export class Person {
    professorId: number;
    login: string;
    password: string;
    firstname: string;
    lastname: string;
    studentClass: {
        studentClassId: number;
        name: string;
    };
}
