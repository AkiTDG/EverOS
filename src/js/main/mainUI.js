export function homeMenu(){
   const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
    });
   return `
 /$$$$$$$$                              /$$$$$$   /$$$$$$ 
| $$_____/                             /$$__  $$ /$$__  $$
| $$    /$$    /$$ /$$$$$$   /$$$$$$  | $$  \\ $$| $$  \\__/
| $$$$$|  $$  /$$//$$__  $$ /$$__  $$ | $$  | $$|  $$$$$$ 
| $$__/ \\  $$/$$/| $$$$$$$$| $$  \\__/ | $$  | $$ \\____  $$
| $$     \\  $$$/ | $$_____/| $$       | $$  | $$ /$$  \\ $$
| $$$$$$$$\\  $/  |  $$$$$$$| $$       |  $$$$$$/|  $$$$$$/
|________/ \\_/    \\_______/|__/        \\______/  \\______/

+--------------------------------------------------+
|==================================================|
|        =======[Welcome to EverOS!]=======        |
| Today is:   ${date.padEnd(37)}|
| Time check: ${time.padEnd(37)}|
|==================================================|
+--------------------------------------------------+

+--------------------------------------------+
|============================================|                                            
| Features & (command name):                 |
|                                            |
| [1.Simple Calculator          (calc)]      |
| [2.Metric system converter     (msc)]      |
| [3.Temperature converter        (tc)]      |
| [4.Day/Time converter          (dtc)]      |
|                                            |
| Type "help" for important commands         |
| Press F5 (Or refresh icon) to restart OS   |
|============================================|                                            
+--------------------------------------------+`;   
}

//help menu
export const helpMenu = `
+---------------------------------------------------------------------------------+
|=================================================================================|
| Available commands:                                                             |
| [nav [feature]: Navigate to a feature (e.g. nav calc)         ]                 |
| [xexit: Exit current feature(This command is deprecated)      ]                 |
| [nav home: Go to home menu                                    ]                 |
| [clear: Clear the console                                     ]                 |                                           
|                                                                                 |                                           
| Feature functions:                                                              |                                           
| note: Features with * are under implementation                                  |                                            
| [1. Simple Calculator (calc)]: Calculates simple mathematical problems          |                                            
| [2. Metric system converter (msc)]*: Calculates any metric system measurement   |
| [3. Temperature converter (tc)]*: Converts degree to fahrenheit & vice versa    |
| [4. Day/Time converter (dtc)]*: Calculates the measurement of time              |                                                                               
| in its equivalents (e.g., days to hours and vice-versa)                         |
|=================================================================================|                                                                                                                       
+---------------------------------------------------------------------------------+ 
`;
