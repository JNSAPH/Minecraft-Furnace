import type { IServerJars } from "@/types/IServerJars";

export interface CliConfig {
    isJavaInstalled: boolean | null;
    serverJars: IServerJars;
    systemRam: number;
}

export interface cliOptions {
    serverName: string | symbol;
    serverJars: string;
    systemRam: string | symbol;
    eula_accepted: boolean | symbol; 
    custom_jar_url: string | symbol | null;
    server_platform: string | symbol;
    server_version: string | symbol | null;
    server_properties: serverProperties;
}

export interface serverProperties {
    server_motd: string;
    server_port: string;
    server_max_players: string;
}