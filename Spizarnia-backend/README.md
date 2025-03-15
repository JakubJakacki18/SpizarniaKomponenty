# Spizarnia-backend
Spizarnia-backend to aplikacja służąca do obsługi bazy danych oraz do obsługi zapytań z części frontendowych. Dzięki wykorzystaniu **TypeORM** mogliśmy stworzyć tabele bazodanowe z relacjami za pomocą klas oraz atrybutów. Modele bazodanowe są wykorzystywane do przypisywania/sprawdzenia typów w projektach frontendowych co ułatwia utrzymanie spójności danych w całym projekcie.

## Wykorzystane paczki oraz ich wersje

## Zależności wymagane do uruchomienia projektu

Aby aplikacja działała poprawnie serwer MySql musi działać na porcie 3306 oraz posiadać domyślną konfigurację. Musi zostać stworzona baza danych o nazwie ``pantry``. 

## Uruchomienie projektu

## Ścieżki do zapytań


|Funkcja|Ścieżka|
|---|---|
|Obsługa żądań związanych z produktami z katalogu|<localhost:5000/api/productModel>|
|Obsługa żądań związanych z produktami ze spiżarni|<localhost:5000/api/product>|
|Obsługa żądań związanych z kategoriami|<localhost:5000/api/category>|
|Obsługa żądań związanych ze składnikami|<localhost:5000/api/ingredient>|
|Obsługa żądań związanych z przepisami|<localhost:5000/api/recipe>|
|Obsługa żądań związanych z listą zakupów|<localhost:5000/api/listOfProductsToBuy>|
|Obsługa powiadomień |<localhost:5000/api/>|
|Służy do sprawdzenia czy serwer jest włączony, zwraca napis "Hello"|<localhost:5000/api>|

