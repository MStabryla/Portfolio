Remove-Item -Recurse -Force ./dist/
dotnet publish -c Release --property:OutputPath=./dist/
Set-Location PortfolioClient
npm run --silent build
Copy-Item -Recurse -Force dist ../../Portfolio/dist/publish/PortfolioClient/
Copy-Item -Recurse -Force src/assets ../../Portfolio/dist/publish/PortfolioClient/dist
Set-Location ..