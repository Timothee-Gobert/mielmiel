import React from "react";
import { tabClasses } from "@mui/joy/Tab";
import { Tabs, Tab, TabPanel, TabList } from "@mui/joy";
import GestionArticle from "@/components/admin/GestionArticle";
import GestionClient from "@/components/admin/GestionClient";
import GestionFacture from "@/components/admin/GestionFacture";
import GestionStock from "@/components/admin/GestionStock";
import GestionAchat from "@/components/admin/GestionAchat";

const Admin = () => {
  return (
    <>
      <h1>Dashboard administrateur</h1>
      <Tabs defaultValue={0} sx={{ bgcolor: "transparent" }}>
        <TabList
          disableUnderline
          sx={{
            p: 0.5,
            gap: 0.5,
            borderRadius: "xl",
            bgcolor: "background.level1",

            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: "sm",
              bgcolor: "background.surface",
            },
          }}
        >
          <Tab value={0}>article</Tab>
          <Tab value={1}>client</Tab>
          <Tab value={2}>factures client</Tab>
          <Tab value={3}>achats</Tab>
          <Tab value={4}>stock</Tab>
        </TabList>

        <TabPanel value={0}>
          <GestionArticle />
        </TabPanel>
        <TabPanel value={1}>
          <GestionClient />
        </TabPanel>
        <TabPanel value={2}>
          <GestionFacture />
        </TabPanel>
        <TabPanel value={3}>
          <GestionAchat />
        </TabPanel>
        <TabPanel value={4}>
          <GestionStock />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default Admin;
