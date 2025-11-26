#!/bin/bash

rm -r -f ./dist/*
dotnet publish -c Release --property:OutputPath=./dist/
cd PortfolioClient
npm run --silent build
cp -r dist ../../Portfolio/dist/publish/PortfolioClient/
cd ..