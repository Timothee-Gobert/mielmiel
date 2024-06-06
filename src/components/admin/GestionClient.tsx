// import DrawIcon from "@mui/icons-material/Draw";
// import {
//   Autocomplete,
//   Box,
//   FormControl,
//   FormHelperText,
//   FormLabel,
//   IconButton,
//   Input,
//   Modal,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   TextField,
// } from "@mui/material";
// import { toNumber } from "lodash";
// import React, { useEffect, useState } from "react";
// import Bouton from "../utils/Bouton";
// import CloseIcon from "@mui/icons-material/Close";
// import FormArticle from "../formulaires/form_article/FormArticle";
// import CreateIcon from "@mui/icons-material/Create";
// import useTrigger from "@/hooks/useTrigger";
// import sqlSelectArticles from "@/services/sql/article/sqlSelectArticles";

// type labelType = "article_id" | "type" | "designation" | "poids" | "prix" | "annee_production" | "quantite";

// interface FormatColonneType {
//   label: string;
//   width?: number;
//   align?: "right" | "center" | "left" | "inherit" | "justify" | undefined;
//   format?: string;
// }

// interface ColonnesType {
//   article_id: FormatColonneType;
//   type: FormatColonneType;
//   designation: FormatColonneType;
//   poids: FormatColonneType;
//   prix: FormatColonneType;
//   annee_production: FormatColonneType;
//   quantite: FormatColonneType;
//   action: FormatColonneType;
// }

// const proprietesDesColonnes: ColonnesType = {
//   article_id: {
//     label: "Article ID",
//     width: 30,
//     align: "center",
//   },
//   type: {
//     label: "Type",
//     width: 30,
//     align: "right",
//     format: "string",
//   },
//   designation: {
//     label: "Désignation",
//     width: 200,
//     align: "left",
//   },
//   poids: {
//     label: "Poids",
//     width: 200,
//     align: "left",
//   },
//   prix: {
//     label: "Prix",
//     width: 30,
//     format: "number",
//   },
//   annee_production: {
//     label: "Année",
//     width: 30,
//   },
//   quantite: {
//     label: "Quantité",
//   },
//   action: {
//     label: "Action",
//   },
// };

// export interface DataType {
//   client_id: number;
//   nom: string;
//   prenom: string;
//   mail: string;
//   numero_telephone: number;
//   adresse_id: number;
// }

// export default function GestionClient() {
//   const articleVide: DataType = {
//     client_id: 0,
//     nom: "",
//     prenom: "",
//     mail: "",
//     numero_telephone: null as unknown as number,
//     adresse_id: null as unknown as number,
//   };
//   const [data, setData] = useState([]);
//   const [searchBarValue, setSearchBarValue] = useState("");
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);
//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };
//   const styleModal = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     bgcolor: "white",
//     boxShadow: 24,
//   };
//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleChangeFiltreType = (e: React.SyntheticEvent<Element, Event>) => {
//     if ((e.target as any).textContent === "") {
//       setSearchBarValue(`nom LIKE "%" `);
//     } else {
//       setSearchBarValue(`nom LIKE "%${(e.target as any).textContent}%"`);
//     }
//     setPage(0);
//   };

//   const premierIndexAAfficher = page * rowsPerPage;

//   const trigger = useTrigger();

//   useEffect(() => {
//     async function RecupererLesProduits() {
//       const reponseAPI: any = await sqlSelectArticles(searchBarValue);
//       setData(reponseAPI);
//     }
//     RecupererLesProduits();
//   }, [searchBarValue, trigger]);

//   return (
//     <>
//       <FormControl>
//         <FormLabel>Recherche</FormLabel>
//         <Input onChange={(e) => handleChangeFiltreType(e)} placeholder="ex : Gobert" />

//         <FormHelperText>Recherche par nom ou prénom.</FormHelperText>
//       </FormControl>

//       <Paper sx={{ margin: "0 15px" }}>
//         <TableContainer sx={{ maxHeight: 600 }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow>
//                 {Object.values(proprietesDesColonnes).map((column: any, index) => (
//                   <TableCell key={index} align={column.align}>
//                     {column.label}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data.slice(premierIndexAAfficher, premierIndexAAfficher + rowsPerPage).map((ligneClient: DataType, indexLigne) => (
//                 <TableRow hover role="checkbox" tabIndex={-1} key={indexLigne}>
//                   {Object.keys(ligneClient).map((celluleClient, indexCellule) => (
//                     <TableCell key={indexCellule} align={proprietesDesColonnes[celluleClient as labelType]?.align}>
//                       {proprietesDesColonnes[celluleClient as labelType]?.format === "number"
//                         ? toNumber(ligneClient[celluleClient as labelType])
//                         : ligneClient[celluleClient as labelType]}
//                     </TableCell>
//                   ))}
//                   <TableCell>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={data.length}
//           labelRowsPerPage={"Nombre de lignes par page"}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           labelDisplayedRows={({ from: premiereLigne, to: derniereLigne, count: nombreLignesTotal }) => {
//             return `Ligne${
//               premiereLigne === derniereLigne ? "" : "s"
//             } ${premiereLigne} à ${derniereLigne} sur ${nombreLignesTotal}`;
//           }}
//         />
//       </Paper>
//     </>
//   );
// }
