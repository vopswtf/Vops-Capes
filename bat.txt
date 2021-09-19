@ECHO off

REM Sets up the required variables
SETLOCAL
REM Set the path of the hosts file to %HOSTS_FILE%
SET "HOSTS_FILE=%WinDir%\System32\drivers\etc\hosts"
REM Create a temporary file to make the changes too
SET "TEMP_HOSTS_FILE=%TEMP%\%RANDOM%__hosts"

GOTO intro

:intro
    REM Prints the intro message
    echo " __     __                           ____                               "
    echo " \ \   / /   ___    _ __    ___     / ___|   __ _   _ __     ___   ___  "
    echo "  \ \ / /   / _ \  | '_ \  / __|   | |      / _` | | '_ \   / _ \ / __| "
    echo "   \ V /   | (_) | | |_) | \__ \   | |___  | (_| | | |_) | |  __/ \__ \ "
    echo "    \_/     \___/  | .__/  |___/    \____|  \__,_| | .__/   \___| |___/ "
    echo "                   |_|                             |_|                  "
    REM Continue to admin permission checking
    GOTO permissions

:options
    REM Let the user know the options they have
    ECHO Type one of the following (use the number)
    ECHO 1) Install (Install Custom Capes on this computer)
    ECHO 2) UnInstall (Remove Custom Capes from the computer)
    ECHO 3) Exit (Close this application)
    REM Take in user input and store it as %OPTION%
    SET /p choice=Type the number representing an option:

    if '%choice%'=='' (
        ECHO "%choice%" is not valid please try again
        GOTO options
    )
    if '%choice%'=='1' GOTO install
    if '%choice%'=='2' GOTO uninstall
    if '%choice%'=='3' EXIT

:permissions
    REM This attempts to add a registry key (This will fail without admin rights)
    REM the key already exists so will not be affected
    REG ADD HKLM /F>nul 2>&1
    if %ERRORLEVEL% == 0 (
        REM The user has admin permissions and can continue
        GOTO options
    ) else (
        REM The user does not have admin perms give them an error message
        ECHO ---------------------------------------------------------
        ECHO NO ADMIN PERMISSIONS
        ECHO ---------------------------------------------------------
        ECHO You did not run this with Admin permissions please run 
        ECHO it again but with Admin permission. To do so right click
        ECHO this file and click "Run as administrator"
        REM Pausing execution so the user can read the message
        PAUSE
        EXIT
    )

:install
    REM Create a temporary file that and put all of the hosts
    REM file contents in it excluding existing redirects
    FINDSTR /V "REPLACE_ME s.optifine.net # INSERTED BY MINECRAFT CAPES" "%HOSTS_FILE%" > "%TEMP_HOSTS_FILE%"
    REM Add the redirect to the new file
    ECHO REPLACE_ME s.optifine.net # INSERTED BY MINECRAFT CAPES >> "%TEMP_HOSTS_FILE%"
    REM Replace the Hosts file with the Temp file
    COPY /b/v/y "%TEMP_HOSTS_FILE%" "%HOSTS_FILE%"
    ECHO Install Complete
    REM Pausing execution so the user can read the message
    PAUSE
    EXIT

:uninstall
    REM Create a temporary file that and put all of the hosts
    REM file contents in it excluding existing redirects
    FINDSTR /V "REPLACE_ME s.optifine.net # INSERTED BY MINECRAFT CAPES" "%HOSTS_FILE%" > "%TEMP_HOSTS_FILE%"
    REM Replace the Hosts file with the Temp file
    COPY /b/v/y "%TEMP_HOSTS_FILE%" "%HOSTS_FILE%"
    ECHO UnInstall Complete
    REM Pausing execution so the user can read the message
    PAUSE
    EXIT