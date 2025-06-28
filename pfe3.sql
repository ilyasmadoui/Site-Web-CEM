-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3310
-- Généré le : sam. 28 juin 2025 à 23:48
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pfe3`
--

-- --------------------------------------------------------

--
-- Structure de la table `1am1_emplois`
--

CREATE TABLE `1am1_emplois` (
  `jour` varchar(255) DEFAULT NULL,
  `subject1` varchar(255) DEFAULT NULL,
  `subject2` varchar(255) DEFAULT NULL,
  `subject3` varchar(255) DEFAULT NULL,
  `subject4` varchar(255) DEFAULT NULL,
  `subject5` varchar(255) DEFAULT NULL,
  `subject6` varchar(255) DEFAULT NULL,
  `subject7` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `1am1_emplois`
--

INSERT INTO `1am1_emplois` (`jour`, `subject1`, `subject2`, `subject3`, `subject4`, `subject5`, `subject6`, `subject7`) VALUES
('Dimanche', 'Histoire', 'Géographie', '', '', '', '', ''),
('Lundi', '', '', '', '', '', '', ''),
('Mardi', '', '', '', '', '', '', ''),
('Mercredi', '', '', '', '', '', '', ''),
('Jeudi', '', '', '', '', '', '', ''),
('Dimanche', '', '', '', '', '', '', ''),
('Lundi', '', '', '', '', '', '', ''),
('Mardi', '', '', '', '', '', '', ''),
('Mercredi', '', '', '', '', '', '', ''),
('Jeudi', '', '', '', '', '', '', ''),
('Dimanche', '', '', '', '', '', '', ''),
('Lundi', '', '', '', '', '', '', ''),
('Mardi', '', '', '', '', '', '', ''),
('Mercredi', '', '', '', '', '', '', ''),
('Jeudi', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `2am1_emplois`
--

CREATE TABLE `2am1_emplois` (
  `jour` varchar(255) DEFAULT NULL,
  `subject1` varchar(255) DEFAULT NULL,
  `subject2` varchar(255) DEFAULT NULL,
  `subject3` varchar(255) DEFAULT NULL,
  `subject4` varchar(255) DEFAULT NULL,
  `subject5` varchar(255) DEFAULT NULL,
  `subject6` varchar(255) DEFAULT NULL,
  `subject7` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `2am1_emplois`
--

INSERT INTO `2am1_emplois` (`jour`, `subject1`, `subject2`, `subject3`, `subject4`, `subject5`, `subject6`, `subject7`) VALUES
('Dimanche', 'Histoire', '', 'Langue française', 'Langue arabe', 'Langue arabe', '', ''),
('Lundi', '', '', '', '', '', '', ''),
('Mardi', '', '', '', '', 'Langue anglaise', '', ''),
('Mercredi', '', '', '', '', '', '', ''),
('Jeudi', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `4am1_eleves`
--

CREATE TABLE `4am1_eleves` (
  `id_eleves` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `4am1_emplois`
--

CREATE TABLE `4am1_emplois` (
  `jour` varchar(255) DEFAULT NULL,
  `subject1` varchar(255) DEFAULT NULL,
  `subject2` varchar(255) DEFAULT NULL,
  `subject3` varchar(255) DEFAULT NULL,
  `subject4` varchar(255) DEFAULT NULL,
  `subject5` varchar(255) DEFAULT NULL,
  `subject6` varchar(255) DEFAULT NULL,
  `subject7` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `4am1_emplois`
--

INSERT INTO `4am1_emplois` (`jour`, `subject1`, `subject2`, `subject3`, `subject4`, `subject5`, `subject6`, `subject7`) VALUES
('Dimanche', '', '', '', '', '', '', ''),
('Lundi', '', 'Histoire', '', '', '', '', ''),
('Mardi', '', '', '', '', '', '', ''),
('Mercredi', '', '', '', '', '', '', ''),
('Jeudi', '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Structure de la table `4am2_eleves`
--

CREATE TABLE `4am2_eleves` (
  `id_eleves` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `annonces`
--

CREATE TABLE `annonces` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `date_publication` varchar(200) NOT NULL,
  `contenu` text NOT NULL,
  `image` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `annonces`
--

INSERT INTO `annonces` (`id`, `titre`, `date_publication`, `contenu`, `image`) VALUES
(34, '', '2024-05-16', '', 'public\\images\\1715887512141-businessman.png'),
(35, '', '2024-05-16', '', 'public\\images\\1715887522641-user.png'),
(36, '', '2024-05-16', '', 'public\\images\\1715887688889-mother.png'),
(37, '', '2024-05-17', '', 'public\\images\\1715941980479-timetable.png'),
(38, 'kqsjkfsdf', '2024-05-18', 'skjefksljfs', 'public\\images\\1716037663488-director.png'),
(39, 'qsfkljklf', '2024-05-18', 'sdkfjskf', 'public\\images\\1716046384414-bg1.jpg'),
(40, 'scghdgfhkegfkejf', '2024-05-18', 'ehfjkerhfjklehflefefeferfegerg', 'public\\images\\1716046843560-arroba.png'),
(41, 'jhjkhjkh', '2024-05-19', 'hkjhjkhkj', 'public\\images\\1716129639575-date.png');

-- --------------------------------------------------------

--
-- Structure de la table `classestable`
--

CREATE TABLE `classestable` (
  `id_class` int(11) NOT NULL,
  `niveau` varchar(50) DEFAULT NULL,
  `classes` varchar(50) DEFAULT NULL,
  `nbr_musc` int(200) NOT NULL,
  `nbr_feme` int(200) NOT NULL,
  `total_nbr` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `classestable`
--

INSERT INTO `classestable` (`id_class`, `niveau`, `classes`, `nbr_musc`, `nbr_feme`, `total_nbr`) VALUES
(0, '1AM', '1AM1', 1, 0, 1),
(47, '4AM', '4AM1', 1, 1, 9),
(51, '2AM', '2AM1', 0, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `comptes_signup`
--

CREATE TABLE `comptes_signup` (
  `id` int(11) NOT NULL,
  `telph` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nomAr` varchar(255) DEFAULT NULL,
  `nomFr` varchar(255) DEFAULT NULL,
  `prenomFr` varchar(255) DEFAULT NULL,
  `prenomAr` varchar(255) DEFAULT NULL,
  `dateN` date DEFAULT NULL,
  `sex` enum('Male','Female') DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `idProfessionnelle` varchar(50) DEFAULT NULL,
  `adresse` varchar(50) DEFAULT NULL,
  `Wilaya` varchar(255) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `poste` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `comptes_signup`
