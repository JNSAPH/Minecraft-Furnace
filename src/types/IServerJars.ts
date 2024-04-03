export interface IServerJars {
    [serverType: string]: {
        [version: string]: string;
    };
}