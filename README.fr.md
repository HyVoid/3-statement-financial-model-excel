[ 🌐 عربي ](README.ar.md) | [ 🇩🇪 Deutsch ](README.de.md) | [ 🇫🇷 Français ](README.fr.md) | [ 🇳🇱 Nederlands ](README.nl.md) | [ 🇪🇸 Español ](README.sp.md) | [ 🇬🇧 English ](README.md)

# Modèle Excel de prévision financière à trois états & de planification par scénarios
<img width="1349" height="790" alt="image" src="https://github.com/user-attachments/assets/22ff1c9b-e352-4578-b01d-716b4fb2a52f" />


[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE) [![Platform](https://img.shields.io/badge/Platform-Browser%20%2B%20Excel-informational.svg)](README.md) [![Tool Type](https://img.shields.io/badge/Tool-FP&A%20Financial%20Decision%20Support-success.svg)](README.md)

**Vous cherchez un modèle Excel de prévision financière à trois états robuste ?** Ce **modèle financier opérationnel** réutilisable connecte votre pipeline commercial, les revenus récurrents SaaS, la capacité de livraison opérationnelle, le fonds de roulement net et la gestion de la dette en une **projection financière à trois états** unifiée (compte de résultat, bilan et tableau de flux de trésorerie). Conçu comme une alternative évolutive aux logiciels FP&A d’entreprise complexes.

> **Version navigateur :** Calculateur en ligne gratuit. Sans inscription. Sans installation.
> **Version Excel :** Classeur FP&A payant, avec une **garantie de remboursement de 30 jours sans question**. Conçu pour des prévisions glissantes mensuelles répétées, l’analyse d’écarts hors ligne, les archives financières permanentes et les pistes d’audit pour les investisseurs.
>
> **[🌐 Essayez le calculateur en ligne gratuit du modèle financier à trois états]** → [Planificateur de scénarios interactif sur le Web](https://hyvoid.github.io/3-statement-financial-model-excel/)
> 
> **[📥 Téléchargez le modèle Excel de projection financière réutilisable]** → [Classeur FP&A hors ligne déverrouillé et sans macro (.xlsx)](https://theseusworkshop.com/l/bsrbzf?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=3-statement-financial-model)

---

## Points de douleur FP&A fréquents & solutions de modélisation financière

Ce modèle de prévision financière est conçu pour répondre aux questions exactes que se posent les directeurs financiers et les opérationnels lorsque la croissance opérationnelle doit se traduire en flux de trésorerie financièrement durable :

* **Point de douleur : MRR / ARR SaaS imprévisibles** 
  * **Solution (fidélisation des revenus récurrents) :** Modélisez automatiquement l’évolution de votre base de clients actifs à partir des taux d’attrition par cohorte, des probabilités de renouvellement et des hypothèses de services récurrents.
* **Point de douleur : pipeline commercial et prévision de revenus déconnectés** 
  * **Solution (conversion du pipeline de projets) :** Calculez exactement comment les prospects CRM se transforment en opportunités qualifiées, commandes gagnées, valeur contractuelle enregistrée et revenus de projets reconnus, avec des délais intégrés.
* **Point de douleur : angles morts dans la planification des ressources et des capacités**
  * **Solution (gestion de la capacité de livraison) :** Testez si votre charge opérationnelle projetée peut réellement être absorbée par votre effectif actuel en équivalents temps plein (ETP) et vos heures de livraison standard.
* **Point de douleur : projections d’EBITDA et de rentabilité imprécises**
  * **Solution (suivi des revenus, du COGS et de l’OpEx) :** Reliez directement l’activité opérationnelle sous-jacente au compte de résultat mensuel pour visualiser les marges brutes réelles et l’EBITDA.
* **Point de douleur : tensions de trésorerie dues au fonds de roulement**
  * **Solution (dynamique de pression sur le fonds de roulement) :** Visualisez comment les créances clients (délai client AR), les dettes fournisseurs (délai fournisseur AP), la rotation des stocks et les travaux en cours (WIP) absorbent ou libèrent la trésorerie d’exploitation.
* **Point de douleur : service de la dette et planification de liquidité mal gérés**
  * **Solution (structuration de la liquidité et de la dette) :** Intégrez les tirages d’emprunt, les échéanciers de remboursement du principal, les charges d’intérêts et les mouvements de trésorerie nets directement dans le bilan et le tableau de flux de trésorerie.

Le résultat central n’est pas un tableau de bord de plus – c’est une **chaîne causale transparente entre une décision opérationnelle quotidienne et sa conséquence financière à long terme**.

---

## Tutoriel de démarrage rapide : comment construire votre prévision financière

Ce modèle met fin au cycle de reconstruction constante de tableurs à partir de zéro. Suivez ce tutoriel étape par étape pour un flux de prévision **« configurer une fois, actualiser périodiquement »**.

### Étape 1 : définir les hypothèses financières clés (configuration du modèle)
Ouvrez l’onglet central `Control & Assumptions` pour configurer les paramètres qui pilotent vos projections financières :
* Définissez la date de début de prévision et l’horizon de projection (par exemple 12 mois, 24 mois glissants).
* Basculez entre les scénarios financiers **Base / Haut / Bas**.
* Saisissez l’attrition récurrente, les hypothèses de renouvellement MRR et les taux de conversion de l’entonnoir commercial.
* Définissez votre calendrier de reconnaissance des revenus (courbe de réalisation WIP) et les heures de livraison standard par ETP.
* Saisissez vos jours de fonds de roulement (DSO, DPO, DIO) et les conditions d’intérêt du financement par emprunt.

### Étape 2 : saisir les inducteurs opérationnels (vos données existantes)
Chargez les données opérationnelles brutes que vous suivez déjà dans votre système CRM ou ERP :
* Effectifs actuels de la base de clients récurrents.
* Prospects de projets mensuels en haut d’entonnoir et tailles moyennes d’affaires.
* Effectif opérationnel d’ouverture et valeurs d’ouverture du bilan.
* Facilités de crédit existantes et hypothèses CapEx.

### Étape 3 : générer les projections financières à trois états (automatisé)
Observez le modèle traduire automatiquement vos inducteurs opérationnels en résultats financiers standard via le pipeline intégré :
**Pipeline commercial → Commandes enregistrées → Reconnaissance des revenus → Capacité ETP → COGS/OpEx → Dynamique du fonds de roulement → Service de la dette → Trois états financiers**

### Étape 4 : exécuter l’analyse de scénarios et exporter votre modèle Excel
Comparez les résultats Base, Haut et Bas. Recherchez les pénuries de capacité, les pièges d’absorption de trésorerie par le fonds de roulement ou les violations de covenants de dette. Ajustez une hypothèse et observez instantanément l’effet d’entraînement sur les flux de trésorerie.

> **[📥 Téléchargez le modèle Excel complet à trois états](https://theseusworkshop.com/l/bsrbzf?utm_source=github&utm_medium=GitHub%20README&utm_campaign=readme%20new%20launch&utm_content=3-statement-financial-model)** pour construire des scénarios personnalisés, effectuer un suivi mensuel des écarts hors ligne et conserver un fichier de travail permanent pour votre équipe financière.

---

## Pourquoi la modélisation opérationnelle intégrée bat les tableurs de compte de résultat basiques

La plupart des prévisions financières échouent avant même que l’équipe FP&A ne termine la génération des trois états. La cause première est la déconnexion des données amont.

Un directeur commercial prévoit une croissance agressive du chiffre d’affaires. Les opérations supposent que l’équipe peut la livrer. La finance reconnaît le revenu immédiatement, ce qui rend l’EBITDA très attrayant. Mais la séquence chronologique réelle est bien plus stricte :

```text
Lead → Qualified Opportunity → Quoted Project → Won Order → Delivery Workload 
→ WIP / Progress → Recognized Revenue (ASC 606) → Accounts Receivable → Cash Collection

```

Si ces étapes sont cloisonnées, un modèle financier basique affichera des **revenus fantômes sans capacité de livraison adéquate, du profit sur papier sans flux de trésorerie d’exploitation et des contrats enregistrés sans calendriers d’exécution correctement planifiés**.

### Approche FP&A traditionnelle vs. modélisation opérationnelle intégrée

| Défi de prévision | Approche traditionnelle par tableur FP&A | Modélisation opérationnelle intégrée (cet outil) |
| --- | --- | --- |
| **La croissance des ventes peut-elle être livrée ?** | Applique un pourcentage de croissance linéaire du chiffre d’affaires de façon uniforme. | Traduit les métriques du pipeline CRM en charge de travail granulaire et en capacité ETP requise. |
| **Quand un projet devient-il un revenu ?** | Reconnaît la valeur contractuelle totale immédiatement le mois de la signature. | Applique une courbe de réalisation WIP sur plusieurs mois pour différer et reconnaître correctement les revenus. |
| **La croissance est-elle réellement rentable ?** | Se concentre uniquement sur le chiffre d’affaires et les marges historiques fixes. | Connecte les différents flux de revenus directement aux matériaux, à la main-d’œuvre directe (COGS) et à l’OpEx. |
| **L’entreprise peut-elle financer la croissance ?** | Utilise l’EBITDA comme proxy de la trésorerie disponible. | Calcule le poids exact en trésorerie des créances, du WIP, des dettes fournisseurs, des stocks et du principal de la dette. |
| **La prévision est-elle cohérente en interne ?** | S’appuie sur des ajustements manuels et des comptes de bouclage pour forcer l’équilibre. | Exige automatiquement que le bilan se rapproche dynamiquement du compte de résultat et des flux de trésorerie. |

L’objectif de ce modèle n’est pas de feindre une précision mathématique. Il est de rendre la **chaîne de raisonnement financier visible, structurée et facile à contester en conseil d’administration**.

---

## Cas d’usage FP&A fondamentaux : quand utiliser ce modèle financier

Ce modèle est conçu pour traiter des événements stratégiques complexes où les outils budgétaires basiques atteignent leurs limites :

* **Création du plan opérationnel annuel (AOP) :** fixer des budgets ancrés dans les contraintes de capacité physique plutôt que dans des cibles de revenus arbitraires.
* **Levée de fonds et due diligence en capital-risque :** fournir aux investisseurs une projection fondée et mathématiquement solide de la façon dont leur capital sera absorbé par le fonds de roulement et les besoins de recrutement.
* **Tests de résistance des flux de trésorerie :** identifier précisément le mois où un scénario bas violera les covenants de dette ou nécessitera le tirage d’une facilité de crédit renouvelable.
* **Planification des ventes et des opérations (S&OP) :** combler l’écart entre le pipeline optimiste de l’équipe commerciale et la bande passante réelle de l’équipe de livraison.

---

## Qui a besoin de ce modèle de prévision financière ? (rôles & cas d’usage)

Cette boîte à outils est conçue pour les opérationnels qui ont besoin d’une intégration financière de niveau entreprise sans la charge d’une implémentation d’Anaplan, Adaptive Planning ou Planful.

* **Fondateurs de startups et PDG (modèle financier pour la levée de fonds) :** présentez aux investisseurs une projection d’utilisation des fonds ancrée dans la capacité réelle plutôt que des courbes en crosse de hockey irréalistes.
* **CFO fractionnels et analystes FP&A (modèle Excel de planification par scénarios) :** contournez les logiciels d’entreprise encombrants pour fournir aux clients des livrables de prévision `.xlsx` propres, agiles et professionnels.
* **RevOps et directeurs commerciaux (calculateur pipeline-vers-revenus) :** comblez le décalage entre les données de réservation du CRM Salesforce et le calendrier réel des revenus comptables réalisés.
* **Propriétaires d’agences et services professionnels (logiciel de planification des capacités) :** alignez les heures facturables, les carnets de commandes et les travaux en cours (WIP) pour éviter le sur-recrutement ou l’épuisement de votre équipe de livraison.

C’est particulièrement pertinent lorsque votre modèle économique combine :

* Des contrats de services SaaS, de conformité ou de maintenance récurrents.
* Du travail d’ingénierie, d’installation ou d’agence par projet.
* Des pipelines de prospects avec un suivi de conversion mesurable étape par étape.
* Des équipes de livraison dont la capacité physique contraint directement la croissance des revenus.
* Des délais de fonds de roulement (conditions de crédit clients vs. paiements fournisseurs).

*(Remarque : il n’est **pas** conçu pour remplacer votre grand livre (par exemple QuickBooks, Xero) ou les processus de déclaration fiscale légaux).*

---

## À propos de l’architecture

Je construis des outils de suivi FP&A légers et des outils de modélisation d’aide à la décision pour les situations où il y a trop de pièces en mouvement pour les garder en tête, mais pas assez de complexité pour justifier une implémentation logicielle d’entreprise à six chiffres.

La question centrale derrière cette architecture est simple : **quelles informations doivent être réunies au même endroit pour prendre la prochaine décision opérationnelle en confiance ?**

Ce modèle oblige la prévision financière à partir des décisions opérationnelles qui créent réellement les états financiers, ce qui donne un cadre de prévision réutilisable plutôt qu’un tableur de reporting fragile à usage unique.

---

## Détails techniques



<details>

<summary>Pour les relecteurs techniques, les pratiquants d’Excel et les collaborateurs</summary>



### Architecture du classeur



Le classeur est structuré comme un modèle opérationnel-financier directionnel.



L’architecture sépare les **hypothèses, les inducteurs opérationnels, les calculs, l’intégration financière et les sorties de gestion** au lieu de mélanger tous les calculs dans une seule feuille de reporting.



```text

                    CONTROL & ASSUMPTIONS

                            │

          ┌─────────────────┼─────────────────┐

          │                 │                 │

          ▼                 ▼                 ▼

   RECURRING REVENUE   PROJECT PIPELINE   DEBT SCHEDULE

          │                 │                 │

          │                 ▼                 │

          │          CAPACITY PLANNING       │

          │                 │                 │

          └────────────┬────┴─────────────────┘

                       ▼

                REVENUE SCHEDULE

                       │

                       ▼

                OPERATING MODEL

                       │

                       ├───────────────┐

                       ▼               ▼

                WORKING CAPITAL   DEBT / INTEREST

                       │               │

                       └───────┬───────┘

                               ▼

                       THREE STATEMENTS

                               │

                 ┌─────────────┴─────────────┐

                 ▼                           ▼

        SCENARIO / SENSITIVITY       MANAGEMENT DASHBOARD

```



### Cartographie des feuilles



| Feuille                  | Rôle                                        | Sortie principale                                                                           |

| ---------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------- |

| `Control_Assumptions`  | Couche centrale de contrôle et d’hypothèses        | Hypothèses de scénario, conversion, calendrier, capacité, fonds de roulement, fiscalité, coûts et dette |

| `Recurring_Revenue`    | Moteur de services récurrents            | Base de contrats active et revenus récurrents reconnus                                    |

| `Project_Pipeline`     | Moteur d’entonnoir commercial et de réalisation de projets | Opportunités, commandes, valeur contractuelle et revenus WIP                                   |

| `Capacity_Planning`    | Moteur charge-vers-ETP                      | ETP requis et écart/excédent de capacité                                                    |

| `Revenue_Schedule`     | Couche de consolidation des revenus                 | Revenus mensuels standardisés sur 14 flux d’activité                                  |

| `Operating_Model`      | Couche de coûts et de résultat opérationnel             | COGS, main-d’œuvre directe, OpEx, marge brute, EBITDA                                           |

| `Working_Capital`      | Inducteur opérationnel du bilan                      | AR, stocks, WIP, AP, FR net et ΔFR net                                                    |

| `Debt_Schedule`        | Moteur de financement                            | Tirages, remboursement, dette de clôture et intérêts                                         |

| `Three_Statements`     | Couche d’intégration financière                 | Compte de résultat, bilan, flux de trésorerie et contrôle du bilan                                              |

| `Scenario_Sensitivity` | Comparaison de scénarios | Transmission Base / Haut / Bas                                                    |

| `Management_Dashboard` | Présentation de gestion                     | EBITDA, capacité, mix de revenus, liquidité et indicateurs opérationnels                       |



### Conception des hypothèses centrales



Le modèle suit un principe de **codage en dur zéro, maintenance en un point unique**.



La couche d’hypothèses principale contient huit grands groupes de paramètres :



| Groupe              | Variables principales                                               |

| ------------------ | ------------------------------------------------------------ |

| Contrôle du modèle      | Scénario actif, date de début de prévision, périodes de prévision       |

| Services récurrents | Attrition, renouvellement, ARPU                                         |

| Entonnoir de projets     | Conversion prospect-opportunité et devis-commande            |

| Calendrier commercial       | Délai devis-commande et valeur moyenne de projet                 |

| Réalisation WIP    | Courbe de réalisation des revenus de projets M0–M3                      |

| Capacité           | Heures d’effort standard, heures productives mensuelles, utilisation |

| Fonds de roulement    | Jours clients, fournisseurs et de stock                         |

| Financement & coûts  | Conditions de crédit, taux d’imposition, ratio matière, salaire, OpEx fixes     |



Le scénario actif est sélectionné via `Active_Scenario_Index` :



```text

1 = Base

2 = Upside

3 = Downside

```



Changer le scénario actif modifie les hypothèses de taux de conversion pertinentes utilisées en aval.



### Inventaire global des entrées



Les principales entrées manuelles ou d’initialisation sont :



| ID      | Entrée                        | Source                  |

| ------- | ---------------------------- | ----------------------- |

| `IN-01` | `Active_Scenario_Index`      | Direction / analyste    |

| `IN-02` | `Funnel_Conversion_Rates`    | RevOps                  |

| `IN-03` | `Quote_To_Order_Lag_Days`    | RevOps                  |

| `IN-04` | `WIP_Realization_Schedule`   | Livraison de projets        |

| `IN-05` | `Role_Effort_Hour_Per_Order` | Opérations              |

| `IN-06` | `Working_Capital_Days_Input` | Finance                 |

| `IN-07` | `Debt_Contract_Parameters`   | Finance                 |

| `IN-08` | `Intercompany_Loan_WriteOff` | Finance                 |

| `IN-09` | `Historical_Customer_Base`   | Équipe services récurrents |

| `IN-10` | `Pipeline_Raw_Leads_Volume`  | Marketing / Ventes       |

| `IN-11` | `Average_Quote_Value`        | RevOps                  |

| `IN-12` | `Base_Headcount_Opening`     | RH                      |

| `IN-13` | `Opening_Balance_Sheet_Data` | Finance                 |



### Inventaire global des sorties



Les principales sorties calculées forment la chaîne financière aval :



| ID       | Sortie                       | Usage décisionnel                                  |

| -------- | ---------------------------- | --------------------------------------------- |

| `OUT-01` | `Recurring_Net_Active_Base`  | Trajectoire de la base de clients récurrents            |

| `OUT-02` | `Recurring_Recognized_Rev`   | Revenus récurrents au compte de résultat                         |

| `OUT-03` | `Project_Derived_Orders`     | Nouvelle demande de projets et valeur contractuelle         |

| `OUT-04` | `WIP_Released_Revenue`       | Calendrier des revenus de projets                     |

| `OUT-05` | `Required_Operational_FTE`   | Besoin en personnel                          |

| `OUT-06` | `Capacity_Gap_Surplus`       | Alerte recrutement / externalisation / capacité commerciale |

| `OUT-07` | `Total_Standardized_Revenue` | Inducteur de revenus unifié                        |

| `OUT-08` | `COGS_And_Direct_Labor`      | Calcul de la marge brute                      |

| `OUT-09` | `Operating_Expenses_Opex`    | Poids des coûts d’exploitation                         |

| `OUT-10` | `Ending_AR_Debtors`          | Besoin de financement des créances               |

| `OUT-11` | `Ending_WIP_Balance`         | Capital de projet immobilisé dans le WIP                |

| `OUT-12` | `Delta_Working_Capital`      | Ajustement des flux de trésorerie                          |

| `OUT-13` | `Debt_Principal_Repayment`   | Sortie de trésorerie de financement                        |

| `OUT-14` | `Debt_Interest_Expense`      | Coût de financement                                |

| `OUT-15` | `P&L_EBITDA`                 | Rentabilité opérationnelle                       |

| `OUT-16` | `CFS_Net_Cash_Movement`      | Mouvement de liquidité mensuel                    |

| `OUT-17` | `Balance_Sheet_Check_Diff`   | Contrôle d’intégrité du modèle               |



### Principe de dépendance des données



La direction de dépendance prévue est :



```text

Manual Assumptions

        ↓

Operating Drivers

        ↓

Dynamic Calculation Engines

        ↓

Unified Revenue / Cost Layers

        ↓

Working Capital + Financing

        ↓

Three Statements

        ↓

Scenario Analysis + Management Outputs

```



Les feuilles aval devraient consommer des sorties calculées plutôt que recréer indépendamment la même logique métier.



Cela empêche plusieurs versions de la logique de revenus, de coûts ou de flux de trésorerie de se développer dans le même classeur.



### Trois pièges qui surprennent même les analystes financiers expérimentés



Le modèle est construit autour de trois modes de défaillance qui survivent fréquemment à une révision ordinaire de tableur : **la distorsion de calendrier, la croissance aveugle à la capacité et la prévision de profit sans trésorerie**.



#### Piège 1 — Traiter la valeur contractuelle comme un revenu courant



Une décision est prise d’augmenter la prévision de revenus à court terme parce que le pipeline de projets contient une grande quantité de travaux devisés ou récemment gagnés.



L’hypothèse non remarquée est que la valeur contractuelle devient un revenu au compte de résultat immédiatement.



Cela change la recommandation : l’entreprise semble capable de soutenir une rentabilité à court terme plus élevée et semble prête à augmenter les dépenses fixes.



Le raisonnement est incorrect parce que le travail de projet est livré sur plusieurs périodes. Une commande signée n’est pas nécessairement le même événement économique qu’un revenu reconnu.



L’approche corrigée sépare les **commandes enregistrées** des **revenus reconnus**, puis libère la valeur du projet selon le calendrier de livraison prévu.



|                              | Prévision faible | Prévision corrigée |

| ---------------------------- | ------------: | -----------------: |

| Nouvelles commandes de projets |      500 000 $ |           500 000 $ |

| Revenu du mois 0              |      500 000 $ |           100 000 $ |

| Revenu des périodes ultérieures |            0 $ |           400 000 $ |

| Implication EBITDA immédiate |    Surestimée |    Ajustée au calendrier |



La décision passe donc de **« augmenter les dépenses parce que les revenus accélèrent »** à **« confirmer si le calendrier de livraison actuel soutient les dépenses prévues »**.



<details>

<summary>Logique de la formule</summary>



```excel

=Orders_t0*w0

 +Orders_t1*w1

 +Orders_t2*w2

 +Orders_t3*w3

```



Les poids de réalisation sont contrôlés de manière centralisée via le calendrier de réalisation WIP.



</details>



---



#### Piège 2 — Prévoir la croissance sans tester la capacité de livraison



Une décision est prise d’accepter un pipeline de projets plus fort parce que la prévision financière montre des revenus incrémentaux attrayants.



Le nombre non remarqué est la capacité de livraison requise.



Un modèle de conversion de pipeline peut générer des commandes supplémentaires sans répondre automatiquement à la question de savoir si l’équipe existante peut les exécuter.



La recommandation qui en résulte peut être de poursuivre toutes les opportunités disponibles.



C’est un raisonnement incomplet.



Le modèle corrigé convertit les opportunités et commandes projetées en charge de travail standard, puis traduit la charge de travail en ETP requis. La capacité disponible est comparée à ce besoin.



|                         |    Prévision faible |              Prévision sensible à la capacité |

| ----------------------- | ---------------: | -----------------------------------: |

| Opportunités qualifiées |              420 |                                  420 |

| Commandes gagnées              |              140 |                                  140 |

| ETP requis            |      Non modélisé |                     Dérivé de la charge de travail |

| Pénurie de capacité       |        Invisible |                             Explicite |

| Action de gestion       | Accepter plus de travail | Recruter, externaliser ou limiter les entrées |



Un écart de capacité négatif n’est pas seulement un problème RH. Il peut devenir un **problème de retard de livraison, de qualité, contractuel et de marge**.



La décision corrigée se base donc sur le **potentiel de revenus sous réserve de la capacité d’exécution**, plutôt que sur le potentiel de revenus seul.



<details>

<summary>Logique de la formule</summary>



```excel

Required_FTE =

Required_Work_Hours /

(Monthly_Standard_Hours * Productive_Utilization)

```



Pour les rôles opérationnels :



```excel

Qualifier_FTE =

Qualified_Opps * Qualifier_Effort /

Available_Hours_Per_FTE



Identifier_FTE =

Won_Orders * Identifier_Effort /

Available_Hours_Per_FTE

```



</details>



---



#### Piège 3 — Traiter l’EBITDA comme de la trésorerie disponible



Une décision est prise de financer l’expansion parce que l’EBITDA projeté reste positif.



L’hypothèse non remarquée est que la rentabilité comptable et la disponibilité de trésorerie évoluent ensemble.



Ce n’est pas le cas.



Une entreprise de projets en croissance peut générer un EBITDA positif tandis que la trésorerie est absorbée par les créances, les stocks, le WIP et le remboursement de la dette.



La recommandation faible est donc **« l’entreprise est rentable, donc l’expansion est abordable »**.



L’approche corrigée modélise explicitement le fonds de roulement opérationnel et les mouvements de financement avant de déterminer la trésorerie de clôture.



| Inducteur de trésorerie           | Effet                        |

| --------------------- | ----------------------------- |

| EBITDA                | Point de départ de la trésorerie opérationnelle |

| Augmentation des créances (AR) | Trésorerie absorbée                 |

| Augmentation des stocks | Trésorerie absorbée                 |

| Augmentation du WIP       | Trésorerie absorbée                 |

| Augmentation des dettes fournisseurs (AP) | Trésorerie libérée                 |

| Nouvelle dette              | Trésorerie fournie                 |

| Remboursement du principal | Trésorerie consommée                 |

| Intérêts | Trésorerie consommée                 |



Une entreprise peut donc afficher une marge opérationnelle saine tout en subissant une pénurie de liquidité matérielle.



La décision corrigée devient **« l’expansion est économiquement rentable, mais son besoin de financement doit être couvert avant d’accepter la charge de travail supplémentaire »**.



<details>

<summary>Logique de la formule</summary>



```excel

Delta_NWC = NWC_t - NWC_(t-1)



Net_Cash_Movement =

Net_Income

+ D&A

- Delta_NWC

- Capex

+ New_Debt

- Principal_Repayment

```



Le contrôle du bilan teste alors si les états financiers résultants restent cohérents en interne.



</details>



### Exemple de scénario



Considérons une entreprise de services pilotée par les projets entrant dans une période de croissance de 12 mois.



La prévision opérationnelle contient **1 200 nouveaux prospects** dans le pipeline de projets. Supposons que le scénario actif produise une conversion prospect-opportunité de 35 % et une conversion devis-commande de 25 %. Cela implique environ **420 opportunités qualifiées** et environ **105 commandes gagnées**, avant de prendre en compte la distribution détaillée du calendrier.



Supposons que la valeur moyenne de projet soit de **20 000 $**.



L’arrivée de commandes qui en résulte est d’environ :



```text

105 orders × $20,000

= $2,100,000 contracted value

```



Une prévision simpliste pourrait reconnaître la totalité des 2,1 M$ comme revenus au moment de la signature des contrats.



Le modèle applique à la place la courbe de réalisation du projet :



```text

M0 = 20%

M1 = 40%

M2 = 30%

M3 = 10%

```



Pour un pool de commandes de 2,1 M$, la libération de revenus correspondante est :



| Période    | Reconnaissance |        Revenus |

| --------- | ----------: | -------------: |

| M0        |         20 % |       420 000 $ |

| M1        |         40 % |       840 000 $ |

| M2        |         30 % |       630 000 $ |

| M3        |         10 % |       210 000 $ |

| **Total** |    **100 %** | **2 100 000 $** |



L’interprétation commerciale change matériellement.



L’entreprise a **2,1 M$ de valeur de projets sous contrat**, mais seulement 420 000 $ sont reconnus au cours du premier mois sous ce profil de réalisation.



Le modèle de capacité teste ensuite si les 105 commandes peuvent réellement être livrées. La charge de travail requise est calculée à l’aide des hypothèses d’effort standard pour les rôles opérationnels concernés et comparée à la capacité productive mensuelle.



Enfin, le modèle de fonds de roulement pose une question différente : **quelle quantité de trésorerie doit être financée pendant que ces revenus sont livrés et encaissés ?**



La recommandation n’est donc pas simplement de poursuivre le pool d’opportunités de 2,1 M$. La direction doit évaluer **conjointement le calendrier des revenus, la capacité de livraison, l’absorption de fonds de roulement et les exigences de service de la dette**.



C’est l’objectif central du modèle : transformer une prévision de ventes en une décision opérationnelle financièrement contrainte.



### Référence des formules



<details>

<summary>Moteur de revenus récurrents</summary>



**Attrition mensuelle**



```excel

=LET(

    Opening_Base,C10:C16,

    Annual_Churn,Control_Assumptions!$C$11:$C$17,

    ROUND(Opening_Base*(Annual_Churn/12),0)

)

```



Objectif : convertit les hypothèses d’attrition annuelle en attrition contractuelle mensuelle sur la base de services récurrents.



**Revenus récurrents reconnus**



```excel

=LET(

    Active_Contracts,D26:D32,

    Annual_ARPU,Control_Assumptions!$E$11:$E$17,

    ROUND(Active_Contracts*(Annual_ARPU/12),2)

)

```



Objectif : convertit les contrats récurrents actifs en revenus mensuels reconnus.



</details>



<details>

<summary>Moteur de pipeline de projets</summary>



**Conversion d’opportunités pilotée par le scénario**



```excel

=LET(

    Current_Scenario,Control_Assumptions!$C$4,

    Conv_Matrix,Control_Assumptions!$C$21:$E$27,

    Active_Rate,

        CHOOSE(

            Current_Scenario,

            INDEX(Conv_Matrix,,1),

            INDEX(Conv_Matrix,,2),

            INDEX(Conv_Matrix,,3)

        ),

    ROUND(C10:Z16*Active_Rate,0)

)

```



Objectif : change le scénario de taux de conversion actif sans reconstruire le modèle de pipeline.



**Réalisation des revenus de projets**



```excel

=LET(

    w0,Control_Assumptions!$C$41,

    w1,Control_Assumptions!$D$41,

    w2,Control_Assumptions!$E$41,

    w3,Control_Assumptions!$F$41,

    Orders_t0,C40:C46,

    Orders_t1,IFERROR(OFFSET(C40:C46,0,-1),0),

    Orders_t2,IFERROR(OFFSET(C40:C46,0,-2),0),

    Orders_t3,IFERROR(OFFSET(C40:C46,0,-3),0),

    ROUND(

        Orders_t0*w0+

        Orders_t1*w1+

        Orders_t2*w2+

        Orders_t3*w3,

        2

    )

)

```



Objectif : convertit l’arrivée de commandes de projets en revenus reconnus spécifiques à la période.



</details>



<details>

<summary>Planification des capacités</summary>



**ETP requis**



```excel

=LET(

    Opps_Total,

        BYCOL(Project_Pipeline!C20:Z26,LAMBDA(col,SUM(col))),

    Orders_Total,

        BYCOL(Project_Pipeline!C30:Z36,LAMBDA(col,SUM(col))),

    Q_Effort,Control_Assumptions!$C$45,

    I_Effort,Control_Assumptions!$D$46,

    Std_Hours,Control_Assumptions!$C$47,

    Util_Rate,Control_Assumptions!$C$48,

    Available_Hours_Per_FTE,

        Std_Hours*Util_Rate,

    Q_FTE_Vector,

        ROUND(

            (Opps_Total*Q_Effort)/

            Available_Hours_Per_FTE,

            1

        ),

    I_FTE_Vector,

        ROUND(

            (Orders_Total*I_Effort)/

            Available_Hours_Per_FTE,

            1

        ),

    VSTACK(Q_FTE_Vector,I_FTE_Vector)

)

```



Objectif : dérive les besoins en personnel de la charge de travail plutôt que d’appliquer une hypothèse d’effectif fixe.



**Écart de capacité**



```excel

=LET(

    Total_Required,

        C14#+OFFSET(C14#,1,0),

    Available,C18:Z18,

    ROUND(Available-Total_Required,1)

)

```



Les valeurs négatives indiquent une capacité disponible insuffisante.



</details>



<details>

<summary>Modèle de revenus et d’exploitation</summary>



**Agrégation des revenus**



```excel

=LET(

    Recurring_Block,Recurring_Revenue!D35:Z41,

    Project_Block,Project_Pipeline!C50:Z56,

    VSTACK(Recurring_Block,Project_Block)

)

```



Objectif : crée une matrice de revenus standardisée à partir des activités récurrentes et de projets.



**Revenu mensuel total**



```excel

=BYCOL(C10#,LAMBDA(col,SUM(col)))

```



Objectif : produit la série de revenus mensuels à l’échelle de l’entreprise consommée par le modèle opérationnel et financier.



**EBITDA**



```excel

=LET(

    Rev,Revenue_Schedule!$C$24#,

    COGS,BYCOL(C12#,LAMBDA(col,SUM(col))),

    Opex,BYCOL(C20:Z21,LAMBDA(col,SUM(col))),

    Rev-COGS-Opex

)

```



Objectif : calcule l’EBITDA opérationnel à partir des revenus reconnus, des coûts directs et des dépenses d’exploitation.



</details>



<details>

<summary>Fonds de roulement et flux de trésorerie</summary>



**AR, stocks et AP**



```excel

=LET(

    Rev,Revenue_Schedule!$C$24#,

    Mat_Cost,Operating_Model!$C$12#,

    DSO,Control_Assumptions!$C$50,

    DPO,Control_Assumptions!$C$51,

    DIO,Control_Assumptions!$C$52,

    AR_Vector,ROUND(Rev*(DSO/30),2),

    AP_Vector,ROUND(Mat_Cost*(DPO/30),2),

    Inv_Vector,ROUND(Mat_Cost*(DIO/30),2),

    VSTACK(AR_Vector,Inv_Vector,AP_Vector)

)

```



Objectif : traduit les hypothèses de crédit commercial et de stock en besoins de financement au bilan.



**Solde WIP**



```excel

=LET(

    Cum_Orders,

        SCAN(

            0,

            Project_Pipeline!$C$40#,

            LAMBDA(acc,val,acc+val)

        ),

    Cum_Rev,

        SCAN(

            0,

            Project_Pipeline!$C$50#,

            LAMBDA(acc,val,acc+val)

        ),

    ROUND(Cum_Orders-Cum_Rev,2)

)

```



Objectif : identifie la valeur de projets sous contrat qui n’a pas encore été libérée par les revenus de projets reconnus.



**Mouvement du FR net**



```excel

=LET(

    AR,C10#,

    Inv,C11#,

    AP,C12#,

    WIP,C14#,

    NWC,AR+Inv+WIP-AP,

    NWC_Prev,HSTACK(0,DROP(NWC,0,-1)),

    ROUND(NWC-NWC_Prev,2)

)

```



Objectif : fournit l’ajustement de flux de trésorerie du fonds de roulement.



</details>



<details>

<summary>Calendrier de dette et intégration des trois états</summary>



**Amortissement du principal de la dette**



```excel

=LET(

    Tenors,Control_Assumptions!$E$56:$E$58,

    Openings,Control_Assumptions!$C$56:$C$58,

    Monthly_Amort,ROUND(Openings/Tenors,2),

    MAKEARRAY(

        ROWS(Tenors),

        Control_Assumptions!$C$6,

        LAMBDA(r,c,INDEX(Monthly_Amort,r,1))

    )

)

```



**Charges d’intérêts**



```excel

=LET(

    Rates,Control_Assumptions!$D$56:$D$58,

    Avg_Debt,(C10:Z12+C26:Z28)/2,

    ROUND(Avg_Debt*(Rates/12),2)

)

```



Les mouvements de dette résultants alimentent les flux de trésorerie de financement, tandis que les charges d’intérêts alimentent le compte de résultat.



Les trois états sont ensuite rapprochés via le contrôle du bilan :



```text

Assets - Liabilities - Equity = 0.00

```



</details>



### Règles de validation



L’architecture source définit la validation comme partie intégrante du modèle plutôt que comme une étape de présentation optionnelle. Le contrôle croisé documenté n’a trouvé aucune hypothèse codée en dur de fiscalité, de fonds de roulement ou de taux d’intérêt dans les formules de base examinées ; les groupes de paramètres sont référencés de manière centralisée.



| Champ / Contrôle         | Règle de validation                                           | Comportement en cas d’erreur                                                       |

| ----------------------- | --------------------------------------------------------- | -------------------------------------------------------------------- |

| `Active_Scenario_Index` | Doit se résoudre en Base, Haut ou Bas                 | Un scénario invalide empêche une sélection de scénario fiable                |

| `Forecast_Start_Date`   | Doit être une date Excel valide                                | Une date invalide casse la chronologie de prévision                            |

| `Forecast_Periods`      | Doit être un horizon de prévision positif                       | Un nombre de périodes invalide empêche la largeur correcte du tableau dynamique            |

| Taux d’attrition / de renouvellement | Doivent être des hypothèses de pourcentage valides                      | Des valeurs invalides déforment la projection de la base récurrente                     |

| Taux de conversion de l’entonnoir | Doivent rester dans une plage de pourcentage logique             | Des valeurs hors plage déforment la conversion du pipeline                      |

| Courbe de réalisation WIP   | Les pourcentages M0–M3 devraient totaliser 100 %                       | Une réalisation incomplète produit un calendrier de revenus de projets incorrect     |

| Heures standard mensuelles | Doit être positif                                          | Une base de capacité nulle ou négative invalide les calculs d’ETP         |

| Utilisation productive  | Doit être un pourcentage valide                                | Une utilisation invalide déforme les ETP requis                            |

| Jours de fonds de roulement    | Doivent être des hypothèses opérationnelles non négatives              | Des jours invalides déforment AR, stocks ou AP                            |

| Durée de la dette              | Doit être positive                                          | Une durée invalide casse l’amortissement du principal                          |

| Taux d’intérêt de la dette      | Doit être un pourcentage valide                                | Un taux invalide déforme les charges financières                                |

| Bilan d’ouverture   | Doit se rapprocher du point de départ de la prévision             | Des soldes d’ouverture incorrects se propagent dans les trois états       |

| Contrôle du bilan     | L’actif moins les passifs et les capitaux propres doit se rapprocher de zéro | Un résultat non nul signale une erreur d’intégration nécessitant une enquête |



### Contre-vérification



La documentation d’implémentation rapporte une contre-vérification des principales entrées et sorties, y compris les 17 champs de sortie globaux. Elle rapporte également un examen de 22 formules de base à tableau dynamique sur le modèle à 11 feuilles et une vérification des hypothèses codées en dur.



L’objectif de contrôle documenté est :



```text

Inputs

  ↓

Operating calculations

  ↓

Financial outputs

  ↓

Three-statement reconciliation

  ↓

Management decision

```



Une prévision ne devrait pas être considérée comme complète simplement parce que des formules individuelles renvoient des nombres. Les sorties doivent rester connectées à leurs hypothèses sources et se rapprocher via les états financiers.



</details>





---


## La logique métier & la méthodologie

Un **modèle de prévision financière à trois états** fiable devrait faire plus que projeter les revenus, les dépenses et les soldes de trésorerie indépendamment. Il devrait expliquer comment l’activité commerciale, la capacité de livraison, la reconnaissance des revenus, les coûts d’exploitation, le fonds de roulement et le financement interagissent pour déterminer la situation financière d’une entreprise.

Ce modèle utilise une **approche de prévision opérationnelle intégrée** pour connecter les hypothèses commerciales au compte de résultat, au bilan et au tableau de flux de trésorerie. L’objectif est d’aider les chefs d’entreprise, les directeurs financiers et les professionnels FP&A à évaluer si un plan de croissance est réalisable opérationnellement, financièrement durable et adéquatement financé.

### 1. Planification par scénarios pour la prévision financière

**Méthode :** analyse de scénarios Base, Haut et Bas.

**Problème métier :** une prévision financière unique peut créer une fausse confiance lorsque la conversion commerciale, la fidélisation des clients ou les conditions d’exploitation changent.

**Fonctionnement :** des hypothèses de scénario centralisées ajustent les inducteurs métier pertinents dans l’ensemble de la prévision, au lieu d’exiger des modèles séparés pour chaque cas.

**Décision permise :** comparer les résultats financiers potentiels, identifier l’exposition au scénario bas et tester si les dépenses, les recrutements ou l’expansion prévus restent viables dans différentes conditions d’exploitation.

### 2. Prévision du pipeline commercial et projection des revenus

**Méthode :** modélisation de la conversion de l’entonnoir combinée à la reconnaissance des revenus de projets et aux calendriers de réalisation multi-périodes.

**Problème métier :** les pipelines commerciaux et les contrats signés sont souvent confondus avec des revenus immédiatement réalisables, surestimant la performance à court terme et masquant le calendrier de livraison.

**Fonctionnement :** les prospects sont convertis en opportunités qualifiées et en commandes gagnées à l’aide d’hypothèses de conversion définies. La valeur contractuelle du projet circule ensuite dans un calendrier de réalisation des revenus, tandis que les services récurrents suivent leurs propres hypothèses de base de clients et de revenus.

**Décision permise :** distinguer le potentiel du pipeline, les affaires enregistrées et les revenus prévus. Estimer quand l’activité commerciale devrait contribuer à la performance financière rapportée.

### 3. Planification des capacités et prévision des effectifs

**Méthode :** prévision d’ETP basée sur la charge de travail.

**Problème métier :** les prévisions de revenus supposent fréquemment que l’entreprise peut livrer un travail supplémentaire sans tester si la main-d’œuvre disponible dispose d’une capacité productive suffisante.

**Fonctionnement :** les opportunités et commandes prévues sont traduites en charge de travail à l’aide d’hypothèses d’effort standard, d’heures de travail mensuelles et d’utilisation productive. Les ETP requis sont comparés à la capacité disponible.

**Décision permise :** identifier les pénuries de capacité potentielles avant d’accepter un travail supplémentaire, et évaluer si le recrutement, l’externalisation ou des changements dans les entrées commerciales sont nécessaires.

### 4. Prévision du fonds de roulement et analyse des flux de trésorerie

**Méthode :** modélisation du fonds de roulement opérationnel à l’aide d’hypothèses de créances, de stocks, de travaux en cours et de dettes fournisseurs.

**Problème métier :** un EBITDA positif ne garantit pas une trésorerie suffisante pour financer la croissance. Les encaissements clients retardés et le capital immobilisé dans les stocks ou la livraison de projets peuvent créer une pression de liquidité même lorsque les opérations semblent rentables.

**Fonctionnement :** l’activité opérationnelle pilote les soldes de fonds de roulement projetés. Les variations de ces soldes alimentent la prévision de flux de trésorerie, connectant la croissance commerciale à ses besoins de financement.

**Décision permise :** estimer la quantité de trésorerie que la croissance peut absorber, évaluer l’impact des conditions de paiement et identifier les périodes où une liquidité supplémentaire peut être nécessaire.

### 5. Calendrier de dette et modélisation financière à trois états

**Méthode :** amortissement intégré de la dette, prévision des intérêts et modélisation financière à trois états.

**Problème métier :** les prévisions deviennent peu fiables lorsque les emprunts, les remboursements du principal, les charges d’intérêts et les mouvements de trésorerie sont modélisés séparément de la performance opérationnelle.

**Fonctionnement :** les mouvements de dette alimentent les calendriers de financement et de bilan, tandis que les intérêts affectent la performance financière et les besoins de trésorerie de financement. Le modèle intégré connecte les résultats opérationnels, les mouvements de bilan et les flux de trésorerie, avec un contrôle de rapprochement du bilan.

**Décision permise :** évaluer les besoins de financement, la pression du service de la dette, les implications de liquidité et la cohérence des états financiers projetés.

### Comment les méthodes fonctionnent ensemble

Ces méthodes forment une chaîne décisionnelle connectée :

**Pipeline commercial → Commandes → Reconnaissance des revenus → Capacité de livraison → COGS & dépenses d’exploitation → Fonds de roulement → Service de la dette → Trois états financiers**

La valeur vient de l’examen conjoint de ces dépendances plutôt que du traitement de chaque prévision comme un calcul isolé.

Une prévision commerciale plus forte peut augmenter les revenus projetés, mais elle peut aussi augmenter les besoins en personnel et en fonds de roulement. La décision qui en résulte dépend de la capacité de livraison, des marges, du calendrier d’encaissement et de la disponibilité du financement — et pas seulement de la croissance des revenus.

Cela rend le modèle utile pour la **planification financière intégrée, la budgétisation opérationnelle, la prévision des flux de trésorerie, l’analyse de scénarios de croissance d’entreprise et l’aide à la décision de gestion**.

Il est conçu comme un outil léger de prévision et d’aide à la décision, et non comme un remplacement des logiciels comptables, des systèmes ERP ou d’une plateforme complète de planification financière d’entreprise.



## Autres outils de cette série



* **Boîtes à outils d’aide à la décision opérationnelle** — des modèles Excel légers pour transformer des données opérationnelles désordonnées en décisions répétables.

* **Outils de rentabilité & de rapprochement** — des modèles axés sur la visibilité des marges, l’allocation des coûts et le rapprochement financier.

* **Outils de planification & de capacité** — des classeurs de planification opérationnelle qui connectent la demande aux ressources disponibles.



## Licence



Ce projet est publié sous la **licence Apache 2.0**.



Consultez le fichier `LICENSE` pour les conditions complètes de la licence. 

