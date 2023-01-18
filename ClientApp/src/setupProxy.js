const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:48256';

const context =  [
  "/weatherforecast",
  "/_configuration",
  "/.well-known",
  "/Identity",
  "/connect",
  "/ApplyDatabaseMigrations",
  "/_framework",
  "/api/login",
  "/api/login/ReCaptcha",
  "/api/login/validateSwtToken",
  "/api/login/isTokenValid",
  "/api/login/mailToConfirmedAddress",
  "/api/login/mailToUnconfirmedAddress",
  "/api/account/UpdateInstellingen",
  "/api/account/RegistreerKlant",
  "/api/account/UserNameCheck",
  "/api/account/WachtwoordCheck",
  "/api/account/EmailCheck",
  "/api/account/UpdateWachtwoord",
  "/api/account/UpdateVergetenWachtwoord",
  "/api/account/GetUser",
  "/api/account/DeleteUser",
  "/api/donatie/MaakDonatie",
  "/api/donatie/GetDonaties",
  "/api/donatie/Autoriseer",
  "/api/donatie/RondAutorisatieAf",
  "/api/artiestenportaal/MaakGroep",
  "/api/artiestenportaal/GetGroepen",
  "/api/artiestenportaal/SluitAan",
  "/api/artiestenportaal/Vertrek",
  "/api/artiestenportaal/MaakBoeking",
  "/api/artiestenportaal/EigenOptredens",
  "/api/zaal/GetZalen",
  "/api/optreden/GetOptreden",
  "/api/optreden/GetStoelen",
  "/api/ticketverkoop/GetStoelen",
  "/api/ticketverkoop/GetEigenTickets",
  "/api/Programmering/Voorstellingen",
  "/api/Programmering/Voorstelling",
  "/api/Programmering/Optredens",
  "/api/Programmering/Optreden",
  "/api/Account/GetMedewerkers",
  "/api/Account/GetAdmins",
  "/api/Account/GetArtiesten",
  "/api/Account/GetGroepen",
  "/api/Account/GetDonateurs",
  "/api/Account/RegistreerArtiest",
  "/api/Account/RegistreerAdmin",
  "/api/Account/RegistreerGroep",
  "/api/Programmering/NietBevestigdeOptredens",
  "/api/Programmering/BevestigdeOptredens",
  "/api/Programmering/BevestigOptreden"
];

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};
