import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "../../context";
import { mainPath } from "../../routes";

import UserImage from "../../assets/user-image.png";

import "./home.css";

const Home = () => {
  const [opinions] = useState({
    first_row: [
      {
        id: 1,
        content:
          "Adorei a ideia de compartilhar minhas opiniões sobre filmes com outros cinéfilos. A interface é intuitiva e fácil de usar.",
        user_id: 2,
        created_at: new Date("2024-12-11T10:30:00"),
        url_image: "",
        name: "Lucas",
        user: "@lucas",
      },
      {
        id: 2,
        content:
          "A plataforma tem muito potencial, mas às vezes os servidores ficam lentos. Espero que melhorem isso!",
        user_id: 3,
        created_at: new Date("2024-12-11T12:45:00"),
        url_image: "https://example.com/avatar.jpg",
        name: "Mariana",
        user: "@mariana_01",
      },
      {
        id: 3,
        content:
          "Achei incrível a funcionalidade de criar listas personalizadas de filmes. Já recomendei para vários amigos!",
        user_id: 4,
        created_at: new Date("2024-12-10T19:20:00"),
        url_image: "",
        name: "Carlos",
        user: "@carlitos",
      },
      {
        id: 4,
        content:
          "Seria ótimo ter mais filtros para encontrar pessoas com gostos semelhantes. De resto, estou adorando usar a plataforma.",
        user_id: 5,
        created_at: new Date("2024-12-11T15:00:00"),
        url_image: "https://example.com/soul.jpg",
        name: "Beatriz",
        user: "@bia",
      },
    ],
    second_row: [
      {
        id: 5,
        content:
          "A comunidade aqui é incrível! Estou sempre descobrindo novos filmes e séries graças às indicações.",
        user_id: 6,
        created_at: new Date("2024-12-11T22:30:00"),
        url_image: "",
        name: "João",
        user: "@joaozinho",
      },
      {
        id: 6,
        content:
          "A plataforma é boa, mas falta um sistema de notificação mais eficiente. Às vezes perco interações importantes.",
        user_id: 7,
        created_at: new Date("2024-12-10T09:15:00"),
        url_image: "https://example.com/corra.jpg",
        name: "Fernanda",
        user: "@nandinha",
      },
      {
        id: 7,
        content:
          "A possibilidade de comentar e curtir avaliações me deixou viciado! É ótimo ver o que as pessoas pensam.",
        user_id: 8,
        created_at: new Date("2024-12-12T08:00:00"),
        url_image: "",
        name: "Pedro",
        user: "@pedro_gamer",
      },
      {
        id: 8,
        content:
          "O design do site é muito bonito e funcional. Só gostaria de mais opções para personalizar meu perfil.",
        user_id: 9,
        created_at: new Date("2024-12-12T13:40:00"),
        url_image: "https://example.com/duna.jpg",
        name: "Ana",
        user: "@anafilmes",
      },
    ],
  });

  const { user } = useContext(Context);

  return (
    <>
      <div className="container-home">
        <header className="header">
          <div className="left-wrapper">
            <h1>Mosegook</h1>
          </div>
          <div className="right-wrapper">
            <Link to={`/${mainPath}/catalog`}>Catálogo</Link>
            {!user && <Link to={`/${mainPath}/login`}>Entrar</Link>}
            {user && <Link to={`/${mainPath}/timeline`}>Timeline</Link>}
          </div>
        </header>
        <main className="main">
          <div className="info-container">
            <h1>Compartilhe suas opiniões com amigos.</h1>
            <p>
              Aqui você pode compartilhar suas opiniões sobre filmes com
              qualquer pessoa ou amigos. Temos vários títulos famosos.
            </p>
            {!user && (
              <Link to={`/${mainPath}/signup/`}>Começar a avaliar</Link>
            )}
          </div>
          <div
            className="button-next-page"
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight * 1,
                behavior: "smooth",
              })
            }
          >
            <ion-icon name="chevron-down-outline"></ion-icon>
            <ion-icon name="chevron-down-outline"></ion-icon>
            <ion-icon name="chevron-down-outline"></ion-icon>
          </div>
        </main>
      </div>
      <div className="our-advantages">
        <div className="advantages-description">
          <div className="advantages-texts">
            <h1>Motivos para você nos escolher</h1>
            <p>
              Lendo nossas melhores qualidades você irá descobrir que nossa
              plataforma é um ótimo local de discussão sobre filmes.
            </p>
          </div>
          <div
            className="button-next-page"
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight * 2,
                behavior: "smooth",
              })
            }
          >
            <ion-icon name="chevron-down-outline"></ion-icon>
            <ion-icon name="chevron-down-outline"></ion-icon>
            <ion-icon name="chevron-down-outline"></ion-icon>
          </div>
        </div>
        <div className="advantages-itens">
          <div className="advantage">
            <div className="circle-animation green"></div>
            <div className="circle-animation minor green"></div>
            <div className="circle-icon">
              <ion-icon name="people-outline"></ion-icon>
            </div>
            <h2>Comunidade Incrível</h2>
            <p>
              Temo um processo altamente rigoroso para controlar a nossa
              comunidade. Se você achar alguém inprudente poderá nos reportar.
            </p>
          </div>
          <div className="advantage">
            <div className="circle-animation red"></div>
            <div className="circle-animation minor red"></div>
            <div className="circle-icon">
              <ion-icon name="videocam-outline"></ion-icon>
            </div>
            <h2>Milhares de Conteúdos</h2>
            <p>
              Nosso catálogo conta com milhares de filmes para você avaliar.
            </p>
          </div>
          <div className="advantage">
            <div className="circle-animation orange"></div>
            <div className="circle-animation minor orange"></div>
            <div className="circle-icon">
              <ion-icon name="star-outline"></ion-icon>
            </div>
            <h2>Filtro de Avaliações</h2>
            <p>
              Nosso filtro de avaliações é altamente rigoroso com um protocolo
              para que nenhum usuário seja ofendido e a manutenção da ordem.
            </p>
          </div>
        </div>
      </div>
      <div className="we-peoples-about-us">
        <h1>O que as pessoas acham da gente</h1>
        <div className="row">
          {opinions.first_row !== undefined &&
            opinions.first_row.map((opinion) => (
              <div key={opinion.url_image} className="people-avaliations">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="51"
                    height="40"
                    viewBox="0 0 51 40"
                    fill="blueviolet"
                  >
                    <path d="M1.84167 23.1579L16.575 0H24.65L15.1583 20.0702C19.0306 22.0351 20.9667 25.1696 20.9667 29.4737C20.9667 32.2807 19.9278 34.7602 17.85 36.9123C15.7722 38.9708 13.3167 40 10.4833 40C7.46111 40 4.95833 38.9708 2.975 36.9123C0.991667 34.8538 0 32.3743 0 29.4737C0 27.1345 0.613889 25.0292 1.84167 23.1579ZM28.1917 23.1579L42.925 0H51L41.5083 20.0702C45.3806 22.0351 47.3167 25.1696 47.3167 29.4737C47.3167 32.2807 46.2778 34.7602 44.2 36.9123C42.1222 38.9708 39.6667 40 36.8333 40C33.8111 40 31.3083 38.9708 29.325 36.9123C27.3417 34.8538 26.35 32.3743 26.35 29.4737C26.35 27.1345 26.9639 25.0292 28.1917 23.1579Z"></path>
                  </svg>
                  <p>{opinion.content}</p>
                </div>
                <div className="info-people">
                  <img
                    className="people-img"
                    src={UserImage}
                    alt={opinion.user}
                  />
                  <div>
                    <p>{opinion.name}</p>
                    <p>{opinion.user}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="row">
          {opinions.second_row !== undefined &&
            opinions.second_row.map((opinion) => (
              <div key={opinion.id} className="people-avaliations">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="51"
                    height="40"
                    viewBox="0 0 51 40"
                    fill="blueviolet"
                  >
                    <path d="M1.84167 23.1579L16.575 0H24.65L15.1583 20.0702C19.0306 22.0351 20.9667 25.1696 20.9667 29.4737C20.9667 32.2807 19.9278 34.7602 17.85 36.9123C15.7722 38.9708 13.3167 40 10.4833 40C7.46111 40 4.95833 38.9708 2.975 36.9123C0.991667 34.8538 0 32.3743 0 29.4737C0 27.1345 0.613889 25.0292 1.84167 23.1579ZM28.1917 23.1579L42.925 0H51L41.5083 20.0702C45.3806 22.0351 47.3167 25.1696 47.3167 29.4737C47.3167 32.2807 46.2778 34.7602 44.2 36.9123C42.1222 38.9708 39.6667 40 36.8333 40C33.8111 40 31.3083 38.9708 29.325 36.9123C27.3417 34.8538 26.35 32.3743 26.35 29.4737C26.35 27.1345 26.9639 25.0292 28.1917 23.1579Z"></path>
                  </svg>
                  <p>{opinion.content}</p>
                </div>
                <div className="info-people">
                  <img
                    className="people-img"
                    src={UserImage}
                    alt={opinion.user}
                  />
                  <div>
                    <p>{opinion.name}</p>
                    <p>{opinion.user}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="social-media">
        <h1>Visite Nossas Redes Sociais</h1>
        <div className="buttons-social-media">
          <a
            href="https://www.facebook.com/profile.php?id=100066384981305"
            rel="noreferrer"
            target="_blank"
          >
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
          <a
            href="https://twitter.com/mosegook"
            rel="noreferrer"
            target="_blank"
          >
            <ion-icon name="logo-twitter"></ion-icon>
          </a>
          <a
            href="https://www.instagram.com/mosegook/"
            rel="noreferrer"
            target="_blank"
          >
            <ion-icon name="logo-instagram"></ion-icon>
          </a>
        </div>
      </div>
      <footer className="footer">
        <div className="left-container">
          <div>
            <h1>Mosegook</h1>
            <h2>Plataforma de Avaliação de filmes, séries, livros e jogos</h2>
          </div>
          <h2>Mosegook © 2021</h2>
        </div>
      </footer>
    </>
  );
};

export default Home;
