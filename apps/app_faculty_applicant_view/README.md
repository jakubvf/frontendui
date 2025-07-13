# Zobrazení uchazeče správním orgánem

Hodnocení
-	Absolvování jednoho projektového dne (součástí je commit na github ne starší než 1 týden) 5 b (x3, tj. 15 b), pod omluvě lze nahradit individuálně
-	Příběh / deníček (na githubu) ve formátu md ReadME.md (markdown) 5 b součástí příběhu musí být, za chybějící prvek snížení počtu bodů
  -	časová posloupnost commitů,
  -	definice problémů k vyřešení,
  -	co jste objevili,
  -	které problémy se nedaří řešit, jak byly vyřešeny
-	Řádné komentáře v kódu, řádné formátování kódu, popis komponent ve formátu jsdoc, generování dokumentace až 5 b.
-	Readonly stránka 10 b
-	Writtable stránka 10 b
-	Generování dat ve vztahu k tématu aplikace 10 b
-	Publikace npm 5 b (včetně prokázání funkčnosti).
-	Obhajoba 60 b, každý student předvede svoji část, bez ohledu na týmovou práci
-	Lze získat až 120 bodů. Předmětem projdete, pokud budete mít více než 50 bodů, hodnocení „A“ získáte za 90 bodů a více

## Deníček vývoje

### Časová posloupnost commitů

#### Březen 2025
- **29.3.2025** - `8da6176` - Stránka /admission
  - Základní nastavení routingu pro admission stránku
  - Úprava AppRouter.jsx pro novou funkcionalitu

#### Duben 2025
- **1.4.2025** - `40d0460` - Zobrazení uchazeče správním orgánem
  - Definice základních požadavků projektu
  - Aktualizace README.md se specifikací funkcí

- **9.4.2025** - `4a12335` - Applicant_view package
  - Vytvoření samostatného balíčku pro zobrazení uchazečů
  - Implementace kompletní sady komponent pro práci s uchazeči
  - Struktura: Components, Pages, Queries, Scalars, Vectors

- **418711a** - Create User components
  - Vytvoření základních komponent pro práci s uživateli

#### Květen 2025
- **85e575e** - Přidat StudentDocument
  - Implementace funkcionality pro práci s dokumenty studentů

- **a978225** - Refactor payment handling
  - Refaktoring zpracování plateb
  - Změna z name na amount fields v GraphQL

- **320f6ed** - Document view
  - Implementace zobrazení dokumentů

- **cb047a7** - Enhance payment input handling
  - Vylepšení zpracování platebních údajů
  - Změna typu inputu na number

- **5eb4625** - StudentDocumentList
  - Implementace seznamu dokumentů studentů

- **fbe8025** - Přidávání dokumentů
  - Funkcionalita pro přidávání nových dokumentů

- **9f61de0** - UserPage dokumentace
  - Dokumentace pro uživatelské stránky

- **335088d** - Přidat Evaluation
  - Implementace hodnocení uchazečů

- **0a8ae91** - Evaluation display
  - Zobrazení hodnocení v uživatelském rozhraní

- **6f08278** - Odebírání dokumentů
  - Funkcionalita pro mazání dokumentů

- **2682113** - Edit page
  - Implementace editovatelných stránek

- **cec9866** - DocumentGenerator
  - Generátor dokumentů

- **4edd23f** - Refactor UserPage and related components
  - Refaktoring komponent souvisejících s uživatelskými stránkami

- **13b3a45** - Update README.md
  - Aktualizace dokumentace projektu

- **23498c3** - Smazat všechny checksum.txt
  - Odstranění redundantních checksum souborů

- **873b102** - Zlepšit dokumentaci
  - Vylepšení JSDoc dokumentace napříč všemi komponenty
  - Přidání standardizovaných komentářů podle JSDoc konvencí
  - Dokumentace pro komponenty, async actions a moduly

### Definice problémů k vyřešení

1. **Zobrazení uchazeče správním orgánem**
   - Potřeba vytvořit rozhraní pro správu uchazečů
   - Požadavky: podané přihlášky, platby, výsledky, dokumenty, termíny

2. **Integrace s GraphQL**
   - Nutnost implementovat správné GQL modely
   - Potřeba efektivních queries a mutací

3. **Správa dokumentů**
   - Implementace nahrávání, zobrazování a mazání dokumentů

4. **Platební systém**
   - Implementace sledování plateb uchazečů

### Co jsem objevil

#### Práce s GraphQL
Během vývoje jsem se naučil strukturu queries a mutací v GraphQL. Klíčovými nástroji pro práci s GraphQL jsou Graphiql a Voyager přístupné z frontendu. Můj workflow při práci s queries a mutacemi: nejprve si nachystám požadavek v Graphiql a následně jej napasuju na entitu v kódu (podsložka Queries/). Pro objevování struktury GQL modelů se naopak hodí Voyager, což je důležité při hledání propojení jedné struktury do druhé. Ne vždy je cesta přímočará.

