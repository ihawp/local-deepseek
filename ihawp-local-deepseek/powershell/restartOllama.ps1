$wow = Get-Process | Where-Object { $_.ProcessName -like '*ollama*' } | Select-Object Id

if ($wow.Count -ne 0) {
    foreach ($wo in $wow) {
        taskkill /F /PID $wo.id
    }
}

ollama serve
