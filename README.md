# 🌐 ODNS Extension

> Redefiniujemy sposób, w jaki działa internet.

## 🚀 O projekcie

**ODNS (Open Domain Name System)** to rozszerzenie do przeglądarki, które pozwala korzystać z alternatywnego systemu domen **bez użycia tradycyjnego DNS**.

Rozszerzenie przechwytuje zapytania do domen i przekształca je według własnych zasad, umożliwiając dostęp do zasobów w zdecentralizowanej sieci.

---

## ⚙️ Jak to działa

1. Użytkownik wpisuje domenę (np. `example.odns`)
2. Rozszerzenie:
   - przechwytuje żądanie  
   - sprawdza mapowanie domeny  
   - przekierowuje do odpowiedniego zasobu (IP / hash / URL)  
3. Strona ładuje się bez użycia DNS

---

## ✨ Funkcje

- 🔄 Przechwytywanie zapytań domenowych  
- 🌍 Własny system rozwiązywania nazw  
- 🔐 Opcjonalne zabezpieczenia (np. podpisy domen)  
- ⚡ Szybkie lokalne mapowanie  

---

## 🧩 Integracja

- 🦁 Brave - Działa ✅
- 🌐 Chromium / 🔰 Chrome - Działa ✅
- ⭕ Opera - Nie działa ❌
- 🔥 Firefox - Działa ✅
- 🧅 Tor - Działa ✅


---

## 🛠️ Instalacja (tryb developerski)

1. Pobierz repozytorium:
```bash
git clone https://github.com/OpenDomain-network/odns-extensions 
```

2. Otwórz przeglądarkę opartą na Chromium

3. Wejdź na:
```
chrome://extensions/
```

4. Włącz **Tryb deweloperski**

5. Kliknij:
```
Załaduj rozpakowane
```

6. Wybierz folder extentions

---

## 📁 Struktura projektu

```
extensions/
├── background.js
├── content_script.js
├── manifest.json
├── newtab.js
├── options.html
├── popup.css
├── popup.html
├── popup.js
├── tab.css
├── tab.html
├── backend/
├── icons/
│   ├── 16.png
│   └── security/
│       ├── no.png
│       └── yes.png
└── settings/
    ├── 404.html
    ├── main.css
    ├── main.html
    └── main.js


```

---

## 🔐 Bezpieczeństwo

ODNS wprowadza nowe podejście do domen, co oznacza też nowe ryzyka:

- brak centralnej weryfikacji  
- możliwość spoofingu domen  
- zależność od lokalnych danych  

Zalecenia:
- używanie podpisów
- walidacja źródeł  
- ostrożność  

---

## ⚠️ Status projektu

🧪 **Eksperymentalny** (beta)

---

## 📜 Licencja

MIT License

---

## 💡 Wizja

Internet bez DNS.  
Bez pośredników.  
Większa kontrola użytkownika.
