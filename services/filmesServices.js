const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDQ5NGRiY2IyNWI3NzRmZjRmYTlkMzVhODNhYmI0NyIsIm5iZiI6MTc0NTM2NTUyNy43NDIsInN1YiI6IjY4MDgyYTE3YWMwMmQ0NDA3YmFiMjRiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GcR-YP_1nyI0hSoJ7sMYL_0CxGu2X7z-AKjbWTImYVw'
  }
};

export async function carregarFilmesTopRated() {
  const urlBase = 'https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=';
  const promises = [];

  for (let i = 1; i <= 13; i++) {
    const url = `${urlBase}${i}`;
    promises.push(
      fetch(url, options).then(async res => {
        const json = await res.json();
        if (!res.ok || json.success === false) {
          console.error("Erro ao buscar página", i, json);
        }
        return json;
      })
    );
  }

  const responses = await Promise.all(promises);
  const filmes = responses.flatMap(res => res.results).slice(0, 250);
  return filmes;
}

export async function carregarFilmesEmAlta() {
  const urlBase = 'https://api.themoviedb.org/3/trending/movie/week?language=pt-BR&page=';
  const promises = [];

  for (let i = 1; i <= 20; i++) {
    const url = `${urlBase}${i}`;
    promises.push(
      fetch(url, options).then(async res => {
        const json = await res.json();
        if (!res.ok || json.success === false) {
          console.error("Erro ao buscar página", i, json);
        }
        return json;
      })
    );
  }

  const responses = await Promise.all(promises);
  const emAlta = responses.flatMap(res => res.results);
  return emAlta;
}

export function filmesEmDuasListas(listaFilmes1, listaFilmes2) {
  listaFilmes1 = listaFilmes1.flatMap(filme => filme.id);
  listaFilmes2 = listaFilmes2.flatMap(filme => filme.id)

  const filmesEmAmbos = listaFilmes1.filter(filme => listaFilmes2.includes(filme));
  return filmesEmAmbos;
}