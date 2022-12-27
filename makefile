deploy:
	git push heroku master
	curl -X POST https://fake-trello-api.herokuapp.com/api/v1/seed/
seed:
	heroku run npm run seed
logs:
	heroku logs --tail
