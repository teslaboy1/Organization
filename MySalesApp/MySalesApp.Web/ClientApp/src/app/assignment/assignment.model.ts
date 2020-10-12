export interface MvAssignment {
    assignmentId: number;
    employeeId: number;
    jobId: number;
    status: string;
    insertPersonId: number;
}

export interface MvAddAssignment {
    employeeId: number;
    jobId: number;
    status: string;
    insertPersonId: number;
}
