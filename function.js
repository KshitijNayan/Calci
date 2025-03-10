let newTrue = false;
let brac_count=0;
let decimal_accuracy=2;

//for counting no. of times check's elements occur in exp
function fun_count(exp,check)
{
    let count=0;
    for(let j=0;j<check.length;j++)
    {
        for(let i=0;i<exp.length-check[j].length;i++)
        {        
            if(exp.substring(i,i+check[j].length)==check[j])
            {
                count++;
                i+=check[j].length;
            }
        }
    }
    return count;
}

//function checking whether a character is eithernumber or decimal
function isDigit(char) 
{
    return (char >= '0' && char <= '9')||char=='.';
}

//function for evaluating each bracket
function Evaluate(exp)
{
    let new_exp=exp.substring(1,exp.length-1);
    let fun_times=fun_count(new_exp,['√','^'])
    for(let j=0;j<fun_times;j++)
    {
        new_exp=new_exp.replace(/(\d+(\.\d+)?)\^(\d+(\.\d+)?)/g, (match, base, _, exponent) => {
            return parseFloat(Math.pow(parseFloat(base), parseFloat(exponent)).toFixed(decimal_accuracy));});
        new_exp=new_exp.replace(/(\d+(\.\d+)?)\√(\d+(\.\d+)?)/g, (match, base, _, exponent) => {
            return parseFloat(Math.pow(parseFloat(exponent), parseFloat(1/base)).toFixed(decimal_accuracy));});
    }
    
    fun_times=fun_count(new_exp,['sin','cos','tan','log'])
    for(let j=0;j<fun_times;j++)
    {
        new_exp=new_exp.replace(/sin(\d+(\.\d+)?)/g, (match, num) => {
            return Math.sin(parseFloat(num) * (Math.PI / 180)).toFixed(decimal_accuracy); });
        new_exp=new_exp.replace(/tan(\d+(\.\d+)?)/g, (match, num) => {
            let radians = parseFloat(num) * (Math.PI / 180);
            let tanValue = Math.tan(radians);
        
            // Handle large values (like tan(90) which approaches infinity)
            if (!isFinite(tanValue)) 
            {
                document.getElementById('display').value="Math Error!";
                newTrue = true;
                return;
            }
        
            return tanValue.toFixed(decimal_accuracy);
        });
        new_exp=new_exp.replace(/cos(\d+(\.\d+)?)/g, (match, num) => {
            return Math.cos(parseFloat(num) * (Math.PI / 180)).toFixed(decimal_accuracy); });
        new_exp=new_exp.replace(/log(\d+(\.\d+)?)b(\d+(\.\d+)?)/g, (match, base, _, num) => {
            base = parseFloat(base);
            num = parseFloat(num);
        
            if (base <= 0 || base === 1 || num <= 0) 
            {
                document.getElementById('display').value="log undefined!"; // Logarithm is undefined for these cases
                newTrue = true;
                return;
            }
        
            let logValue = Math.log(num) / Math.log(base);
            return logValue.toFixed(decimal_accuracy);
        });
    }

    fun_times=fun_count(new_exp,['/','%'])
    for(let j=0;j<fun_times;j++)
    {
        new_exp=new_exp.replace(/(\d+(\.\d+)?)\/(\d+(\.\d+)?)/g, (match, num1, _, num2) => {
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
        
            if (num2 === 0) 
            {
                document.getElementById('display').value="Division by 0!"; // Handling division by zero
                newTrue = true;
                return;
            }
        
            let divValue = num1 / num2;
            return divValue.toFixed(decimal_accuracy);
        });
        new_exp=new_exp.replace(/(\d+(\.\d+)?)\%(\d+(\.\d+)?)/g, (match, num1, _, num2) => {
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
        
            if (num2 === 0) 
            {
                document.getElementById('display').value="Modulus by 0!"; // Handling division by zero
                newTrue = true;
                return;
            }
            let modValue = num1 % num2;
            return modValue.toFixed(decimal_accuracy);
        });
    }
    
    fun_times=fun_count(new_exp,['*','x'])
    for(let j=0;j<fun_times;j++)
    {
        new_exp=new_exp.replace(/(\d+(\.\d+)?)\x(\d+(\.\d+)?)/g, (match, num1, _, num2) => {
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
        
            let mulValue = num1 * num2;
            return mulValue.toFixed(decimal_accuracy);
        });
        new_exp=new_exp.replace(/(\d+(\.\d+)?)\*(\d+(\.\d+)?)/g, (match, num1, _, num2) => {
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
        
            let mulValue = num1 * num2;
            return mulValue.toFixed(decimal_accuracy);
        });
    }

    fun_times=fun_count(new_exp,['+','-'])
    for(let j=0;j<fun_times;j++)
    {
        new_exp=new_exp.replace(/(\d+(\.\d+)?)\+(\d+(\.\d+)?)/g, (match, num1, _, num2) => {
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
        
            let sumValue = num1 + num2;
            return sumValue.toFixed(decimal_accuracy);
        });
        new_exp=new_exp.replace(/(\d+(\.\d+)?)\-(\d+(\.\d+)?)/g, (match, num1, _, num2) => {
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);
        
            let diffValue = num1 - num2;
            return diffValue.toFixed(decimal_accuracy);
        });
    }

    return(new_exp);
}

