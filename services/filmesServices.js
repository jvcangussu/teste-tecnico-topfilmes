import slugify from "slugify";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDQ5NGRiY2IyNWI3NzRmZjRmYTlkMzVhODNhYmI0NyIsIm5iZiI6MTc0NTM2NTUyNy43NDIsInN1YiI6IjY4MDgyYTE3YWMwMmQ0NDA3YmFiMjRiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GcR-YP_1nyI0hSoJ7sMYL_0CxGu2X7z-AKjbWTImYVw'
  }
};

let filmesTopRated = null;
let filmesEmAlta = null;
let generosFilmes = null;

export async function carregarFilmesTopRated() {
  if (filmesTopRated) return filmesTopRated;
  const urlBase = 'https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=';
  const promises = [];
  for (let i = 1; i <= 13; i++) {
    const url = `${urlBase}${i}`;
    promises.push(fetch(url, options).then(res => res.json()));
  }
  const responses = await Promise.all(promises);
  filmesTopRated = responses.flatMap(res => res.results).slice(0, 250);
  return filmesTopRated;
}

export async function carregarFilmesEmAlta() {
  if (filmesEmAlta) return filmesEmAlta;
  const urlBase = 'https://api.themoviedb.org/3/trending/movie/week?language=pt-BR&page=';
  const promises = [];
  for (let i = 1; i <= 20; i++) {
    const url = `${urlBase}${i}`;
    promises.push(fetch(url, options).then(res => res.json()));
  }
  const responses = await Promise.all(promises);
  filmesEmAlta = responses.flatMap(res => res.results);
  return filmesEmAlta;
}

export async function carregarGeneros() {
  if (generosFilmes) return generosFilmes;
  const url = 'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR';
  const res = await fetch(url, options);
  const json = await res.json();
  generosFilmes = json.genres || [];
  return generosFilmes;
}

export function filmesEmDuasListas(listaFilmes1, listaFilmes2) {
  listaFilmes1 = listaFilmes1.flatMap(filme => filme.id);
  listaFilmes2 = listaFilmes2.flatMap(filme => filme.id)

  const filmesEmAmbos = listaFilmes1.filter(filme => listaFilmes2.includes(filme));
  return filmesEmAmbos;
}

export function buscarFilmePorID(listaFilmes, idBusca) {
  return listaFilmes.find(filme => String(filme.id) === String(idBusca));
}

export function getNomesGeneros(listaGeneros, listaIdGeneros) {
  return listaGeneros.filter(genero => listaIdGeneros.includes(genero.id)).flatMap(genero => genero.name);
}

export function getFilmesGenero(listaFilmes, idGenero) {
  return listaFilmes.filter(filme => filme.genre_ids.includes(idGenero))
}

export function getNotaMediaFilmes(listaFilmes) {
  if (listaFilmes.length === 0) {
    return 0;
  }

  let somaNotas = 0;
  listaFilmes.forEach(filme => {
    somaNotas += filme.vote_average;
  })
  const media = somaNotas / listaFilmes.length;
  return media.toFixed(3);
}

export async function getGeneroPorSlug(slugGenero) {
  const generos = await carregarGeneros();
  const generoEncontrado = generos.find(genero => slugify(genero.name, { lower: true }) === slugGenero);

  return generoEncontrado;
}

export async function getFilmePorSlug(slugFilme) {
  const filmes = await carregarFilmesTopRated();
  const filmeEncontrado = filmes.find(filme => slugify(filme.title, { lower: true, strict: true }) === slugFilme);

  return filmeEncontrado
}

export function getAnosEFilmesPorAno(filmes) {
  let anos = [];
  let filmesPorAno = [];

  filmes.forEach((filme) => {
    const dataLancamento = new Date(filme.release_date);
    const anoLancamento = dataLancamento.getFullYear();
    if (!anos.includes(anoLancamento)) {
      anos.push(anoLancamento);
      filmesPorAno.push(
        {
          ano: anoLancamento,
          listaFilmes: [filme]
        }
      );
    } else {
      const anoEncontrado = filmesPorAno.find(anoNaLista => anoNaLista.ano === anoLancamento);
      anoEncontrado.listaFilmes.push(filme);
    }
  })

  filmesPorAno = filmesPorAno.sort((ano1, ano2) => ano2.ano - ano1.ano);

  return filmesPorAno;
}