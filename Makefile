ENV ?= dev
VERSION ?= patch

setup:
	cp .env.example .env

copy-files:
	cp ./environments/$(ENV).env .env

setup-env:
	make copy-files
	make update-version

update-version:
	node ./scripts/update-version.js

bump-version:
	npm version $(VERSION) -m "chore: release a new version %s"

run-dev:
	nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/server.ts --verbose

start-dev:
	make setup-env
	make run-dev

debug-ts:
	ENV=dev make setup-env
	nodemon --config ./nodemon.json
