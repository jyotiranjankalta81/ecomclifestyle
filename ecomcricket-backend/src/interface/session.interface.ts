export interface sessionInterface {
    SESSION_ID?: string;
    USERAGENT: string | undefined;
    UERIP: string;
    USERID: number | any;
    SESSION_STATUS: boolean;
}

export interface UpdatesessionInterface {
    USERID: number | any;
    SESSION_STATUS?: boolean;
}