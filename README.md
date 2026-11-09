# Rybičkové akvárium: samostatná webová verze

**Běží na:** https://radekhudak.github.io/rybickove-akvarium/  
**Supabase projekt:** Rybycky (`nlkdgebvmbiliiivxjud`), tabulka `families`, Site URL a Redirect URL nastavené.

Statický web bez buildu: HTML, JS, knihovny a fonty jsou přímo ve složce. Přihlášení a ukládání postupu obstarává Supabase (bezplatný tarif stačí). Na tabletu se hra nainstaluje jako aplikace na celou obrazovku.

```
index.html             stránka + styly
app.js                 celá hra
config.js              ← sem doplníš adresu a klíč ze Supabase
sw.js                  offline cache (při úpravách zvyš VERSION)
manifest.webmanifest   instalace na plochu
vendor/                three.js r128, supabase-js 2.45.4
fonts/                 Baloo 2, Nunito (lokálně, bez Google Fonts)
icons/                 ikony aplikace
supabase/schema.sql    databáze
```

Bez vyplněného `config.js` hra běží v režimu „bez účtu“. Postup se pak ukládá jen v daném prohlížeči, což se hodí na lokální zkoušení.

## Co hra umí

- **Na začátku** si dítě vybere tvar akvária (klasické, panorama, kulaté, vysoký sloup), pozadí (Korálový útes, Říční džungle, Potopené město, Hlubina) a první rybku v otočném 3D náhledu. Změnit jde kdykoli tlačítkem „Upravit akvárium“.
- **Rybky za body:** první rybka se vylíhne po prvním potvrzeném úkolu. Každá další po nasbírání bodů, jejichž počet nastaví rodič v rodičovském režimu (výchozí 15). Body = odměna potvrzeného úkolu, +2 za splnění všech dnešních úkolů.
- **Základní a další úkoly:** základní vidí dítě hned, další se odemknou po splnění všech základních. Rodič nastaví, kolik úkolů smí dítě splnit za den (výchozí 6). Zlatá tabule (+2 body) je za všechny základní úkoly dne.
- **Plán dne:** v rodičovském režimu „Naplánovat zítřek“ – pro kterýkoli z příštích 7 dnů lze zaškrtnout, co bude na tabuli, přepnout základní/další a změnit pořadí. Bez úpravy platí týdenní rozvrh úkolů.
- **Nabídka úkolů** v administraci (21 úkolů) a vlastní úkoly s volitelnou mini-hrou.
- **19 mini-her:** Bacilí honička, Úklid do krabic, Zdravý talíř, Ustlaná postel, Plavba lodičky (časovač), Krok za krokem (rutina), Třídění odpadu, Aktovka, Prostírání, Mýdlová pěna, Šatník, Konvička, Miska, Lednička, Myčka, Rozcvička, Mořská matika, Srdíčková mušle, Uspávání.

---

## 1. Supabase (cca 10 minut)

1. Na [supabase.com](https://supabase.com) založ projekt. Region **Central EU (Frankfurt)**, tarif Free.
2. **SQL Editor → New query**: vlož obsah `supabase/schema.sql` a dej **Run**. Vznikne tabulka `families`, ve které každý rodič vidí jen svoji rodinu.
3. **Authentication → Sign In / Providers**: nech zapnutý **Email**.
4. **Authentication → Emails → Templates → Magic Link**: nahraď text šablonou níže, aby e-mail obsahoval i kód (na tabletu se zadává pohodlněji než odkaz):

   Předmět: `Přihlášení do Rybičkového akvária`

   ```html
   <h2>Přihlašovací kód</h2>
   <p>Tvůj kód: <strong style="font-size:24px;letter-spacing:4px">{{ .Token }}</strong></p>
   <p>Nebo klikni: <a href="{{ .ConfirmationURL }}">Přihlásit do akvária</a></p>
   ```
5. **Authentication → URL Configuration**:
   - **Site URL** = adresa webu, např. `https://rybickove-akvarium.netlify.app`
   - **Redirect URLs**: přidej tutéž adresu s `/**` na konci. Pro lokální test přidej i `http://localhost:8000/**`.
6. **Project Settings → API Keys**: zkopíruj **Project URL** a **anon / publishable key** do `config.js`. Anon klíč je veřejný záměrně. Data chrání pravidla v databázi (RLS), ne utajení klíče.

**E-maily:** vestavěné posílání v Supabase je určené jen na zkoušení. Pošle málo e-mailů za hodinu a podle aktuálních pravidel jen na adresy členů týmu projektu. Pro tvůj vlastní e-mail to stačí. Jakmile se má přihlašovat někdo další, nastav v **Authentication → Emails → SMTP Settings** vlastní SMTP (transakční e-maily např. z Ecomailu, Brevo nebo Resend).

## 2. Hosting

Stačí jakýkoli statický hosting s HTTPS. Bez HTTPS nejde instalace na plochu ani offline režim.

- **Netlify Drop (nejrychlejší):** přihlas se na netlify.com, otevři *app.netlify.com/drop* a přetáhni tam celou složku. Za chvíli máš adresu `https://…netlify.app`. V Site settings ji můžeš přejmenovat nebo připojit vlastní doménu.
- **Cloudflare Pages:** Workers & Pages → Create → Pages → Upload assets.
- **GitHub Pages / Vercel:** nahraj složku do repozitáře a zapni Pages nebo Import project. Build command nech prázdný.

Po nasazení doplň adresu webu do Supabase (krok 1.5).

## 3. Android tablet

1. Otevři adresu webu v **Chromu** a přihlas se e-mailem a kódem.
2. ⋮ → **Instalovat aplikaci** (nebo *Přidat na plochu → Instalovat*). Na ploše se objeví ikona s rybkou a hra se otevírá na celou obrazovku bez lišty prohlížeče.
3. Doporučení: **Nastavení → Zabezpečení → Připnutí aplikace**, aby dítě neodešlo z hry.

Přihlášení na tabletu vydrží, Supabase token sám obnovuje. Odhlášení je v rodičovském režimu (🔒 + PIN).

## 4. Lokální zkouška

```bash
cd rybickove-akvarium
python3 -m http.server 8000
# otevři http://localhost:8000
```

## 5. Úpravy

- Po každé změně souborů zvyš v `sw.js` hodnotu `VERSION` (např. `akvarium-v2`), aby si tablety stáhly novou verzi.
- `testTools: true` v `config.js` zapne v rodičovském režimu tlačítko „Test: další den“ pro rychlé zkoušení sérií a vzácných rybek.

## Jak funguje ukládání

- Jeden e-mail = jedna rodina. Celý stav (PIN rodiče, děti, úkoly, rybky, perličky) je jedna řádka v tabulce `families`.
- Ukládá se automaticky necelou vteřinu po každé změně. Offline se ukládá do zařízení a odešle se po připojení.
- Mezi zařízeními se změny přenášejí živě (Realtime) a také při návratu do aplikace.
- Při prvním přihlášení na zařízení, kde se už hrálo bez účtu, se dosavadní postup nahraje do účtu.
- Smazání účtu i s daty: Supabase → Authentication → Users → Delete user. Řádka rodiny se smaže automaticky.
