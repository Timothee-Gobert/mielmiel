import executerSelectRequete from "../executerSelectRequete";

async function sqlSelectArticles(typeArticle: string) {
  return await executerSelectRequete({
    table: "article",
    clauseWhere: `${typeArticle}`,
  });
}
export default sqlSelectArticles;
