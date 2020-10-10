export interface MvJob {
    jobId: number;
    organizationId: number;
    jobDescription: string;
    insertPersonId: number;
}

export interface MvAddJob {
    organizationId: number;
    jobDescription: string;
    insertPersonId: number;
}
