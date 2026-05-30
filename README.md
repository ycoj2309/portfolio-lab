# Portfolio IA & Data - Jahdiel Kinvi

Webapp statique pour GitHub Pages, reconstruite autour des criteres de notation du portfolio IA.

## Contenu couvert

- 6 projets detailles : NBA, Olist, Mirakl Nexus, PayFit SEO/GEO, Todomaking, Safran / methodes industrielles.
- Competences classees avec images : IA, Data/BI, Dev/outils, Methodes/industrie.
- Certifications, diplomes, documents PDF et liens externes.
- Portfolio bilingue FR / EN.
- Assistant portfolio avec fallback local et point d'extension `window.PORTFOLIO_AI_ENDPOINT`.
- PWA simple avec cache des fichiers principaux.

## Deploiement GitHub Pages

1. Creer un depot GitHub.
2. Ajouter tous les fichiers du dossier `Portfolio`.
3. Dans GitHub, aller dans `Settings > Pages`.
4. Choisir `Deploy from a branch`, branche `main`, dossier `/root`.
5. Ouvrir l'URL GitHub Pages fournie.

## CV

Aucun fichier CV n'a ete detecte dans le dossier au moment de la reconstruction. Ajouter ensuite, par exemple :

- `cv-jahdiel-kinvi-fr.pdf`
- `cv-jahdiel-kinvi-en.pdf`

Puis remplacer l'entree `CV FR / EN` dans `app.js`.

## Assistant IA

Par defaut, le chatbot repond depuis une base locale. Pour brancher Dust/OpenAI, exposer un endpoint backend et definir avant `app.js` :

```html
<script>
  window.PORTFOLIO_AI_ENDPOINT = "https://votre-endpoint.example/chat";
</script>
```

Ne jamais exposer de cle API directement dans le frontend.
