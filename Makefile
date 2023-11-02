dev:
	yarn dev
build:
	yarn build

run_number ?= run_number
deploy:
	yarn build
	git add .
	git commit -m "deploy prod $(run_number)"
	git push
