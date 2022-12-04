export declare type SocketEventCallback = [
    message: {
        request: string;
        data: {
            [key: string]: any;
        };
    },
    userId: string,
];
export declare function activateSocketListener(): void;
