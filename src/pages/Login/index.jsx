import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

import { Context } from "../../context";

import "./login.css";

const Login = () => {
  const mainPath = "projeto-bloco-frontend";
  const navigate = useNavigate();

  const { setUser } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [viewPassword, setViewPassword] = useState(false);

  function handleLogin() {
    if (!email) return toast.error("Informe o email");
    if (!password) return toast.error("Informe a senha");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const findedUser = users.find((user) => user.email === email);

    if (!findedUser) {
      return toast.error("Usuário não encontrado!");
    }

    if (findedUser.password !== password) {
      return toast.error("Senha incorreta!");
    }

    localStorage.setItem("user", JSON.stringify(findedUser));
    setUser(findedUser);
    navigate(`/${mainPath}/timeline`);
  }

  return (
    <div className="container-login">
      <Toaster richColors closeButton theme="dark" position="top-right" />
      <div className="form-container">
        <header>
          <h1>Mosegook</h1>
        </header>
        <div className="form">
          <h1>Bem Vindo!</h1>

          <label htmlFor="input-container">Email</label>
          <div className="input-container">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              type="email"
              placeholder="email@email.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label htmlFor="input-container">Senha</label>
          <div className="input-container">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              type={viewPassword ? "text" : "password"}
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <ion-icon
              name={viewPassword ? "eye-off-outline" : "eye-outline"}
              onClick={() => setViewPassword(!viewPassword)}
            ></ion-icon>
          </div>
          <div className="form-button-container">
            <button onClick={handleLogin}>Entrar</button>
            <Link to={`/${mainPath}/signup`}>
              Não tem uma conta? Cadastre-se
            </Link>
          </div>
        </div>
      </div>
      <div className="social-media-container">
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
    </div>
  );
};

export default Login;
