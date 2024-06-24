"use client";

import { useState, useEffect } from "react";
import { Comment } from "./types"; // Importa los tipos

export default function HomePage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [content, setContent] = useState("");

  async function fetchComments() {
    const res = await fetch("/api/comments");
    const data = await res.json();
    setComments(data);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const res = await fetch("/api/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, age, content }),
    });

    if (res.ok) {
      setName("");
      setAge("");
      setContent("");
      fetchComments(); // Refrescar la lista de comentarios
    }
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <h1>Welcome to the Forum</h1>
      <h2>Spider-man into  the Spider-Verse</h2>
      <p>
        {" "}
        Spider-Man: Un nuevo universo (título original en inglés: Spider-Man:
        Into the Spider-Verse) es una película estadounidense de superhéroes
        animada por computadora de 2018, dirigida por Bob Persichetti, Peter
        Ramsey y Rodney Rothman y escrita por Phil Lord y Rothman. Siendo la
        primera película animada de Spider-Man, 2​ la cinta es una adaptación de
        la línea de cómics Spider-Verse y sigue a Miles Morales, un joven que se
        convierte en el nuevo Spider-Man y se une a otros Spider-People de
        varios universos paralelos para salvar su universo de Kingpin. La
        película cuenta con las voces de Shameik Moore como Miles
        Morales/Spider-Man y Liev Schreiber como el villano Kingpin, junto con
        Jake Johnson, Hailee Steinfeld, Mahershala Ali, Brian Tyree Henry, Lily
        Tomlin, Luna Lauren Vélez, John Mulaney, Kimiko Glenn y Nicolas Cage.
        Fue producida por Sony Pictures Animation y Columbia Pictures en
        asociación con Marvel Entertainment. La banda sonora de la película
        incluye la canción: "Sunflower" de Post Malone y Swae Lee.3​4​ Los
        planes para una película animada de Spider-Man de Phil Lord y
        Christopher Miller se filtraron en 2014 y se anunciaron en abril de
        2015. Persichetti, Ramsey y Rothman se unieron durante los dos años
        siguientes, y Moore y Schreiber fueron elegidos en abril de 2017. Lord y
        Miller querían la película. La película tendrá un estilo único,
        combinando animación por computadora con técnicas tradicionales de
        cómics dibujados a mano inspiradas en el trabajo de la cocreadora de
        Miles Morales, Sara Pichelli. La película requirió hasta 140 animadores,
        el equipo más grande utilizado por Sony Pictures Animation en un
        largometraje. 5​ La película está dedicada a los recuerdos de los
        creadores de Spider-Man, Stan Lee y Steve Ditko, quienes murieron en
        2018. Spider-Man: Into the Spider-Verse se estrenó en el Regency Village
        Theatre de Los Ángeles el 1 de diciembre de 2018 y se estrenó en cines
        en los Estados Unidos el 14 de diciembre. La película recaudó 384,3
        millones de dólares en todo el mundo con un presupuesto de 90 millones
        de dólares y recibió aclamación de la crítica y el público. La película
        ganó el premio a la Mejor Película Animada en la 91.ª edición de los
        Premios de la Academia, siendo la primera película que no pertenece a
        Disney / Pixar en ganar el premio desde Rango (2011) y tuvo un éxito
        similar en la 76.ª edición de los Golden Globe Awards, la 72.ª edición
        de los British Academy Film Awards y la 46.os Premios Annie.{" "}
      </p>

      <h2>Recent Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.commentId}>
            <p>
              <strong>
                {comment.user.name} (Age: {comment.user.age}):
              </strong>{" "}
              {comment.content}
            </p>
            <p>{new Date(comment.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>

      <h2>Leave a Comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Comment:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
