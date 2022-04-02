class Genero{
    constructor(public nombre_: string, public autor_: string[], public albumes_: string[], public canciones_: string[]){}
}

class Album {
    constructor(public nAlbum_: string, public nAutor_: string, public añoPubli_: number, public generos_: string[], public canciones_: string[]){}
}

export class Cancion{
    constructor(public nCancion_: string, public nAutor_: string, public duracion_: number, public genero_: string[], public single_: boolean, public nReprod: number){}
}

class Autor {
    constructor(public nombre_: string, public añoCreacion: number, public generos_: string[], public albumes_: string[], public nOyentes_: number){}
}

class Grupo extends Autor {
    constructor(n: string, public artistas_: string[], ac: number, g: string[], al: string[], no: number){
        super(n,ac,al,g,no);
    }
}

class Artista extends Autor{
    constructor(n: string, public grupos_: string[], ac: number, g: string[], al: string[], no: number){
        super(n,ac,al,g,no);
    }
}

class Playlist{
    constructor(public nombre_: string, public canciones_: string[], public duracion_: number, public generos_: string[]){}
}

class Biblioteca_musical{
    private generos_: Genero[];
    private albums_: Album[];
    private canciones_: Cancion[];
    private grupos_: Grupo[];
    private artistas_: Artista[];
    private playlists_: Playlist[];

    constructor(){
        this.generos_ = [];
        this.albums_ = [];
        this.canciones_ = [];
        this.grupos_ = [];
        this.artistas_ = [];
        this.playlists_ = [];
    }

    set_genero(n: string){
        this.generos_.push(new Genero(n,[],[],[]));
    }

    set_album(n: string, a: string, año: number, g: string[], c: string[]){
        this.albums_.push(new Album(n,a,año,g,c));

        if(!this.artistas_.find(x => x.nombre_ == a)){
            if(!this.grupos_.find(x => x.nombre_ == a)){
                this.artistas_.push(); 

                ////
            }
        }
    }
}