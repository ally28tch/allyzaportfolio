# Allyza Aclan Portfolio (XAMPP / PHP / MySQL)

## Run it on any laptop
1. Install XAMPP, open the Control Panel, Start Apache and MySQL.
2. Put this folder in C:\xampp\htdocs\ and name it allyza.
3. Open http://localhost/phpmyadmin, click Import, choose database.sql, click Import.
4. Open http://localhost/allyza/php/check.php. Every line should be green.
5. Site: http://localhost/allyza/index.html (or index.htm if that is your file name)
   Admin: http://localhost/allyza/admin.html (username allyzaaclan, password allyza2006)

Always open the site through http://localhost/. Never double-click the HTML files, and do not use Live Server.

## Move it with GitHub
On your laptop (once):
    git init
    git add .
    git commit -m "Portfolio"
    git branch -M main
    git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
    git push -u origin main
On the presentation laptop:
    Install XAMPP and Git, then run this inside C:\xampp\htdocs\
    git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git allyza
Then do steps 1, 3, 4 and 5 above. The database is not stored in GitHub, so import database.sql again on the new laptop (orders and messages start empty).
Git skips empty folders, so make sure images/payments and images/social contain at least one file.

## Settings
- Admin login and database login: php/config.php
- Payment number and social links: top of script.js