--

INSERT INTO `comptes_signup` (`id`, `telph`, `email`, `password`, `nomAr`, `nomFr`, `prenomFr`, `prenomAr`, `dateN`, `sex`, `role`, `idProfessionnelle`, `adresse`, `Wilaya`, `school`, `poste`) VALUES
(16356486, '0644446677', 'Mohamed@gmai.com', 'b49c0408d182cefc1da312d31820631b38838baa999cfe067fd4d3231c72957c', 'محمد', 'Mohamed', 'Meklid', 'مقليد', '1990-07-02', 'Male', 2, 'ABCD78', '', 'Alger', 'CEM1', 'Langue arabe'),
(15952276, '0644446688', 'Houas@gmail.com', '503ea04f4300abcc2ac933c3408cfec030ec97546d3bc65f50b3e6ae54fcf86f', 'خديجة', 'Khedidja', 'Houas', 'حواس', '1990-06-02', 'Male', 2, '89867857667', '', 'Oran', 'CEM1', 'Langue englais'),
(15937866, '0644446687', 'Madoui@gmail.com', '33409e3aeb8f06adf13fe2da5d17a74029b76f3a072cd43d7a0fc2fb5d2128a1', 'الياس', 'ilyes', 'madoui', 'ماضوي', '1974-06-12', 'Male', 2, '898675556654', '', 'Biskra', 'CEM2', 'Sciences'),
(43635337, '0655446687', 'Meklid@gmail.com', '645f61ce25e0255c0cc2b7d0d88fdf2dfe00feff812de0a4963682b7dadcdd03', 'أمين', 'Amine', 'Meklid', 'مقليد', '1985-01-30', 'Male', 2, '898678588654', '', 'Biskra', 'CEM2', 'Physiques'),
(64430402, '0644446689', 'mohamed111@gmail.com', 'b49c0408d182cefc1da312d31820631b38838baa999cfe067fd4d3231c72957c', 'أمين', 'Amine', 'Meklid', 'مقليد', '1995-06-07', 'Male', 1, 'ABCD78', '', 'Biskra', 'CEM1', 'Conseiller d\'orientation'),
(69991146, '0644446666', 'anismadoui@gmail.com', '0aa1247ab44773a6c9cff25fbe4ff8034c013ba4701a0b3f28db5d73877610e6', 'أنيس', 'anis', 'madoui', 'ماضوي', '1998-07-10', 'Male', 1, 'ABCD777', '', 'Biskra', 'CEM2', 'Conseiller d\'orientation'),
(22816088, '0644446000', 'ilyasmadoui2020@gmail.com', 'accac2f55260e384706b3533a11c2c5a97f2462626c3866da6efce606d74cddc', 'الياس', 'ilyes', 'madoui', 'ماضوي', '2002-09-09', 'Male', 3, 'ABCD00', 'Alger center', 'Oran', 'CEM2', '');

-- --------------------------------------------------------

--
-- Structure de la table `compte_login`
--

