const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

// Activer CORS pour toutes les routes
app.use(cors());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, '/')));

// Route proxy pour l'API recherche-entreprises
app.get('/api/entreprise', async (req, res) => {
  try {
    const siret = req.query.q;
    const page = req.query.page || 1;
    const perPage = req.query.per_page || 1;
    
    // Faire la requête à l'API externe
    const response = await axios.get(`https://recherche-entreprises.api.gouv.fr/search`, {
      params: {
        q: siret,
        page: page,
        per_page: perPage
      }
    });
    
    // Retourner les données au client
    res.json(response.data);
  } catch (error) {
    console.error('Erreur lors de la requête à l\'API:', error.message);
    res.status(500).json({ 
      error: 'Erreur lors de la requête à l\'API',
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur proxy démarré sur http://localhost:${PORT}`);
  console.log(`Accédez à l'application via http://localhost:${PORT}/ChequeNumerique.html`);
});
