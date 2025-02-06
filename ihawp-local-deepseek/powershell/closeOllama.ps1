$wow = Get-Process | Where-Object { $_.ProcessName -like "*ollama*" } | Select-Object Id

taskkill /F /PID $wow[0].id
taskkill /F /PID $wow[1].id