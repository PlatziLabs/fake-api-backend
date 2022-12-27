deploy:
	git push heroku master
seed:
	heroku run npm run seed
logs:
	heroku logs --tail
