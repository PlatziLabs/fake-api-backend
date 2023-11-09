deploy:
	git push heroku master
add:
  heroku git:remote -a fierce-brook-83918
seed:
	heroku run npm run seed
logs:
	heroku logs --tail
