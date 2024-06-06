import FormContact from "@/components/formulaires/form_contact/FormContact";
import NosInfo from "@/components/nos_info/NosInfo";
import Link from "next/link";
import React from "react";

const Contact = () => {
  return (
    <>
      <div>
        <h1>Nous contacter</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ padding: "10px" }}>
          <NosInfo />
        </div>
        <FormContact />
      </div>
    </>
  );
};

export default Contact;
