import FormLogin from "@/components/formulaires/form_login/FormLogin";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <>
      <div>
        <h1>Se connecter</h1>
      </div>
      <div>
        <FormLogin />
      </div>

      <div>
        <li>
          <Link href="/login/creer_compte">Creer nouveau compte</Link>
        </li>
        <li>
          <Link href="/login/reinitialiser_mdp">Mot de passe oublié</Link>{" "}
        </li>
      </div>
    </>
  );
};

export default Login;
