# Zdrowy Talerz – sklep internetowy
https://kokolodziejska.github.io/zdrowy-talerz/

## Opis i podejście
Aplikacja to prosty sklep internetowy stworzony w oparciu o **React**, **TypeScript** i **Vite**.  
Została zaprojektowana z myślą o **łatwym rozszerzaniu** i **skalowalności** – zarówno na poziomie frontendowym, jak i potencjalnego połączenia z backendem.

Do zarządzania stanem koszyka wykorzystano **Redux Toolkit**, a dane są przechowywane w **LocalStorage**, co pozwala użytkownikowi kontynuować zakupy nawet po odświeżeniu strony.

Dzięki **React Router DOM** możliwe jest wygodne i intuicyjne przechodzenie pomiędzy stronami.  
Strona potwierdzenia zamówienia jest realizowana jako **osobny statyczny plik HTML**, zgodnie z wymaganiem pełnego przeładowania.

## Założenia projektu
- Koszyk produktów z możliwością dodawania, usuwania i zmiany ilości
- Walidacja: nie można złożyć zamówienia z pustym koszykiem
- Zapamiętywanie zawartości koszyka (localStorage)
- Przejrzysty routing z użyciem React Router
- Potwierdzenie zamówienia w osobnym pliku `confirmation.html`


## Instrukcja uruchomienia
1. Zainstaluj zależności
```bash
npm install
```
2. Uruchom aplikacje lokalnie
```bash
npm run dev
```
