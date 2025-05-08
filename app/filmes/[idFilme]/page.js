export default async function FilmesPage({ params }) {

  const { idFilme } = await params;

  return (
    <main>
      <p>Página do filme {idFilme}</p>
    </main>
  );
}