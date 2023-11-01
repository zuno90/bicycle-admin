dev:
	yarn dev

build:
	yarn build

deploy:
	yarn build
	git add .
	git commit -m "deploy prod"
	git push
