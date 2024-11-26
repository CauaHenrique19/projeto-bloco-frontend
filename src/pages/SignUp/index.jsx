import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { v4 as uuid } from "uuid";

import { Context } from "../../context";

import "./signup.css";

const Signup = () => {
  const mainPath = "projeto-bloco-frontend";
  const navigate = useNavigate();

  const { setUser } = useContext(Context);

  const [name, setName] = useState("");
  const [user, setUserSignup] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");

  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  function handleSignup() {
    if (!name) return toast.error("Informe o nome!");
    if (!user) return toast.error("Informe o user!");
    if (!email) return toast.error("Informe o email!");
    if (!password) return toast.error("Informe a senha!");
    if (!confirmPassword) return toast.error("Confirme a senha!");
    if (!gender) return toast.error("Informe o seu sexo!");

    if (password !== confirmPassword)
      return toast.error("As senhas não coincidem!");

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length) {
      const userExistsWithUser = users.find((u) => u.user === user);
      if (userExistsWithUser)
        return toast.error("Já existe um usuário com esse user!");

      const userExistsWithEmail = users.find((u) => u.email === email);
      if (userExistsWithEmail)
        return toast.error("Já existe um usuário com esse email!");
    }

    const userToCreate = {
      id: uuid(),
      name,
      user,
      email,
      password,
      gender,
      biography: null,
      avaliations: [],
      comments: [],
      following_count: 0,
      followers_count: 0,
    };

    const existentUsers = JSON.parse(localStorage.getItem("users")) || [];
    localStorage.setItem(
      "users",
      JSON.stringify([...existentUsers, userToCreate])
    );
    localStorage.setItem("user", JSON.stringify(userToCreate));

    setUser(userToCreate);
    navigate(`/${mainPath}/timeline`);
  }

  return (
    <div className="container-signup">
      <Toaster richColors closeButton theme="dark" position="top-right" />
      <div className="form-container">
        <header>
          <h1>Mosegook</h1>
        </header>
        <div className="form">
          <div className="inputs-form">
            <h1>Você está muito perto de começar!</h1>
            <div className="form-row">
              <div>
                <label htmlFor="input-container">Nome</label>
                <div className="input-container">
                  <ion-icon name="person-outline"></ion-icon>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="input-container">User</label>
                <div className="input-container">
                  <ion-icon name="at-outline"></ion-icon>
                  <input
                    type="text"
                    onChange={(e) => setUserSignup(e.target.value)}
                    placeholder="Seu user"
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div>
                <label htmlFor="input-container">Email</label>
                <div className="input-container">
                  <ion-icon name="mail-outline"></ion-icon>
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="input-container">Senha</label>
                <div className="input-container">
                  <ion-icon name="lock-closed-outline"></ion-icon>
                  <input
                    type={viewPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                  />
                  <ion-icon
                    name={viewPassword ? "eye-off-outline" : "eye-outline"}
                    onClick={() => setViewPassword(!viewPassword)}
                  ></ion-icon>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div>
                <label htmlFor="input-container">Confirme sua senha</label>
                <div className="input-container">
                  <ion-icon name="lock-closed-outline"></ion-icon>
                  <input
                    type={viewConfirmPassword ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme sua senha"
                  />
                  <ion-icon
                    name={
                      viewConfirmPassword ? "eye-off-outline" : "eye-outline"
                    }
                    onClick={() => setViewConfirmPassword(!viewConfirmPassword)}
                  ></ion-icon>
                </div>
              </div>
              <div>
                <label htmlFor="input-container">Qual seu sexo?</label>
                <div className="input-container">
                  <ion-icon name="transgender-outline"></ion-icon>
                  <select onChange={(e) => setGender(e.target.value)}>
                    <option value="">Escolha seu sexo</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-button-container">
              <button onClick={handleSignup}>Cadastrar</button>
              <Link to={`/${mainPath}/login`}>Já tem uma conta?Entre aqui</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
