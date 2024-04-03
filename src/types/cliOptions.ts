export interface cliOptions {
    serverName: string | symbol;
    serverJars: string;
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