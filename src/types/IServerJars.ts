export interface IServerJars {
    [serverType: string]: SpecificJar;
}

export interface SpecificJar {
    [version: string]: string;
}