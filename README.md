# Local Ollama UI Executable for Windows 10/11

https://github.com/user-attachments/assets/23fffc7d-586b-4533-9fc8-cde054ee60e0

## Requirements:
+ Ollama (https://ollama.com/download)
+ Node.js (https://nodejs.org/en/download)
+ PowerShell

## Setup:

### Windows 10/11

1. Install Ollama and Node.js.
2. Download an LLM from Ollama:
   + In Powershell, run ***ollama run deepseek-coder:6.7b*** to download the default model for this UI.
   + Alternatively, you can research other models available with Ollama (https://ollama.com).
3. Download the project folder and extract ***ihawp-local-deepseek*** to your ***C://*** or ***D://*** directory.
4. Open the ***/powershell*** folder, for each file right-click the file and click ***Properties***. A tab will open; at the bottom of that tab there will be a section titled '***Security***'. In this section click ***Unblock*** and then in the section below click ***Apply***.
5. Run the executable (ihawp-local-deepseek.exe).

**Note:** ***ExecutionPolicy*** must be set to ***RemoteSigned*** on your machine for Ollama to run:
1. Open PowerShell as an Administrator:
   + Right-click PowerShell in Search/Taskbar, then press ***Run as Administrator***.
2. Run this command: ***Set-ExecutionPolicy -ExecutionPolicy RemoteSigned***.

## Change Models:
+ Navigate to ***/ui/src/chat.js***, inside the ***fetch*** change the model where the model is specified in the ***response*** variable.

### Thanks for reading!
