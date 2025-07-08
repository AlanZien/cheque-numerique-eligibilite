const axios = require('axios');

exports.handler = async function(event, context) {
  // Récupérer les paramètres de la requête
  const { q, page = 1, per_page = 1 } = event.queryStringParameters || {};
  
  // Vérifier que le paramètre q est présent
  if (!q) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Le paramètre q (SIRET) est requis' })
    };
  }
  
  try {
    // Faire la requête à l'API externe
    const response = await axios.get('https://recherche-entreprises.api.gouv.fr/search', {
      params: {
        q,
        page,
        per_page
      }
    });
    
    // Retourner les données au client
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Autoriser toutes les origines
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.log('Erreur lors de la requête à l\'API:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        error: 'Erreur lors de la requête à l\'API',
        message: error.message 
      })
    };
  }
};
