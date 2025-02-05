#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void main();

void main() {

    /*

        Initialize the path variable... it will find the files you need!
        Initialize the command variable.

    */
    char path[] = "D://ihawp-local-deepseek/ui";
    char command[100];

	/*

		Serve Ollama locally from Ollama (required local app and preinstalled LLM models 
		and whatnot but of course you can change the models being used and what not in 
		the JS files).

		ExecutionPolicy needs to be set to RemoteSigned (I'll leave this up to the user)

	*/
	system("start powershell.exe ollama serve");


	/*

		Open the default port for the react project in users default browser.

	*/
	system("start \"\" \"http://localhost:5173\"");


	/*

		Open a new Powershell window.
		Change to proper path (change path based on ihawp-local-deepseek existing in C:// or D://).
		Run 'npm run dev'.

	*/
    if (chdir(path) == -1) {
        *path = 'C';
        chdir(path);
    }
    system("start powershell.exe npm run dev");

    sprintf(command, "start powershell.exe %c://ihawp-local-deepseek/powershell/hidePowershellCMD.ps1", *path);
    system(command);

}
