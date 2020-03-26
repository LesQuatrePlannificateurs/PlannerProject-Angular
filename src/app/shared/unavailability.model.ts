export class Unavailability {

  id: number;
  nameIndispo : string;
  start : string;
  end : string;
  professor : { professorId : number};
  classroom : { classroomId : number };
  equipment : { equipmentId : number };
  studentClass : { studentClassId : number };
}
