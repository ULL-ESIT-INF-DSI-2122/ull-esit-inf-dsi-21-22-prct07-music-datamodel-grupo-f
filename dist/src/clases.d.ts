export declare class Genero {
    nombre_: string;
    autor_: string[];
    albumes_: string[];
    canciones_: string[];
    constructor(nombre_: string, autor_: string[], albumes_: string[], canciones_: string[]);
    find_autor(a: string): boolean;
    find_album(alNombre: string): boolean;
    find_cancion(cName: string): boolean;
}
export declare class Album {
    nAlbum_: string;
    nAutor_: string;
    añoPubli_: number;
    generos_: string[];
    canciones_: string[];
    constructor(nAlbum_: string, nAutor_: string, añoPubli_: number, generos_: string[], canciones_: string[]);
}
export declare class Cancion {
    nCancion_: string;
    nAutor_: string;
    duracion_: number;
    genero_: string[];
    single_: boolean;
    nReprod: number;
    constructor(nCancion_: string, nAutor_: string, duracion_: number, genero_: string[], single_: boolean, nReprod: number);
}
export declare abstract class Autor {
    nombre_: string;
    generos_: string[];
    albumes_: string[];
    nOyentes_: number;
    constructor(nombre_: string, generos_: string[], albumes_: string[], nOyentes_: number);
    find_gendre(name: string): boolean;
    find_album(name: string): boolean;
}
export declare class Grupo extends Autor {
    artistas_: string[];
    ac: number;
    constructor(n: string, artistas_: string[], ac: number, g: string[], al: string[], no: number);
}
export declare class Artista extends Autor {
    grupos_: string[];
    canciones_: string[];
    constructor(n: string, grupos_: string[], g: string[], al: string[], canciones_: string[], no: number);
    find_group(name: string): boolean;
}
export declare class Playlist {
    nombre_: string;
    canciones_: string[];
    duracion_: number;
    generos_: string[];
    constructor(nombre_: string, canciones_: string[], duracion_: number, generos_: string[]);
}
export declare class Biblioteca_musical {
    private generos_;
    private albums_;
    private canciones_;
    private grupos_;
    private artistas_;
    private playlists_;
    constructor();
    set_genero(n: string): boolean;
    update_genero(g: string, au?: string, c?: string, al?: string): void;
    set_artista(n: string, no: number, ge: string[]): boolean;
    getOyentesGrupo(nombre: string): number;
    update_artista(a: string, ge?: string[], gr?: string, al?: string): void;
    find_artista(nombre: string): boolean;
    set_grupo(n: string, ac: number, no: number, ge: string[], a: string[]): boolean;
    update_grupo(gr: string, al?: string): void;
    set_album(n: string, a: string, año: number): void;
}