#### React komponenty a techniky
Asi nejvýznamnějším poznatkem týkajícím se Reactu je spread syntax props. O této funkcionalitě jsem nevěděl, jen teď přemýšlím o tom, jestli se to vyplatí z pohledu čitelnosti kódu. Přece jenom jsou tyto props takovými skrytými "dependencies", které mohou dělat problémy, když se mění struktura kódu a zjistit, že nějaký prop chybí, vyžaduje manuální testování. Dále bych vyzdvihl funkcionalitu napsanou profesorem "useAsyncAction". Myslím si, že kód dělá přehledným a do jisté míry skryje "asynchronitu" celého programu.

#### Správa dokumentů
Práce s dokumenty je relativně jednoduchá, a to hlavně kvůli tomu, že zatím neexistuje žádné uložiště souborů, takže dokumenty jsou čistě entity v systému bez samotných souborů. To je ale samozřejmě práce na backend.

### Problémy a jejich řešení
#### Login
Jeden z nečastějších problémů je zapomenutí se přihlásit k frontendu http://localhost:33001. Všechny požadavky na backend selžou.
#### Přístup k internetu
Frontend vyžaduje přístup k internetu. Stahuje javascript z CDN.

### Další pozorování a úvahy

#### CRUD operace / datum
CRUD operace byly vcelku jednoduché díky existující implementaci *CUDButton. Stačilo přizpůsobit queries a mutace v podsložce Queries/ a upravit pole zobrazená uživateli a CUDButton se postaral o zbytek. Pro budoucí použití bych měl jen jednu výhradu, a to je udělat konkrétní místo pro validaci a konvertování dat. Místo v CUDButtonu samozřejmě je, ale řekl bych, že každý student to udělal trochu jinak. Dále bych podotknul, že by to chtělo jednu funkci pro parsování času a data, popřípadě i komponentu date picker. Funkce by se pak mohla hodit, když se začne řešit lokalizace.


#### Struktura monorepo
Stále zvláštním aspektem pro mě je struktura frontendu. Je vedený formou monorepo, ale přitom jedním z výstupů je npm package. K čemu je npm package, když celý kód je stejně v jednom repozitáři?

#### Rozdělení apps a packages
Další věcí, nad kterou si lámu hlavu, je rozdělení apps a packages. Apps momentálně slouží pouze jako entrypoint pro React router a package se postará o všechen zbytek. Rozdělení by mi dávalo větší smysl, kdyby se jedna aplikace skládala z více packages. Momentálně mi toto rozdělení připadá jako něco, co znemožňuje reuse kódu napříč aplikacemi. Zkoušel jsem totiž přijít na způsob, jak sdílet kód s kolegy, a nepřišel jsem na nic, co by mi nešlo proti srsti.

#### Testování backendu
Dále bych podotknul nutnost testů backendu. Nemusíme se ani moc hluboko rýpat v queries a mutacích a hned najdeme mnoho bodů, kde backend prostě nefunguje. Několikrát jsme s kolegy museli nějakou část backendu obejít a dostat se k cíli jinak. Za mě by mělo být prioritou napsat testy na každou query a mutaci a tím otestovat každou funkcionalitu backendu.

#### Struktura backendu a developer experience
Struktura backendu mi přijde jako nejzvláštnější věc na celém systému. Každý gql_modul je koncipován jako samostatný docker image - super. Celý systém může být distribuován v rámci jednoho docker-compose.yml - taky super vlastnost. Nicméně, když má člověk rozjetou verzi celého IS a chce v jednom modulu udělat změnu, například gql_ug, tak musí naklonovat gql_ug, tam udělat změnu a v nejlepším případě to udělá změnou docker-compose.yml (použije build:). V horším případě, když neví o funkcionalitě v docker-compose.yml, tak udělá lokální image přes docker build a ten pak změní v docker-compose.yml. Spatřil jsem to na vlastní oči při hacking days.

Nehledě na to, že debugging backendu je také nepříjemná záležitost - nepřišel jsem na způsob, jak připojit ke kontejneru debugger. Celkově bych řekl, že současná struktura je nepřátelská ke změnám a navrhl bych částečné řešení využívající git submoduly. V hlavním repozitáři (_uois) mít docker-compose.yml, který se odkazuje na git submoduly ve stejném adresáři. Tímto způsobem se zachová flexibilita (docker image pro každou službu, možnost distribuce skrze jeden yaml soubor) a zlepší se developer experience tím, že změny mohou být jednoduše nasazeny na testování. Souhlasím, že tohoto lze dosáhnout i jinými způsoby, ale "výchozí" cesta by měla být jasná, jednoduchá a dokumentovaná.
