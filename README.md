# 🌐 ODNS Extension

> Browse without DNS. Because why make things simple?

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
- 🧩 Integracja z Chromium (Chrome, Edge, Opera)

---

## 🛠️ Instalacja (tryb developerski)

1. Pobierz repozytorium:
```bash
git clone https://github.com/opendomain-network/odns-extension.git
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

6. Wybierz folder projektu

---

## 📁 Struktura projektu

```
odns-extension/
│
├── manifest.json
├── background.js
├── content.js
├── resolver/
│   └── resolver.js
├── ui/
│   └── popup.html
└── assets/
```

---

## 🔐 Bezpieczeństwo

ODNS wprowadza nowe podejście do domen, co oznacza też nowe ryzyka:

- brak centralnej weryfikacji  
- możliwość spoofingu domen  
- zależność od lokalnych danych  

Zalecenia:
- używanie podpisów kryptograficznych  
- walidacja źródeł  
- ostrożność  

---

## ⚠️ Status projektu

🧪 **Eksperymentalny**

To nie jest produkcyjny system.

---

## 🧑‍💻 Wkład

Pull requesty mile widziane.

---

## 📜 Licencja

MIT License

---

## 💡 Wizja

Internet bez DNS.  
Bez pośredników.  
Większa kontrola użytkownika.
