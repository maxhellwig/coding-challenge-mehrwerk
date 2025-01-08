# Coding Challenge Mehrwerk
## Grundsätzliche Überlegung
Für die Umsetzung dieser App entscheide ich mich für die Verwendung von Redux entschieden.
Mir ist bewusst, dass Redux für diese Showcase-App übertrieben wirken kann. Jedoch zeigt die Erfahrung, dass Frontend-Code langfristig besser wartbar bleibt, wenn es einen klar definiten Weg gibt, wie State über die Zeit verändert wird.
Es ist etwas mehr Aufwand es zu schreiben, aber es wesentlich leichter zu warten. Aus meiner Sicht sollte Code nicht auf die paar Stunden hin optimiert werden, in denen er geschrieben wird, sondern auf die hunderte von Stunden, in denen er gewartet wird.
Außerdem habe ich mir, im Zuge dieser kleinen Demo-App, redux-toolkit angesehen und bin sehr angetan, wie einfach die Verwendung von redux damit geworden ist.

## Einschränkungen
Folgende Punkte ignoriere ich bewusst bei der Umsetzung dieser App:
* Pagination
  * Obwohl die Listen-Api anscheinend Paginierung unterstützt, habe ich mich dagegen entscheiden, da aktuell offenbar nur eine Seite mit 6 Einträgen existiert und ich an dieser Stelle nicht den Scope vergrößern wollte.

## Hinweis
Bitte tragen Sie die credentials in die Datei "src/credentials.ts" ein. Mir ist bewusst, dass es sich um eine Demo API handelt, aber Secrets gehören nicht in die Versionsverwaltung.

## Aufgabe 1: Authentifizierung
### Anmerkungen
Ich habe mich dafür entschieden, das Auth token nur im Speicher aufzubewahren und es weder in localStorage noch in ein Cookie zu speichern.
Alle drei Varianten haben vor und Nachteile, daher habe ich mich für die einfachste Variante entschieden. LocalStorage und Cookies ermöglichen den Zugriff via JavaScript und ermöglichen damit XSS-Attacken.
Bei jedem Page-Reload wird das Token erneut vom Server abgerufen, was der Nutzung eines refresh tokens ähnelt.

> Do not store session identifiers in local storage as the data is always accessible by JavaScript. Cookies can mitigate this risk using the httpOnly flag.
> https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#storage-apis und  https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html

> https://stackoverflow.com/questions/48712923/where-to-store-a-jwt-token-properly-and-safely-in-a-web-based-application

Da es sich bei den nachfolgenden Requests lediglich um GET-Requests handelt, ist das Risiko zwar gering, aber auch so bleibt das Handling des Tokens sehr einfach.

## Aufgabe 2: Abruf der Liste aller Shops
Nachdem das Auth-Token abgerufen und im Redux-Store hinterlegt ist, wird beim Laden der Shopliste der Endpoint `https://testapi.mehrwerk.de/v3/cashback/shops` aufgerufen.
Hierfür wird eine definierte Query über redux-toolkit verwendet, die das Ergebnis im redux-store ablegt.
Da ich redux-toolkit Query verwende, wird Caching und Error-Handling ohne großen Aufwand mit geliefert.

## Aufgabe 3: Darstellen der Shops als Grid
Für die einfache Darstellung habe ich mit Chakra UI eine Component-Library installiert. Natürlich hätte ich auch selbst CSS dafür schreiben können, aber die gelieferten Components erwiesen sich als gut durchdacht, sodass ich schnell voran gekommen bin.
Ob ein Shop als Favorit markiert ist, kann auf der jeweiligen Kachel des geändert werden. Die Änderung wird im State hinterlegt und überlebt einen Page reload natürlich nicht. Ich habe versucht eine Patch Operation auf dem jeweiligen Shop anzuwenden, aber die Methode ist serverseitig offensichtlich nicht implementiert worden.

## Aufgabe 4: Implementierung der Shop-Detailseite
Jede Kachel in der Liste hat eine Detailseite mit dem Logo, dem Namen, der Beschreibung (gekürzt auf 140) Zeichen, der verfügbaren Cacheback-Raten und der Kategorien.  
Von jeder Detailansicht kann zurück zur Übersicht navigiert werden.

## Aufgabe 5: Verbesserung der Nutzererfahrung
-  Error handling
  - Für jeden API Call wird von redux-toolkit ein result-set aus (data, loading, error) bereitgestellt, diese habe ich für die drei Requests, Auth, Shop-List, Shop-Item, gerendered.
- Caching
  - Da redux-toolkit einen Caching-Mechanismus für api requests zur Verfügung stellt, habe ich hier keine weiteren Maßnahmen ergriffen.
  - Generell sollte Caching auch eher Server-seitig über die Cache-Control Headers, damit die Browser sich darum kümmern können.
  - Wie gefordert werden die Results der GET-Requests nach 10 min. im redux State invalidiert und erneut vom Server abgerufen.
- Optik, naja 🤷 Da hat ein Designer ein besseres Auge für und ich setze es dann gerne um.
