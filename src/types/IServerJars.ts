export interface IServerJars {
    [serverType: string]: SpecificJar;
}

export interface SpecificJar {
    [version: string]: string;
}

export interface JarVersions {
    project: string;
    versions: string[];
}

export interface BuildList {
    project_id: string;
    project_name: string;
    version: string;
    builds: string[];
}