$Env:VITE_PORT=3005
Start-Process -FilePath "powershell.exe"  -NoNewWindow -ArgumentList "npm run dev --prefix .\PortfolioClient\"
dotnet run