CREATE TABLE `compte_login` (
  `id` int(11) NOT NULL,
  `telph` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nomAr` varchar(255) DEFAULT NULL,
  `nomFr` varchar(255) DEFAULT NULL,
  `prenomFr` varchar(255) DEFAULT NULL,
  `prenomAr` varchar(255) DEFAULT NULL,
  `dateN` varchar(100) DEFAULT NULL,
  `sex` enum('Male','Female') DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `idProfessionnelle` varchar(50) DEFAULT NULL,
  `adresse` varchar(50) DEFAULT NULL,
  `Wilaya` varchar(255) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `poste` varchar(255) DEFAULT NULL,
  `photoProfil` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `compte_login`
--

INSERT INTO `compte_login` (`id`, `telph`, `email`, `password`, `nomAr`, `nomFr`, `prenomFr`, `prenomAr`, `dateN`, `sex`, `role`, `idProfessionnelle`, `adresse`, `Wilaya`, `school`, `poste`, `photoProfil`) VALUES
(0, NULL, 'houas@gmail.com', 'aaaaaaaa', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, ''),
(1, NULL, 'madrassaty@gmail.com', '1f3ce40415a2081fa3eee75fc39fff8e56c22270d1a978a7249b592dcebd20b4', NULL, 'CEM', 'MADRASSATY', NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, 'public\\images\\1717162500657-4k-Wallpaper-A-spectacular-gaming-adventure-with-this-stunning-1536x858.jpg'),
(111, NULL, 'houas@gmail.com', 'aaaaaaaa', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, ''),
(11221, NULL, 'houa1s@gmail.com', 'aaaaaaaa', NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, ''),
(41047819, '0777777777', 'email2003@gmail.com', '1f3ce40415a2081fa3eee75fc39fff8e56c22270d1a978a7249b592dcebd20b4', 'حواس', 'HOUAS', 'Khedidja', 'خديجة', '1990-05-16', 'Female', 1, '11111111111', '', 'Alger', 'CEM1', 'Conseiller d\'orientation', ''),
(44725215, '0777777777', 'FDS@GMAIL.COM', '28cb017dfc99073aa1b47c1b30f413e3ce774c4991eb4158de50f9dbb36d8043', 'ميراد', 'JKHJKH', 'JKHJKH', 'خديجة', '1990-05-16', 'Male', 2, '11111111111', '', 'Adrar', 'Intermediate', 'Arabe', ''),
(48745596, '0777777777', 'email@gmail.com', '28cb017dfc99073aa1b47c1b30f413e3ce774c4991eb4158de50f9dbb36d8043', 'مسعودي', 'keldjkfjkfkdffdksfs', 'JKHJKH', 'مهدي', '1980-05-16', 'Male', 3, '11111111111', 'jjjjjjjjjjjjjj', 'Alger', 'CEM1', '', ''),
(59708976, '0666666666', 'ilyas@gmail.com', 'ea92cb93a250f4637ced717e4219c285169b32639cd7353fdd94c2e3b3b2b718', 'الياس', 'ilyes', 'madoui', 'ماضوي', '1992-05-15', 'Male', 1, 'ABCD78', '', 'Alger', 'CEM2', 'Superviseur pédagogique', 'public\\images\\1717064710302-4k-Wallpaper-A-spectacular-gaming-adventure-with-this-stunning-1536x858.jpg'),
(63198407, '0644446687', 'amine@gmail.com', 'cf4bde40e185934469e6ba5e36df4aea1279c97c193fe26acb45e833fe7eb8e2', 'أمين', 'Amine', 'Meklid', 'مقليد', '1994-05-1', 'Male', 2, '898678576654', '', 'Adrar', 'Intermediate', 'Major Professor', 'public\\images\\1717069397255-45e3ef39a35d41473e7ccd9d3a50f0f4.jpg'),
(81323179, '0644446688', 'email@gmail.com', '0a547d107a24ee77f109c9ac3f287b53afffd69bcaa2e4b9d510d00f9fe61366', 'أمين', 'Amine', 'Meklid', 'مقليد', '1994-05-17', 'Male', 1, 'ABCD78', '', 'Biskra', 'CEM2', 'Conseiller d\'orientation', ''),
(93335352, '0644446680', 'ahmed@gmail.com', 'df8e7c6127e87fb73d95121c1d2928b743cab6296ba2fb77ff3a368c8f895c06', 'أحمد', 'Ahmed', 'Mesaudi', 'مسعودي', '1999-02-01T23:00:00.000Z', 'Male', 2, '898678576654', '', 'Adrar', 'CEM3', 'Mathématiques', ''),
(94286933, '0777777777', 'FDS@GMAIL.COM', 'f2aca93b80cae681221f0445fa4e2cae8a1f9f8fa1e1741d9639caad222f537d', 'حواس', 'HOUAS', 'eeeee', 'سعيد', '1997-05-2', 'Female', 2, '11111111111', '', 'Alger', 'Intermediate', 'Stubed Teacher', ''),
(99072590, '0777777777', 'FZFZ@gmail.com', 'f2aca93b80cae681221f0445fa4e2cae8a1f9f8fa1e1741d9639caad222f537d', 'حواس', 'HOUAS', 'khedidja', 'خديجة', '2024-05-16', 'Female', 2, '11111111111', '', 'Biskra', 'Secondary', 'Stubed Teacher', '');

-- --------------------------------------------------------

--
-- Structure de la table `eleves`
--

CREATE TABLE `eleves` (
  `id_eleve` int(11) NOT NULL,
  `nom_arabe` varchar(255) NOT NULL,
  `nom_francais` varchar(255) NOT NULL,
  `prenom_arabe` varchar(255) NOT NULL,
  `prenom_francais` varchar(255) NOT NULL,
  `date_naissance` varchar(100) DEFAULT NULL,
  `lieu_naissance` varchar(255) DEFAULT NULL,
  `sexe` varchar(20) NOT NULL,
  `section` varchar(255) DEFAULT NULL,
  `niveau` varchar(255) DEFAULT NULL,
  `id_parent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `eleves`
--

INSERT INTO `eleves` (`id_eleve`, `nom_arabe`, `nom_francais`, `prenom_arabe`, `prenom_francais`, `date_naissance`, `lieu_naissance`, `sexe`, `section`, `niveau`, `id_parent`) VALUES
(2634001, 'الحسين', 'ALHUSSEIN', 'محمد', 'Mohamed', '2024-06-15', 'باتنة', 'male', '3AM1', '3AM', 41047819),
(2634002, 'فاطمة', 'FATIMA', 'أحمد', 'Ahmed', '2024-06-20', 'الجزائر', 'female', '3AM1', '3AM', 47593228),
(2634003, 'علي', 'ALI', 'نور', 'Nour', '2024-07-05', 'بجاية', 'male', '4AM1', '4AM', 94286933),
(2634004, 'زينب', 'ZEINAB', 'علي', 'Ali', '2024-07-10', 'قسنطينة', 'female', '4AM1', '4AM', 94286933),
(12345678, 'أحمد', 'AHMED', 'محمد', 'Mohamed', '2023-08-15', 'Alger', 'male', '3AM1', '3AM', 48745596),
(22123131, 'سعيد', 'Ahmed', 'مهدي', 'Ben youcef', '2024-05-01', 'biskra', 'Masculin', '4AM1', '4AM', NULL),
(23743078, 'سعيد', 'SAID', 'مهدي', 'Mahdi', '2024-05-01', 'biskra', 'Masculin', '4AM1', '4AM', NULL),
(24681357, 'علي', 'ALI', 'زهراء', 'Zahra', '2023-04-18', 'Tizi Ouzou', 'male', '3AM1', '3AM', 48745596),
(40227573, 'سعيد', 'SAID', 'مهدي', 'Mahdi', '2024-05-01', 'biskra', 'Masculin', '4AM1', '4AM', NULL),
(56789123, 'فاطمة', 'FATIMA', 'يوسف', 'Youssef', '2022-11-30', 'Constantine', 'female', '4AM1', '4AM', 48745596),
(73516143, 'سعيد', 'SAID', 'مهدي', 'Mahdi', '2024-05-17', 'biskra', 'Masculin', '4AM1', '4AM', NULL),
(80825272, 'حواس', 'HOUAS', 'اكرام', 'Ikram', '2024-05-30', 'biskra', 'femele', '4AM1', '3AM', 48745596),
(82156254, 'حواس', 'HOUAS', 'خديجة', 'Khedidja', '2024-05-23', 'biskra', 'femele', '2AM1', '2AM', 44725215),
(82156255, 'حواس', 'HOUAS', 'هبة', 'Hiba', '2024-05-23', 'biskra', 'female', '4AM1', '4AM', 94286933),
(98765432, 'عبد الرحمن', 'ABDERRAHMANE', 'عائشة', 'Aisha', '2025-01-10', 'Oran', 'male', '1AM1', '1AM', 2313);

-- --------------------------------------------------------

--
-- Structure de la table `eleves_parent_conforme`
--

CREATE TABLE `eleves_parent_conforme` (
  `id_eleve` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `id_parent` int(11) NOT NULL,
  `dateN` date DEFAULT NULL,
  `typeRelation` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `eleves_parent_conforme`
--

INSERT INTO `eleves_parent_conforme` (`id_eleve`, `nom`, `prenom`, `id_parent`, `dateN`, `typeRelation`) VALUES
(22123131, 'Ahmed', 'Ben youcef', 33434352, '2024-05-09', 'Père'),
(22123132, 'malek', 'merad', 33434355, '2024-05-02', 'Père'),
(22123133, 'ilyas', 'maniser', 33434354, '2024-05-03', 'Père'),
(22123136, 'ahmed', 'meklid', 33434355, '2024-05-10', 'Mère'),
(40227573, 'ilyas', 'maniser', 33434352, '2024-06-13', 'Père');

-- --------------------------------------------------------

--
-- Structure de la table `eleve_parent`
--

CREATE TABLE `eleve_parent` (
  `id_parent` int(11) NOT NULL,
  `id_eleve` int(11) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `dateN` date DEFAULT NULL,
  `typeRelation` varchar(50) DEFAULT NULL,
  `Activation` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `eleve_parent`
--

INSERT INTO `eleve_parent` (`id_parent`, `id_eleve`, `nom`, `prenom`, `dateN`, `typeRelation`, `Activation`) VALUES
(33434359, 22123133, 'anis', 'madoui', '2024-06-13', 'Père', 0);

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `email_sender` varchar(255) NOT NULL,
  `email_receiver` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `message` text DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `email_sender`, `email_receiver`, `created_at`, `message`, `file`) VALUES
(1, 'amine@gmail.com', 'ilyasmadoui2020@gmail.com', '2024-06-02 01:27:27', 'hi!!', 'http://localhost:5000/uploads/1717291642376-desktop-wallpaper-persona-5-persona5-persona-5-royal.jpg'),
(2, 'ilyas@gmail.com', 'ilyasmadoui2020@gmail.com', '2024-06-02 05:34:03', 'hi!!', 'http://localhost:5000/uploads/1717306427654-chat1.PNG'),
(3, 'ilyas@gmail.com', 'ilyas@gmail.com', '2024-06-02 05:37:24', 'ilyas', 'http://localhost:5000/uploads/1717306630378-chat1.PNG'),
(4, 'ilyas@gmail.com', 'ilyas@gmail.com', '2024-06-02 05:37:26', 'ilyas', 'http://localhost:5000/uploads/1717306632391-chat1.PNG');

-- --------------------------------------------------------

--
-- Structure de la table `modules`
--

CREATE TABLE `modules` (
  `module` varchar(255) NOT NULL,
  `prof_module` varchar(255) NOT NULL,
  `email_prof` varchar(255) NOT NULL,
  `note_module` float DEFAULT NULL,
  `semestre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `modules`
--

INSERT INTO `modules` (`module`, `prof_module`, `email_prof`, `note_module`, `semestre`) VALUES
('Anglais', 'Dr. Michael Green', 'michael.green@example.com', NULL, 'semestre 04'),
('Arabe', 'Dr. William Lee', 'william.lee@example.com', NULL, 'semestre 04'),
('Français', 'Dr. Sarah White', 'sarah.white@example.com', NULL, 'semestre 04'),
('Histoire et Géographie', 'Dr. John Smith', 'john.smith@example.com', NULL, 'semestre 0'),
('Mathématiques', 'Dr. Emily Johnson', 'emily.johnson@example.com', NULL, 'semestre 04'),
('Musique', 'Dr. Alice Brown', 'alice.brown@example.com', 12, 'semestre 04'),
('Physique', 'Dr. Thomas Brown', 'thomas.brown@example.com', 8.5, 'semestre 04'),
('Sciences', 'Dr. Jennifer Miller', 'jennifer.miller@example.com', NULL, 'semestre 04'),
('Sport', 'Dr. Emma Garcia', 'emma.garcia@example.com', 11, 'semestre 0');

-- --------------------------------------------------------

--
-- Structure de la table `moyennes`
--

CREATE TABLE `moyennes` (
  `id_eleve` int(11) DEFAULT NULL,
  `moyenne` decimal(4,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `moyennes`
--

INSERT INTO `moyennes` (`id_eleve`, `moyenne`) VALUES
(NULL, NULL),
(31454744, 17.02),
(2633007, 11.02),
(80825272, 9.66),
(12345678, 15.00),
(80825272, 9.66),
(12345678, 15.00);

-- --------------------------------------------------------

--
-- Structure de la table `note_modules`
--

CREATE TABLE `note_modules` (
  `id` int(11) NOT NULL,
  `id_eleve` int(11) DEFAULT NULL,
  `nom_arab` varchar(100) DEFAULT NULL,
  `prenom_arab` varchar(100) DEFAULT NULL,
  `interro1` float DEFAULT NULL,
  `interro2` float DEFAULT NULL,
  `control` float DEFAULT NULL,
  `secion` varchar(100) DEFAULT NULL,
  `modules` varchar(100) DEFAULT NULL,
  `semestre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `note_modules`
--

INSERT INTO `note_modules` (`id`, `id_eleve`, `nom_arab`, `prenom_arab`, `interro1`, `interro2`, `control`, `secion`, `modules`, `semestre`) VALUES
(1, 22123131, 'Ahmed', 'Ben youcef', 15, 14, 16, '4AM1', 'Anglais', 'semestre 02'),
(2, 22123131, 'Ahmed', 'Ben youcef', 15.5, 14.2, 16.8, '4AM1', 'Arabe', 'semestre 02'),
(3, 22123131, 'Ahmed', 'Ben youcef', 12, 14.2, 16.8, '4AM1', 'Français', 'semestre 02'),
(4, 22123131, 'Ahmed', 'Ben youcef', 15.5, NULL, 16.8, '4AM1', 'Histoire et Géographie', 'semestre 02'),
(5, 22123131, 'Ahmed', 'Ben youcef', 15.5, 14.2, 16.8, '4AM1', 'Mathématiques', 'semestre 02'),
(6, 22123131, 'Ahmed', 'Ben youcef', 15.5, NULL, 16.8, '4AM1', 'Musique', 'semestre 02'),
(7, 22123131, 'Ahmed', 'Ben youcef', 15.5, 14.2, 16.8, '4AM1', 'Physique', 'semestre 02'),
(8, 22123131, 'Ahmed', 'Ben youcef', 15.5, 14.2, 16.8, '4AM1', 'Sciences', 'semestre 02'),
(9, 22123131, 'Ahmed', 'Ben youcef', NULL, NULL, 16.8, '4AM1', 'Sport', 'semestre 02'),
(10, 22123131, 'Ahmed', 'Ben youcef', 10, 10, 16.8, '4AM1', 'Anglais', 'semestre 03'),
(11, 22123131, 'Ahmed', 'Ben youcef', 11, 11, 16.8, '4AM1', 'Arabe', 'semestre 03'),
(12, 22123131, 'Ahmed', 'Ben youcef', 15.5, 12, 16.8, '4AM1', 'Français', 'semestre 03'),
(13, 22123131, 'Ahmed', 'Ben youcef', 15.5, NULL, 16.8, '4AM1', 'Histoire et Géographie', 'semestre 03'),
(14, 22123131, 'Ahmed', 'Ben youcef', 15.5, 14.2, 16.8, '4AM1', 'Mathématiques', 'semestre 03'),
(15, 22123131, 'Ahmed', 'Ben youcef', 15.5, NULL, 16.8, '4AM1', 'Musique', 'semestre 03'),
(16, 22123131, 'Ahmed', 'Ben youcef', 15.5, 14.2, 16.8, '4AM1', 'Physique', 'semestre 03'),
(17, 22123131, 'Ahmed', 'Ben youcef', 15.5, 14.2, 16.8, '4AM1', 'Sciences', 'semestre 03'),
(18, 22123131, 'Ahmed', 'Ben youcef', NULL, NULL, 16.8, '4AM1', 'Sport', 'semestre 03'),
(19, 22123131, 'Ahmed', 'Ben youcef', 15.5, 14.2, 10, '4AM1', 'Anglais', 'semestre 01'),
(20, 22123131, 'Ahmed', 'Ben youcef', 15.5, 14.2, 16.8, '4AM1', 'Arabe', 'semestre 01'),
(21, 22123131, 'Ahmed', 'Ben youcef', 15.5, 14.2, 16.8, '4AM1', 'Français', 'semestre 01'),
(22, 22123131, 'Ahmed', 'Ben youcef', 15.5, NULL, 16.8, '4AM1', 'Histoire et Géographie', 'semestre 01'),
(23, 22123131, 'Ahmed', 'Ben youcef', 15.5, 14.2, 16.8, '4AM1', 'Mathématiques', 'semestre 01'),
(24, 22123131, 'Ahmed', 'Ben youcef', 15.5, NULL, 16.8, '4AM1', 'Musique', 'semestre 01'),
(25, 22123131, 'Ahmed', 'Ben youcef', 15.5, 14.2, 16.8, '4AM1', 'Physique', 'semestre 01'),
(28, 22123131, 'Ahmed', 'Ben youcef', 10, 9, 19, '4AM1', 'Sciences', 'semestre 01'),
(29, 22123131, 'Ahmed', 'Ben youcef', 5, 0, 13, '4AM1', 'Sport', 'semestre 01'),
(134, 12122131, 'amine', 'amine', 2, 2, 1, '4AM1', 'Sport', 'semestre 01'),
(222, 12345678, 'ilyas', 'madoui', 12, 12, 12, '4AM1', 'Sport', 'semestre 01');

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `id_parent` int(11) DEFAULT NULL,
  `notification` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Titre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `notifications`
--

INSERT INTO `notifications` (`id`, `id_parent`, `notification`, `created_at`, `Titre`) VALUES
(1, 47593228, '\n      Cher parent,\n\n      Bonjour,\n\n      Je tiens à vous informer que votre fils/votre fille أحمد محمد a reçu un  en raison des comportements suivants observés à l\'école :\n\n      Raisons :\n      - Comportements non éthiques et non éducatifs\n- Ne pas prendre de notes ni faire les exercices\n\n      Nous apprécions votre coopération et votre soutien pour résoudre ces problèmes afin de garantir un environnement éducatif positif et approprié pour tous les élèves. Nous espérons que vous discuterez de ces comportements avec votre enfant et que vous travaillerez ensemble pour les corriger et éviter leur répétition à l\'avenir.\n\n      Pour toute question ou pour plus de détails, vous pouvez nous contacter par téléphone ou par e-mail.\n\n      Avec nos salutations distinguées,\n    ', '2024-05-17 10:54:15', 'Descipline'),
(2, 47593228, 'Liste des heures d\'absence:\n          - Élève: حواس kqsdjkqs (ID: 2633007)\n          - Heures d\'absence: 10:00-11:00, 16:00-17:00', '2024-05-18 07:51:15', 'absent'),
(3, 47593228, 'Liste des heures d\'absence:\n          - Élève: الحسين محمد (ID: 2634001)\n          - Heures d\'absence: 16:00-17:00, 09:00-10:00', '2024-05-18 07:51:15', 'Absence'),
(4, 99072590, 'Liste des heures d\'absence:\n          - Élève: فاطمة أحمد (ID: 2634002)\n          - Heures d\'absence: 16:00-17:00, 10:00-11:00, 15:00-16:00', '2024-05-18 07:51:15', 'Absence'),
(5, 94286933, 'Liste des heures d\'absence:\n          - Élève: علي نور (ID: 2634003)\n          - Heures d\'absence: 15:00-16:00', '2024-05-18 07:51:15', 'Absence'),
(6, 44725215, 'Liste des heures d\'absence:\n          - Élève: حواس kqsdjkqs (ID: 2633007)\n          - Heures d\'absence: 08:00-09:00, 14:00-15:00, 15:00-16:00', '2024-05-18 11:14:29', 'Absence'),
(7, 44725215, 'Liste des heures d\'absence:\n          - Élève: حواس kqsdjkqs (ID: 2633007)\n          - Heures d\'absence: 08:00-09:00, 09:00-10:00', '2024-05-18 13:41:12', 'Absence'),
(8, 44725215, 'Liste des heures d\'absence:\n          - Élève: حواس kqsdjkqs (ID: 2633007)\n          - Heures d\'absence: 08:00-09:00, 09:00-10:00, 10:00-11:00, 11:00-12:00', '2024-05-18 13:49:02', 'Absence'),
(9, 44725215, 'Liste des heures d\'absence:\n          - Élève: حواس kqsdjkqs (ID: 2633007)\n          - Heures d\'absence: ', '2024-05-19 12:44:23', 'Absence');

-- --------------------------------------------------------

--
-- Structure de la table `prof`
--

CREATE TABLE `prof` (
  `id_prof` int(11) DEFAULT NULL,
  `classes` varchar(255) DEFAULT NULL,
  `nom_arabe` varchar(255) DEFAULT NULL,
  `nom_francais` varchar(255) DEFAULT NULL,
  `prenom_arabe` varchar(255) DEFAULT NULL,
  `prenom_francais` varchar(255) DEFAULT NULL,
  `date_naissance` varchar(100) DEFAULT NULL,
  `lieu_naissance` varchar(255) DEFAULT NULL,
  `matiere` varchar(255) DEFAULT NULL,
  `sexe` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `prof`
--

INSERT INTO `prof` (`id_prof`, `classes`, `nom_arabe`, `nom_francais`, `prenom_arabe`, `prenom_francais`, `date_naissance`, `lieu_naissance`, `matiere`, `sexe`) VALUES
(63198407, '4AM1,1AM1,  ', 'حواس', 'HOUAS', 'اكرام', 'ikram', '2024-05-29', '', 'Sport', 'Female'),
(99072590, '2AM1,4AM1', 'الياس', 'ilyas', 'ماضوي', 'madoui', '2022-12-01', 'Biskra', 'Français', 'Male'),
(93335352, '', 'أحمد', 'Ahmed', 'Mesaudi', 'مسعودي', '1999-02-01T23:00:00.000Z', NULL, '', 'Male');

-- --------------------------------------------------------

--
-- Structure de la table `sessiontbl`
--

CREATE TABLE `sessiontbl` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sessiontbl`
--

INSERT INTO `sessiontbl` (`session_id`, `expires`, `data`) VALUES
('0Bbmj8Zmx8nAVgutKLxDAoRFIDsdHioP', 1749411081, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:31:21.199Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('Bffjah84RMCRxbpi0sV466qbIxSxlWvV', 1749409753, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:09:13.234Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":69991146,\"role\":1}'),
('FeyaCb1oXyUY3DHVXL_ZXH80A3WARLga', 1749411187, '{\"cookie\":{\"originalMaxAge\":86399999,\"expires\":\"2025-06-08T19:33:06.749Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('GvHbSEtJhm__NMSVVwxd9DdbJeyoAyqb', 1749410711, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:25:10.912Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('IVxvHOEV7_CPFxwiGtboNtlpUuuznpP_', 1749410207, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:16:46.980Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":22816088,\"role\":3}'),
('K5o0J1gUuKdC_Z-aWCKPh-tHu3IifTTp', 1749409903, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:11:42.711Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('TsfT5VMlRRt0OSY3-T1mf0_Vu4yJAZsp', 1749410548, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:22:27.947Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('U9-SjNG_9yNjepCtVoZteLh9gnhU2eK0', 1749411181, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:33:00.554Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('UsWxcpU2NZZAGX4-nbqstYJWYlhkQ2kG', 1749411143, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:32:22.741Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('WavnluEy_P9XKvA851PUyPemGQgghp7J', 1749410924, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:28:44.169Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('X7q6Q4zdCL4Pd3o9NSBH2F68QOLQOUo9', 1749411172, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:32:52.392Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('YiqzpjvDNJu54cW96PXL71wO8Ks2ehMP', 1749410002, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:13:21.795Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('beZ2YHO0IMQh3Qtqg1q-jbrEjm9IZeIZ', 1749409633, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:07:13.360Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('dSStgyTPLwmsIUBngcKUN4lcWTnUwjI7', 1749411035, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:30:35.496Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('driNefMxGSkOQlm6c602iksrFjPJiaDh', 1749409832, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:10:32.416Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('fGQ0N-MSZMxS-TkbzP2fpvqabzTAKw-W', 1749410007, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:13:27.299Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('gh27G0LwVfMvDCfKJHkLgSUBk6ZAhBgO', 1749409769, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:09:29.229Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('hXwayUx_l_2EVoyve0xbJ9qMV7G-SQFX', 1749410618, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:23:38.356Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('l2nVxJnU1piQMoPPzB5FEkRyON4abm9h', 1749410215, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:16:54.755Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('l9Pdk__HmntXukjvkjNNY7_IcdRZd0W3', 1749411135, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:32:14.801Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('vqy9jYuGK22xVu8G53notkUxYbNsMBcq', 1749410727, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:25:26.632Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('xcKszIFdn9MEvd38NrEyAaitRAqI-pTD', 1749410879, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:27:58.757Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}'),
('zknkvRN8EyJ5tItF7vq7GqBnrnthw5eB', 1749411049, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-08T19:30:48.550Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}');

-- --------------------------------------------------------

--
-- Structure de la table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `arabic_name` varchar(255) DEFAULT NULL,
  `french_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `subjects`
--

INSERT INTO `subjects` (`id`, `arabic_name`, `french_name`) VALUES
(1, 'تربية مدنية', 'Éducation civique'),
(2, 'تربية بدنية', 'Éducation physique'),
(3, 'تاريخ', 'Histoire'),
(4, 'جغرافيا', 'Géographie'),
(5, 'علوم الفيزيائية و التكنولوجية', 'Sciences physiques et technologiques'),
(6, 'علوم الطبيعة و الحياة', 'Sciences de la nature et de la vie'),
(7, 'لغة عربية', 'Langue arabe'),
(8, 'لغة انجليزية', 'Langue anglaise'),
(9, 'لغة فرنسية', 'Langue française'),
(10, 'رياضيات', 'Mathématiques');

-- --------------------------------------------------------

--
-- Structure de la table `transfert`
--

CREATE TABLE `transfert` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `ecolePrecedente` varchar(255) NOT NULL,
  `ecoleActuelle` varchar(255) NOT NULL,
  `raison` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `transfert`
--

INSERT INTO `transfert` (`id`, `nom`, `prenom`, `ecolePrecedente`, `ecoleActuelle`, `raison`) VALUES
(2222312, 'Ahmed ', 'Ben youcef', 'CEM Cheikh Bouamama', 'CEM Abdelhamid Ben Badis', 'Raisons familiales'),
(3222211, 'ilyas', 'maniser', 'CEM Cheikh Bouamama', 'CEM Mouloud Feraoun', 'Raisons familiales'),
(3223332, 'Ahmed', 'meklid', 'CEM Abdelhamid Ben Badis', 'CEM Mouloud Feraoun', 'Raisons familiales');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `4am1_eleves`
--
ALTER TABLE `4am1_eleves`
  ADD KEY `id_eleves` (`id_eleves`);

--
-- Index pour la table `4am2_eleves`
--
ALTER TABLE `4am2_eleves`
  ADD KEY `id_eleves` (`id_eleves`);

--
-- Index pour la table `annonces`
--
ALTER TABLE `annonces`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `classestable`
--
ALTER TABLE `classestable`
  ADD PRIMARY KEY (`id_class`);

--
-- Index pour la table `compte_login`
--
ALTER TABLE `compte_login`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `eleves`
--
ALTER TABLE `eleves`
  ADD PRIMARY KEY (`id_eleve`),
  ADD KEY `id_parent` (`id_parent`);

--
-- Index pour la table `eleves_parent_conforme`
--
ALTER TABLE `eleves_parent_conforme`
  ADD PRIMARY KEY (`id_eleve`,`id_parent`),
  ADD UNIQUE KEY `id_eleve` (`id_eleve`);

--
-- Index pour la table `eleve_parent`
--
ALTER TABLE `eleve_parent`
  ADD PRIMARY KEY (`id_parent`,`id_eleve`),
  ADD UNIQUE KEY `id_parent` (`id_parent`,`id_eleve`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `modules`
--
ALTER TABLE `modules`
  ADD PRIMARY KEY (`module`);

--
-- Index pour la table `note_modules`
--
ALTER TABLE `note_modules`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_parent` (`id_parent`);

--
-- Index pour la table `prof`
--
ALTER TABLE `prof`
  ADD UNIQUE KEY `id_prof` (`id_prof`);

--
-- Index pour la table `sessiontbl`
--
ALTER TABLE `sessiontbl`
  ADD PRIMARY KEY (`session_id`);

--
-- Index pour la table `transfert`
--
ALTER TABLE `transfert`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `note_modules`
--
ALTER TABLE `note_modules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=223;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