//function controlling main display
function Display_d(value) 
{
    let display=document.getElementById('display');
    
    if(newTrue) {
        Clear();
        newTrue = false;
    }
    document.getElementById('display').value+= value;
}

//function for 'C'
function Clear() 
{
    document.getElementById('display').value = '';
    newTrue = false;
    total_brac_count=0;
}

//function for 'DELETE'
function Clear_char() 
{
    let display=document.getElementById('display')
    let expression=display.value;
    if(expression.endsWith('sin(')||expression.endsWith('cos(')||expression.endsWith('tan(')||expression.endsWith('(2)√'))
    {
        document.getElementById('display').value = expression.substring(0,expression.length-4);
    }
    else if(expression.endsWith('log'))
    {
        document.getElementById('display').value = expression.substring(0,expression.length-3);
    }
    else
    {
        document.getElementById('display').value = expression.substring(0,expression.length-1);
    }
    newTrue = false;
    total_brac_count=0;
}

//function which will run on pressing '='
function Solve() 
{
    Set_accuracy();
    try {
        let stack=[];
        let subpart="";
        let valpart="";
        let display=document.getElementById('display')
        let expression=display.value;

        //closing all opened brackets
        let i=0;
        while(i<expression.length)
        {
            if(expression[i]=='(')
            {
                brac_count++;
                stack.push(i);
            }
            else if(expression[i]==')')
            {
                brac_count--;
                if(brac_count<0)
                {
                    document.getElementById('display').value = "Extra Closing Parentheses Detected";
                    newTrue = true;
                    return;
                }
            }
            i++;
        }

        while(brac_count)
        {
            expression+=')';
            brac_count--;
        }

        //replacing e with Math.E
        expression = expression.replace(/e/g, Math.E.toFixed(decimal_accuracy));

        //evaluating expression
        i=stack[stack.length-1];
        while(stack.length>0)
        {
            if(expression[i]==')')
            {
                subpart=expression.substring(stack[stack.length-1],i+1);
                valpart=Evaluate(expression.substring(stack[stack.length-1],i+1));
                if(valpart==undefined)
                {
                    newTrue = true;
                    return;
                }
                expression=expression.replace(subpart,valpart);     
                stack.pop();
                if(stack.length!=0)
                {
                    i=stack[stack.length-1];
                }
            }
            i++;
        }
        do
        {
            expression="("+expression+")"
            expression=Evaluate(expression);
            if(expression==undefined)
                return;
        }while(Number(expression)==NaN)


        //printing expression
        document.getElementById('display').value = expression;

        console.log(expression);
        newTrue = true;
    } catch {
        document.getElementById('display').value = 'Error';
        newTrue = true;
    }
}

//function to handle enter key for '='
function Enter(event) 
{
    if (event.key === "Enter") 
    {
        Solve();
    }
}

//function to handle decimal accuracy button
function Set_accuracy() 
{
    let input=parseInt(document.getElementById('displayAccuracy').value);
    if(input>=0) 
    {
        decimal_accuracy=input;
    }
    else if(document.getElementById('displayAccuracy').value=="")
    {
        decimal_accuracy=2;
    }
    else
    {
        document.getElementById('displayAccuracy').value="!!!";
        decimal_accuracy=2;
    }
}