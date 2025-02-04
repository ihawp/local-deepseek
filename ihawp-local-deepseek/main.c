#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void main();
int directoryExists(const char *path);


void main() {


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
	system("start powershell.exe start \"\" \"http://localhost:5173\"");


	/*

		Open a new Powershell window.
		change to project path (this will have to change to make it useful app,
					I'm sure there is a way to search the computer
					for a project..? or something of the sort... without
					having to make the user input in a powershell window the
					path to the directory that 'npm run dev' should be run in).
		Run 'npm run dev'.

	*/
    char path[] = "D://ihawp-local-deepseek/ui";

    if (chdir(path) == -1) {
        *path = 'C';
        chdir(path);
    }
    system("start powershell.exe npm run dev");

    char command[200];
    sprintf(command, "start powershell.exe %c://ihawp-local-deepseek/hidePowershellCMD.ps1", *path);

    system(command);

}
