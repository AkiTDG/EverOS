/*
 OS' main U.I. it includes date and time viewer/checker function 
 */
export function homeMenu(){
   const date = new Date().toLocaleDateString()
   return `
 /$$$$$$$$                              /$$$$$$   /$$$$$$ 
| $$_____/                             /$$__  $$ /$$__  $$
| $$    /$$    /$$ /$$$$$$   /$$$$$$  | $$  \\ $$| $$  \\__/
| $$$$$|  $$  /$$//$$__  $$ /$$__  $$ | $$  | $$|  $$$$$$ 
| $$__/ \\  $$/$$/| $$$$$$$$| $$  \\__/ | $$  | $$ \\____  $$
| $$     \\  $$$/ | $$_____/| $$       | $$  | $$ /$$  \\ $$
| $$$$$$$$\\  $/  |  $$$$$$$| $$       |  $$$$$$/|  $$$$$$/
|________/ \\_/    \\_______/|__/       \\_______/  \\______/

 /\\  _   /~\\(~  (~. _ _    | _ _|_ _  _
/~~\\| |  \\_/_)  _)|| | ||_||(_| | (_)| 

+--------------------------------------------+
|============================================|
|     =======[Welcome to EverOS!]=======     |
| Today is:   ${date.padEnd(31)}|
| Time check: <span id="time-display">--:--</span>                    |
|============================================|
+--------------------------------------------+

+--------------------------------------------+
|============================================|
| Features & (command name):                 |
| +--------------------------------------+   |
| | A. Calculators                       |   |
| |    BMI calculator              (bmi) |   |
| |    Simple calculator          (calc) |   |
| | B. Converters                        |   |
| |    Day/Time converter          (dtc) |   |
| |    Temperature converter        (tc) |   |
| | C. Games                             |   |
| |    Ping pong                  (pong) |   |
| +--------------------------------------+   |
|                                            |
| Type "help" for important commands         |
| Press F5 (Or refresh icon) to restart OS   |
|============================================|
+--------------------------------------------+

`//<--NEVER REMOVE THIS LINE   
}
//help menu
export const helpMenu = `
+-------------------------------------------------------------------------+
|=========================================================================|
| Available commands:                                                     |
| [nav [feature]: Navigate to a feature (e.g. nav calc)         ]         |
| [exit: Exit current feature                                   ]         |
| [nav home: Go to home menu                                    ]         |
| [clear: Clear the console                                     ]         |
|                                                                         |
| Feature functions:                                                      |
| note: Features with * are under implementation/planning stage           |
|       Features with ^ are on beta stage                                 |
|                                                                         |
| A. Calculators:                                                         |
| [1. Simple Calculator (calc)]: Calculates simple mathematical problems  |
| [^2. BMI Calculator (bmi)]: Measures your Body Mass Index (BMI)         |
|                                                                         |
| B. Converters:                                                          |
| [1. Day/Time Converter (dtc)]:converts time units                       |
|     between days, hours, minutes, and seconds.                          |
| [2. Temperature Converter (tc)]: Converts Celsius to Fahrenheit         |
|      and vice-versa                                                     |
|                                                                         |
| C. Games:                                                               |
| [^1. Ping Pong (pong)]: A simple pong game vs AI (1st to 20 wins)       |
|                                                                         |
|=========================================================================|
+-------------------------------------------------------------------------+
`