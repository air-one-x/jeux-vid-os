<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;

//=============================================================================
// /!\ LE MIDDLEWARE POUR RESUMER
//-----------------------------------------------------------------------------
// Le middleware s'exécute AVANT les autres composants, comme le routeur.
// Ici, il nous sert a deux choses :
//  - Gérer et répondre aux Request OPTIONS qui sont envoyées à l'API
//  - Préparer les Response aux autres Request en pré-ajoutant les headers 
// De cette façon, on n'a pas à les rajouter à la main dans chaque controller
//=============================================================================

class Cors
{
    //=============================================================================
    // Gère les soucis de CORS de TOUTES les requêtes entrantes de l'API
    //-----------------------------------------------------------------------------
    // Cette méthode est exécutée AVANT le routeur
    //=============================================================================

    public function handle( Request $request, \Closure $next )
    {        
        // On définit des en-têtes HTTP qui seront nécessaire plus tard
        $headers = 
        [
            // On autorise tout les noms de domaines a envoyer des requêtes à l'API
            'Access-Control-Allow-Origin'  => '*',
            // On autorise les méthodes suivantes
            'Access-Control-Allow-Methods' => 'GET, POST, PATCH, PUT, DELETE',
            // On autorise les requêtes a fournir les en-têtes suivants
            'Access-Control-Allow-Headers' => 'Accept, Content-Type, Authorization, X-Requested-With'
        ];

        // Fetch() en JS fait d'abord une requête en method OPTIONS pour savoir
        // entre autre, quelles methodes (verbes HTTP) notre API autorise
        // /!\ Si fetch ne reçoit pas cette réponse, il n'enverra pas la "vraie" requête !
        if( $request->isMethod( "OPTIONS" ) )
        {
            // On lui renvoi donc directement une response, sans contenu (null)
            // avec un code 200 (OK) et les en-têtes définit plus haut
            // qui serviront a "répondre" (Response) à la "question" (Request) de fetch
            return response()->json( null, 200, $headers );
        }
        // Pour tout les autres types de requêtes (GET, POST, PATCH, PUT, DELETE)
        else
        {
            // On "prépare" la prochaine Response à notre $request
            // qui sera renvoyée par notre controller
            // /!\ $next est une variable qui contient une fonction
            // Ne vous embrouillez pas avec ça, sachez juste qu'il prends
            // notre Request en paramètre et retourne une Response adaptée
            $response = $next( $request );
            
            // On ajoute à cette Response les headers précédents
            // pour dire spécifier quelles méthodes sont autorisées etc
            foreach( $headers as $key => $value )
                $response->header( $key, $value );
    
            // Enfin, on renvoi notre Response à qui de droit (ici le Routeur)
            return $response;
        }
    }
}