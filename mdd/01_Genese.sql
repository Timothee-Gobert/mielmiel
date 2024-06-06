SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema miels_gobert
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `miels_gobert` ;
USE `miels_gobert` ;

-- -----------------------------------------------------
-- Table `miels_gobert`.`article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `miels_gobert`.`article` (
  `article_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(255) NOT NULL,
  `designation` VARCHAR(255) NOT NULL,
  `poids` SMALLINT UNSIGNED NULL,
  `prix` DECIMAL(6,2) NULL,
  `annee_production` YEAR NULL,
  `quantite` MEDIUMINT UNSIGNED NULL,
  PRIMARY KEY (`article_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `miels_gobert`.`adresse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `miels_gobert`.`adresse` (
  `adresse_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `adresse_complete` VARCHAR(255) NOT NULL,
  `complement_adresse` VARCHAR(255) NULL,
  `code_postal` VARCHAR(20) NOT NULL,
  `commune` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`adresse_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `miels_gobert`.`client`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `miels_gobert`.`client` (
  `client_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `prenom` VARCHAR(255) NOT NULL,
  `mail` VARCHAR(255) NOT NULL,
  `numero_telephone` VARCHAR(20) NULL,
  `mdp` VARCHAR(256) NULL,
  `adresse_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`client_id`),
  INDEX `fk_client_adresse_idx` (`adresse_id` ASC) VISIBLE,
  UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE,
  CONSTRAINT `fk_client_adresse`
    FOREIGN KEY (`adresse_id`)
    REFERENCES `miels_gobert`.`adresse` (`adresse_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `miels_gobert`.`moyen_de_paiement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `miels_gobert`.`moyen_de_paiement` (
  `moyen_de_paiement_id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `moyen` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`moyen_de_paiement_id`),
  UNIQUE INDEX `moyen_UNIQUE` (`moyen` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `miels_gobert`.`statut`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `miels_gobert`.`statut` (
  `statut_id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `statut` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`statut_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `miels_gobert`.`commande`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `miels_gobert`.`commande` (
  `commande_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `client_id` INT UNSIGNED NOT NULL,
  `adresse_id` INT UNSIGNED NOT NULL,
  `moyen_de_paiement_id` TINYINT UNSIGNED NOT NULL,
  `statut_statut_id` TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (`commande_id`),
  INDEX `fk_commande_client1_idx` (`client_id` ASC) VISIBLE,
  INDEX `fk_commande_adresse1_idx` (`adresse_id` ASC) VISIBLE,
  INDEX `fk_commande_moyen_de_paiement1_idx` (`moyen_de_paiement_id` ASC) VISIBLE,
  INDEX `fk_commande_statut1_idx` (`statut_statut_id` ASC) VISIBLE,
  CONSTRAINT `fk_commande_client1`
    FOREIGN KEY (`client_id`)
    REFERENCES `miels_gobert`.`client` (`client_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_commande_adresse1`
    FOREIGN KEY (`adresse_id`)
    REFERENCES `miels_gobert`.`adresse` (`adresse_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_commande_moyen_de_paiement1`
    FOREIGN KEY (`moyen_de_paiement_id`)
    REFERENCES `miels_gobert`.`moyen_de_paiement` (`moyen_de_paiement_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_commande_statut1`
    FOREIGN KEY (`statut_statut_id`)
    REFERENCES `miels_gobert`.`statut` (`statut_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `miels_gobert`.`commande_article`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `miels_gobert`.`commande_article` (
  `commande_id` INT UNSIGNED NOT NULL,
  `article_id` INT UNSIGNED NOT NULL,
  `quantite` VARCHAR(45) NULL,
  INDEX `fk_commande_article_commande1_idx` (`commande_id` ASC) VISIBLE,
  INDEX `fk_commande_article_article1_idx` (`article_id` ASC) VISIBLE,
  PRIMARY KEY (`commande_id`, `article_id`),
  CONSTRAINT `fk_commande_article_commande1`
    FOREIGN KEY (`commande_id`)
    REFERENCES `miels_gobert`.`commande` (`commande_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_commande_article_article1`
    FOREIGN KEY (`article_id`)
    REFERENCES `miels_gobert`.`article` (`article_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `miels_gobert`.`fournisseur`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `miels_gobert`.`fournisseur` (
  `fournisseur_id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`fournisseur_id`),
  UNIQUE INDEX `nom_UNIQUE` (`nom` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `miels_gobert`.`achat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `miels_gobert`.`achat` (
  `achat_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `montant` DECIMAL(7,2) NOT NULL,
  `description` TEXT NULL,
  `fournisseur_id` SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY (`achat_id`),
  INDEX `fk_achat_fournisseur1_idx` (`fournisseur_id` ASC) VISIBLE,
  CONSTRAINT `fk_achat_fournisseur1`
    FOREIGN KEY (`fournisseur_id`)
    REFERENCES `miels_gobert`.`fournisseur` (`fournisseur_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `miels_gobert`.`stock`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `miels_gobert`.`stock` (
  `stock_id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `produit` VARCHAR(255) NOT NULL,
  `quantite` MEDIUMINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`stock_id`),
  UNIQUE INDEX `produit_UNIQUE` (`produit` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
