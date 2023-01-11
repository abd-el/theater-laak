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
  "/api/login/validateToken",
  "/api/account/UpdateInstellingen",
  "/api/account/RegistreerKlant",
  "/api/account/UserNameCheck",
  "/api/account/WachtwoordCheck",
  "/api/account/UpdateWachtwoord",
  "/api/account/GetUser",
  "/api/donatie/MaakDonatie",
  "/api/donatie/GetDonaties",
  "/api/donatie/Autoriseer",
  "/api/donatie/RondAutorisatieAf",
  "/api/artiestenportaal/MaakGroep",
  "/api/artiestenportaal/GetGroepen",
  "/api/artiestenportaal/SluitAan",
  "/api/artiestenportaal/Vertrek",
  "/api/artiestenportaal/MaakBoeking",
  "/api/zaal/GetZalen",
  "/api/Programmering/Voorstellingen",
  "/api/Programmering/Voorstelling",
  "/api/Programmering/Optredens",
  "/api/Programmering/Optreden",
  "/api/Account/GetMedewerkers"
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
