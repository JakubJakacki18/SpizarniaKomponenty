# Spizarnia

Spizarnia to aplikacja **SPA** napisana w angularze, która służy do zarządzania domowej spiżarni. Cały projekt jest napisany w języku **TypeScript**. Aby w pełni obsłużyć style kontrolek **Angular/Material** musieliśmy wykorzystać **Sassy Cascading Style Sheets**. Projekt korzysta z **ServiceWorker'a** do wysyłania powiadomień systemowych o przeterminowanych produktach. 

## Wymagane zależności

Aby aplikacja poprawnia działała musi być uruchomiona **spizarnia-backend** wraz z jej wymaganymi zależnościami. Wymagany jest również dostęp do modeli zapisanych w **spizarnia-backend**.

## Uruchomienie projektu

1. Zainstaluj **Node.js** w wersji **22.14.0**.
2. Sprawdź czy jest zainstalowany **npm** za pomocą `npm -v`
3. Zainstaluj Angular/cli za pomocą komendy `npm install -g @angular/cli@19.0.4`
4. Wpisz `npm install` aby zainstalować brakujące paczki.
5. Uruchom aplikację za pomocą `npm start` lub `ng serve`