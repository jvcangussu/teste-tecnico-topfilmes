export default function FilmesPage({ params }) {
  return (
    <main>
      <p>Página do filme {params.slugFilme}</p>
    </main>
  );
}