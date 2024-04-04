import type { IServerJars } from "@/types/IServerJars";

export interface CliConfig {
    isJavaInstalled: boolean | null;
    serverJars: IServerJars;
    systemRam: number;
}

export interface cliOptions {
    serverName: string;
    serverJars: string;
    allocated_ram: string;
    auto_restart: boolean;
    eula_accepted: boolean; 
    custom_jar_url: string | null;
    server_platform: string;
    server_version: string | null;
    server_properties: serverProperties;
}

export interface serverProperties {
    server_motd: string;
    server_port: string;
    server_max_players: string;
}