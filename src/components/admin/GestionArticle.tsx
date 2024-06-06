import DrawIcon from "@mui/icons-material/Draw";
import {
  Autocomplete,
  Box,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import { toNumber } from "lodash";
import React, { useEffect, useState } from "react";
import Bouton from "../utils/Bouton";
import CloseIcon from "@mui/icons-material/Close";
import FormArticle from "../formulaires/form_article/FormArticle";
import CreateIcon from "@mui/icons-material/Create";
import useTrigger from "@/hooks/useTrigger";
import sqlSelectArticles from "@/services/sql/article/sqlSelectArticles";

type labelType = "article_id" | "type" | "designation" | "poids" | "prix" | "annee_production" | "quantite";

interface FormatColonneType {
  label: string;
  width?: number;
  align?: "right" | "center" | "left" | "inherit" | "justify" | undefined;
  format?: string;
}

interface ColonnesType {
  article_id: FormatColonneType;
  type: FormatColonneType;
  designation: FormatColonneType;
  poids: FormatColonneType;
  prix: FormatColonneType;
  annee_production: FormatColonneType;
  quantite: FormatColonneType;
  action: FormatColonneType;
}

const proprietesDesColonnes: ColonnesType = {
  article_id: {
    label: "Article ID",
    width: 30,
    align: "center",
  },
  type: {
    label: "Type",
    width: 30,
    align: "right",
    format: "string",
  },
  designation: {
    label: "Désignation",
    width: 200,
    align: "left",
  },
  poids: {
    label: "Poids",
    width: 200,
    align: "left",
  },
  prix: {
    label: "Prix",
    width: 30,
    format: "number",
  },
  annee_production: {
    label: "Année",
    width: 30,
  },
  quantite: {
    label: "Quantité",
  },
  action: {
    label: "Action",
  },
};

export interface DataType {
  article_id: number;
  type: string;
  designation: string;
  poids: number;
  prix: number;
  annee_production: number;
  quantite: number;
}

export default function ColumnGroupingTable() {
  const articleVide: DataType = {
    type: "",
    article_id: 0,
    designation: "",
    poids: null as unknown as number,
    prix: null as unknown as number,
    annee_production: null as unknown as number,
    quantite: null as unknown as number,
  };
  const [data, setData] = useState([]);
  const [comboBoxValue, setComboBoxValue] = useState(
    `type = "Vinaigre" or type = "Hydromel" or type = "Confiserie" or type = "Patisserie" or type = "Miel"`
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<DataType>(articleVide);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    boxShadow: 24,
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeFiltreType = (e: React.SyntheticEvent<Element, Event>) => {
    if ((e.target as any).textContent === "") {
      setComboBoxValue(`type = "Vinaigre" or type = "Hydromel" or type = "Confiserie" or type = "Patisserie" or type = "Miel"`);
    } else {
      setComboBoxValue(`type = "${(e.target as any).textContent}"`);
    }
    setPage(0);
  };

  const premierIndexAAfficher = page * rowsPerPage;

  const trigger = useTrigger();

  useEffect(() => {
    async function RecupererLesProduits() {
      const reponseAPI: any = await sqlSelectArticles(comboBoxValue);
      setData(reponseAPI);
    }
    RecupererLesProduits();
  }, [comboBoxValue, trigger]);

  function fermerModal() {
    setOpenModal(false);
    setDataModal(articleVide);
  }

  return (
    <>
      <Autocomplete
        onChange={(e) => handleChangeFiltreType(e)}
        options={["Miel", "Vinaigre", "Hydromel", "Patisserie", "Confiserie"]}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Type" />}
        blurOnSelect
      />
      <Bouton onClick={() => setOpenModal(true)} label={"Ajouter"}>
        <CreateIcon />
      </Bouton>

      <Paper sx={{ margin: "0 15px" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {Object.values(proprietesDesColonnes).map((column: any, index) => (
                  <TableCell key={index} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(premierIndexAAfficher, premierIndexAAfficher + rowsPerPage)
                .map((ligneArticle: DataType, indexLigne) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={indexLigne}>
                    {Object.keys(ligneArticle).map((celluleArticle, indexCellule) => (
                      <TableCell key={indexCellule} align={proprietesDesColonnes[celluleArticle as labelType]?.align}>
                        {proprietesDesColonnes[celluleArticle as labelType]?.format === "number"
                          ? toNumber(ligneArticle[celluleArticle as labelType]).toFixed(2)
                          : ligneArticle[celluleArticle as labelType]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Bouton
                        onClick={() => {
                          setOpenModal(true);
                          setDataModal(ligneArticle);
                        }}
                        label={"Modifier"}
                      >
                        <DrawIcon />
                      </Bouton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          labelRowsPerPage={"Nombre de lignes par page"}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from: premiereLigne, to: derniereLigne, count: nombreLignesTotal }) => {
            return `Ligne${
              premiereLigne === derniereLigne ? "" : "s"
            } ${premiereLigne} à ${derniereLigne} sur ${nombreLignesTotal}`;
          }}
        />
      </Paper>
      <Modal open={openModal} onClose={fermerModal}>
        <Box sx={styleModal}>
          <div>
            <IconButton onClick={fermerModal} size="medium">
              <CloseIcon />
            </IconButton>
          </div>
          <div>
            <FormArticle article={dataModal} />
          </div>
        </Box>
      </Modal>
    </>
  );
}
