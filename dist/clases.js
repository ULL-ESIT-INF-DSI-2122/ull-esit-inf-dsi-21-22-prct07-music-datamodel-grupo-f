"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biblioteca_musical = exports.Playlist = exports.Artista = exports.Grupo = exports.Autor = exports.Cancion = exports.Album = exports.Genero = void 0;
class Genero {
    constructor(nombre_, autor_, albumes_, canciones_) {
        this.nombre_ = nombre_;
        this.autor_ = autor_;
        this.albumes_ = albumes_;
        this.canciones_ = canciones_;
    }
    find_autor(a) {
        if (typeof this.autor_.find(a1 => a1 == a) === "string")
            return true;
        else
            return false;
    }
    find_album(alNombre) {
        if (typeof this.albumes_.find(al => al == alNombre) === "string")
            return true;
        else
            return false;
    }
    find_cancion(cName) {
        if (typeof this.canciones_.find(c => c == cName) === "string")
            return true;
        else
            return false;
    }
}
exports.Genero = Genero;
class Album {
    constructor(nAlbum_, nAutor_, añoPubli_, generos_, canciones_) {
        this.nAlbum_ = nAlbum_;
        this.nAutor_ = nAutor_;
        this.añoPubli_ = añoPubli_;
        this.generos_ = generos_;
        this.canciones_ = canciones_;
    }
}
exports.Album = Album;
class Cancion {
    constructor(nCancion_, nAutor_, duracion_, genero_, single_, nReprod) {
        this.nCancion_ = nCancion_;
        this.nAutor_ = nAutor_;
        this.duracion_ = duracion_;
        this.genero_ = genero_;
        this.single_ = single_;
        this.nReprod = nReprod;
    }
}
exports.Cancion = Cancion;
class Autor {
    constructor(nombre_, generos_, albumes_, nOyentes_) {
        this.nombre_ = nombre_;
        this.generos_ = generos_;
        this.albumes_ = albumes_;
        this.nOyentes_ = nOyentes_;
    }
    find_gendre(name) {
        if (typeof this.generos_.find(g => g == name) === "string")
            return true;
        else
            return false;
    }
    find_album(name) {
        if (typeof this.albumes_.find(al => al == name) === "string")
            return true;
        else
            return false;
    }
}
exports.Autor = Autor;
class Grupo extends Autor {
    constructor(n, artistas_, ac, g, al, no) {
        super(n, g, al, no);
        this.artistas_ = artistas_;
        this.ac = ac;
    }
}
exports.Grupo = Grupo;
class Artista extends Autor {
    constructor(n, grupos_, g, al, canciones_, no) {
        super(n, g, al, no);
        this.grupos_ = grupos_;
        this.canciones_ = canciones_;
    }
    find_group(name) {
        if (typeof this.grupos_.find(g => g == name) === "string")
            return true;
        else
            return false;
    }
}
exports.Artista = Artista;
class Playlist {
    constructor(nombre_, canciones_, duracion_, generos_) {
        this.nombre_ = nombre_;
        this.canciones_ = canciones_;
        this.duracion_ = duracion_;
        this.generos_ = generos_;
    }
}
exports.Playlist = Playlist;
class Biblioteca_musical {
    constructor() {
        this.generos_ = [];
        this.albums_ = [];
        this.canciones_ = [];
        this.grupos_ = [];
        this.artistas_ = [];
        this.playlists_ = [];
    }
    set_genero(n) {
        this.generos_.push(new Genero(n, [], [], []));
        return true;
    }
    update_genero(g, au, c, al) {
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
    set_artista(n, no, ge) {
        if (ge.every(ge1 => this.generos_.find(ge2 => ge1 == ge2.nombre_))) {
            this.artistas_.push(new Artista(n, [], ge, [], [], no));
            ge.forEach(ge1 => this.update_genero(ge1, n));
            return true;
        }
        else
            return false;
    }
    getOyentesGrupo(nombre) {
        const index = this.grupos_.findIndex(gr => gr.nombre_ == nombre);
        if (index != -1)
            return this.grupos_[index].nOyentes_;
        else
            return 0;
    }
    update_artista(a, ge, gr, al) {
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
    find_artista(nombre) {
        if (this.artistas_.findIndex(n => n.nombre_ == nombre) == -1)
            return false;
        else
            return true;
    }
    set_grupo(n, ac, no, ge, a) {
        if (a.every(a1 => this.find_artista(a1))) {
            this.grupos_.push(new Grupo(n, a, ac, ge, [], no));
            ge.forEach(ge1 => this.update_genero(ge1, n));
            a.forEach(art => this.update_artista(art, ge, n));
            return true;
        }
        else
            return false;
    }
    update_grupo(gr, al) {
        const index = this.grupos_.findIndex(gri => gri.nombre_ == gr);
        if (index != -1) {
            if ((al !== undefined) && (!this.grupos_[index].find_album(al))) { // si pasa un album y no está registrado en el grupo, se mete
                this.grupos_[index].albumes_.push(al);
            }
        }
    }
    set_album(n, a, año) {
        this.albums_.push(new Album(n, a, año, [], []));
        this.update_artista(a, undefined, undefined, n);
        this.update_grupo(a, n);
    }
}
exports.Biblioteca_musical = Biblioteca_musical;
//# sourceMappingURL=clases.js.map