let bmiState={step:0,name:"",heightInput:"",weightInput:"",height:0,weight:0};function parseHeight(value){const input=value.trim().toLowerCase();if(input.endsWith("cm")){const cm=parseFloat(input);return cm/100}if(input.endsWith("m")){return parseFloat(input)}if(input.endsWith("in")){const inches=parseFloat(input);return inches*.0254}if(input.endsWith("ft")&&!input.includes("in")){const ft=parseFloat(input);return ft*.3048}const ftInRegex=/(\d+)\s*(?:ft|')\s*(\d+)?\s*(?:in|")?/;const match=input.match(ftInRegex);if(match){const ft=parseInt(match[1]);const inches=parseInt(match[2])||0;return(ft*12+inches)*.0254}const val=parseFloat(input);if(!isNaN(val))return val;return NaN}function parseWeight(value){const input=value.trim().toLowerCase();if(input.endsWith("kg"))return parseFloat(input);if(input.endsWith("lbs")||input.endsWith("lb"))return parseFloat(input)*.453592;const val=parseFloat(input);if(!isNaN(val))return val;return NaN}function BMIformula(weight,height){return weight/(height*height)}function BMIClassifier(bmi){if(bmi<18.5)return"[Underweight]";if(bmi>=18.5&&bmi<25)return"[Normal weight]";if(bmi>=25&&bmi<30)return"[Overweight]";if(bmi>=30)return"[Obese]";return"[Unknown]"}function getCurrentDateString(){const now=new Date;return now.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})+" "+now.toLocaleTimeString("en-US")}function saveBMIRecordBrowser(name,heightInput,weightInput,bmiStatus){const date=getCurrentDateString();const content=`
+---------------------------------------+
|=======================================|
|     [Your official BMI Receipt]	      |	  	
|=======================================|
+---------------------------------------+

+---------------------------------------+
|=======================================|
|Name: ${name.toUpperCase()}	  	      |
|=======================================|
|Height: ${heightInput.toUpperCase()}	  |
|Weight: ${weightInput.toUpperCase()}	  |
|BMI Status: ${bmiStatus.toUpperCase()} |
|Date Taken: ${date.toUpperCase()}	    |
|=======================================|
|[This receipt is made on EverOS]	      |
|=======================================|
+---------------------------------------+`;const blob=new Blob([content],{type:"text/plain"});const url=URL.createObjectURL(blob);const a=document.createElement("a");const filename=`BMI_${name.replace(/\s+/g,"_")}_${date.replace(/[:\s]/g,"-")}.txt`;a.href=url;a.download=filename;document.body.appendChild(a);a.click();setTimeout(()=>{document.body.removeChild(a);URL.revokeObjectURL(url)},0)}export function BMICalculator(input,writeToConsole){switch(bmiState.step){case 0:writeToConsole("Enter your name:");bmiState.step=1;break;case 1:bmiState.name=input;writeToConsole("Enter your height (e.g. 175cm, 5ft 7in, 1.75m):");bmiState.step=2;break;case 2:bmiState.heightInput=input;bmiState.height=parseHeight(input);if(isNaN(bmiState.height)||bmiState.height<=0){writeToConsole("[Error: Invalid height format. Try again:]");return}writeToConsole("Enter your weight (e.g. 70kg, 154lbs):");bmiState.step=3;break;case 3:bmiState.weightInput=input;bmiState.weight=parseWeight(input);if(isNaN(bmiState.weight)||bmiState.weight<=0){writeToConsole("[Error: Invalid weight format. Try again:]");return}const bmi=BMIformula(bmiState.weight,bmiState.height);const status=BMIClassifier(bmi);const result=`${bmiState.name}, your BMI is ${bmi.toFixed(2)} — ${status}`;writeToConsole(result);bmiState.result=`${bmi.toFixed(2)} — ${status}`;writeToConsole("Would you like to save this as a record? (y/n):");bmiState.step=4;break;case 4:if(input.toLowerCase()==="y"){saveBMIRecordBrowser(bmiState.name,bmiState.heightInput,bmiState.weightInput,bmiState.result);writeToConsole("Thank you for using this feature.\n");bmiState={step:0}}else if(input.toLowerCase()==="n"){writeToConsole("Thank you for using this feature.\n");bmiState={step:0}}else{writeToConsole("Enter y or n only.")}break;default:writeToConsole("Unexpected state. Resetting...");bmiState={step:0}}}export const bmiUi=`
+------------------------------------------------+
|================================================|
| Body Mass Index (BMI) Calculator               |
|                                                |
| <==Operations==>                               |
| [Enter name first]                             |
| [Enter height next (Supports: cm, m, ft & in)] |
| [Then enter weight (Supports: kg & lbs)]       |
| [Result will show after inputs]                |
| [Type anything to continue]                    |
|================================================|
+------------------------------------------------+`;
