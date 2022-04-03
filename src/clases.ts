class Genero{
    constructor(public nombre_: string, public autor_: string[], public albumes_: string[], public canciones_: string[]){}

    public find_autor(a: string): boolean{
        if(typeof this.autor_.find(a1 => a1 == a) === "string")
            return true;
        else
            return false;
    }

    public find_album(alNombre: string): boolean {
        if (typeof this.albumes_.find(al => al == alNombre) === "string")
            return true;
        else 
            return false;
    }

    public find_cancion(cName: string): boolean {
        if (typeof this.canciones_.find(c => c == cName) === "string")
            return true;
        else 
            return false;
    }
}

class Album {
    constructor(public nAlbum_: string, public nAutor_: string, public añoPubli_: number, public generos_: string[], public canciones_: string[]){}
}

export class Cancion{
    constructor(public nCancion_: string, public nAutor_: string, public duracion_: number, public genero_: string[], public single_: boolean, public nReprod: number){}
}

abstract class Autor {
    constructor(public nombre_: string, public generos_: string[], public albumes_: string[], public nOyentes_: number){}

    public find_gendre(name: string) {
        if (typeof this.generos_.find(g => g == name) === "string")
            return true;
        else 
            return false;
    }

    public find_album(name: string) {
        if (typeof this.albumes_.find(al => al == name) === "string")
            return true;
        else 
            return false;        
    }
}

class Grupo extends Autor {
    constructor(n: string, public artistas_: string[], public ac: number, g: string[], al: string[], no: number){
        super(n,g,al,no);
    }
}

class Artista extends Autor{
    constructor(n: string, public grupos_: string[], g: string[], al: string[], public canciones_: string[], no: number){
        super(n, g, al, no);
    }

    public find_group(name: string) {
        if (typeof this.grupos_.find(g => g == name) === "string")
            return true;
        else 
            return false; 
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

    set_genero(n: string): boolean{
        this.generos_.push(new Genero(n,[],[],[]));
        return true;
    }

    
    update_genero(g: string, au?: string, c?: string, al?: string){
        const index = this.generos_.findIndex(g1 => g1.nombre_ == g);
        if (index !== -1) {
            if ((au !== undefined) && (!this.generos_[index].find_autor(au)))
                this.generos_[index].autor_.push(au);  
            if ((c !== undefined) && (!this.generos_[index].find_cancion(c)))
                this.generos_[index].canciones_.push(c); 
            if ((al !== undefined) && (!this.generos_[index].find_album(al)))
                this.generos_[index].albumes_.push(al); 
        }
    }
    
    
    set_artista(n: string, no: number, ge: string[]): boolean{
        if(ge.every(ge1 => this.generos_.find(ge2 => ge1 == ge2.nombre_))){
            this.artistas_.push(new Artista(n,[],ge,[],[],no));
            ge.forEach(ge1 => this.update_genero(ge1,n));
            return true;
        } else
        return false;
    }

    getOyentesGrupo(nombre: string): number {
        const index = this.grupos_.findIndex(gr => gr.nombre_ == nombre);
        if (index != -1)
            return this.grupos_[index].nOyentes_;
        else 
            return 0;
    }
    
    update_artista(a: string, ge?: string[], gr?: string, al?: string) {
        const index = this.artistas_.findIndex(art => art.nombre_ == a);
        if (index !== -1) {
            if (ge !== undefined) {
                ge.forEach(g1 => this.artistas_[index].find_gendre(g1) ? true : this.artistas_[index].generos_.push(g1));
                ge.forEach(g2 => this.update_genero(g2, this.artistas_[index].nombre_));
            }
            if ((gr !== undefined) && (!this.artistas_[index].find_group(gr))) {
                this.artistas_[index].grupos_.push(gr);
                this.artistas_[index].nOyentes_ += this.getOyentesGrupo(gr); 
            }
            if ((al !== undefined) && (!this.artistas_[index].find_album(al))) {
                this.artistas_[index].albumes_.push(al);
            }
        }
    }

    find_artista(nombre: string): boolean {
        if (this.artistas_.findIndex(n => n.nombre_ == nombre) == -1)
            return false;
        else 
            return true;
    }
    
    set_grupo(n: string, ac: number, no: number, ge: string[], a: string[]): boolean{
        if(a.every(a1 => this.find_artista(a1))){   
            this.grupos_.push(new Grupo(n,a,ac,ge,[],no));
            ge.forEach(ge1 => this.update_genero(ge1, n));
            a.forEach(art => this.update_artista(art, ge, n));
            return true;
        } else
            return false;
    }

    update_grupo(gr: string, al?: string) {
        const index = this.grupos_.findIndex(gri => gri.nombre_ == gr);
        if (index != -1) {
            if ((al !== undefined) && (!this.grupos_[index].find_album(al))){ // si pasa un album y no está registrado en el grupo, se mete
                this.grupos_[index].albumes_.push(al);
            }
        }
    }

    set_album(n: string, a: string, año: number){
        this.albums_.push(new Album(n,a,año,[],[]));
        this.update_artista(a, undefined, undefined, n);
        this.update_grupo(a, n);
    }
}