# Local Ollama/Deepseek UI Executable for Windows 10

## Requirements:
+ Ollama
+ Powershell
+ Node.js

## Setup

### Windows 10... 11?

Use the Windows key to search things like 'Powershell', 'File Explorer' if mentioned.

1. Install Ollama (https://ollama.com/download).
  2. Install a LLM:
  In Powershell run ***ollama run deepseek-coder:6.7b***. This will download and eventually allow you to chat with the model.
  ***Alternatively***, you can research the DeepSeek models available with Ollama (https://ollama.com) and update ***ui/chat.js*** as explained in ***Change Models*** below.
  The models are quite large in terms of Disk Space. If the number of gigabytes that appears scares you when you run the above command press ***CTRL + C*** (hold down ***CTRL*** and press ***C*** a few times).
3. Download ***ihawp-local-deepseek*** to your ***C://*** or ***D://*** directory.
4. Right-click the .exe (executable), or compile main.c, and click 'Pin To Taskbar'.
5. In a new Powershell window navigate from ***X://*** to ***X://ihawp-local-deepseek/ui***.
6. In the same Powershell window, in the directory we just navigated to, run ***npm install***.
7. Open the .exe (executable) from your taskbar by pressing the Shooting Star Icon and enjoy!

#### Note:
***ExecutionPolicy*** must be set to ***RemoteSigned*** on your machine for Ollama to run. I assume you will run into this issue before opening my ***.exe*** since you will download and run whichever Ollama model you download and it will get mad about it first. Anywho, heres some instructions to deal with that if you're still waiting for the LLM to download.
1. Start PowerShell as an administrator.
2. Run the command ***Set-ExecutionPolicy -ExecutionPolicy RemoteSigned***.

## Change Models:
+ Navigate to ***ui/chat.js***, inside the ***fetch*** change the model where the model is specified in the ***response*** variable.

## Thoughts:
+ Node.js could be removed as a dependency.
+ Make sure it will work if in ***D://*** directory.
+ Maybe it could all just be a Powershell file... but I want to try something; have C host a server that can recieve a request from the JS when the user closes the tab to end the Powershell instances.

### Thanks for reading!
