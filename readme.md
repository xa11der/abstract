aplikaciju je moguce pokrenuti na 2 nacina:

prvi nacin:
1. skinuti kod sa github-a i pozicionirati se na skinuti folder
2. npm install u tom folderu
3. node app.js ili npm start
4. pokrenuti postman, za metod izabrati GET, a za putanju npr. /admin/users > http://localhost:3000/admin/users
5. u autorization dodati API key u header koji ima ime key i value npr. ADMIN
6. adresa se izvlaci preko req.ip, sto znaci da ce response uvek biti false ukoliko adresa nije 100.100.100.100 (za json1 tj. rules1.json) ili u opsegu 100.100.100.1/28 (za json2 tj. rules2.json). za testiranje moze da se promeni ovaj parametar u json fajlu koji se testira*
7. ukoliko su rola i ip adresa zadovoljeni za admin putanju dobija se true u postman-u, u suprotnom false. ukoliko putanja nije /admin/* u postmanu se dobija nije admin putanja

drugi nacin:
1. skinuti kod sa github-a i pozicionirati se na skinuti folder
2. sudo docker build -t abstract-solution . (za win ne treba sudo)
3. sudo docker run -p 3000:3000 abstract-solution
4. pokrenuti postman, za metod izabrati GET, a za putanju npr. /admin/users > http://localhost:3000/admin/users
5. u autorization dodati API key u header koji ima ime key i value npr. ADMIN
6. adresa se izvlaci preko req.ip, sto znaci da ce response uvek biti false ukoliko adresa nije u opsegu 100.100.100.1/28 (docker container je napravljen sa json2 tj. rules2.json). pre pravljenja kontejnera moze da se promeni ovaj parametar u json fajlu koji se testira*
7. ukoliko su rola i ip adresa zadovoljeni za admin putanju dobija se true u postman-u, u suprotnom false. ukoliko putanja nije /admin/* u postmanu se dobija nije admin putanja

    *json fajl se ucitava u fajlu mware.js i po default je namesten json2