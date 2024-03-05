var exp="";
var sound=new Audio("sound.mp3");
var errorSound=new Audio("error sound.mp3");

movingAnimation();
function display()
{
    if(exp=="")
    {
        document.getElementById("res").innerHTML="0";
    }
    else if(exp==".")
    {
        document.getElementById("res").innerHTML="0.";
    }
    else
    {
        document.getElementById("res").innerHTML=exp;
    }
}
display();

function movingAnimation()
{
    var element = document.getElementById("keypad-box");
    element.classList.add("movingAnimationOnCalculator");
    setTimeout( function() {
        element.classList.remove("movingAnimationOnCalculator");;}, 1000); 
}
function clearAnimation()
{
    var element = document.getElementById("result-box");
    element.classList.add("clearingAnimationOnResult");
    setTimeout( function() {
        element.classList.remove("clearingAnimationOnResult");;}, 500); 
}
function errorAnimation()
{
    var element = document.getElementById("result-box");
    element.classList.add("errorAnimationOnResult");
    setTimeout( function() {
        element.classList.remove("errorAnimationOnResult");;}, 500); 
}
function resultAnimation()
{
    var element = document.getElementById("result-box");
    element.classList.add("resultAnimationOnResult");
    setTimeout( function() {
        element.classList.remove("resultAnimationOnResult");;}, 500); 
}

function keyPressed(event)
{
    if(["1","2","3","4","5","6","7","8","9","0","+","-","*","/","(",")","."].includes(event.key))
    {
        var Id;
        sound.play();
        if(event.key=="*")
        {
            Id="x";
        }
        else
        {
            Id=event.key;
        }
        document.getElementById(Id).style.boxShadow="0px 0px 0px black";
        exp+=event.key;
        display();
    }
    if(event.key=="Backspace")
    {
        pressedDel();
    }
    if(event.key=="Delete")
    {
        pressedClear();
    }
    if(event.key=="Enter")
    {
        pressedResult();
    }
}
function keyReleased(event)
{
    if(["1","2","3","4","5","6","7","8","9","0","+","-","*","/","(",")","."].includes(event.key))
    {
        var Id;
        if(event.key=="*")
        {
            Id="x";
        }
        else
        {
            Id=event.key;
        }
        document.getElementById(Id).style.boxShadow="3px 3px 5px black";
    }
    if(event.key=="Backspace")
    {
        releasedDel();
    }
    if(event.key=="Delete")
    {
        releasedClear();
    }
    if(event.key=="Enter")
    {
        releasedResult();
    }
}

function pressed(element) 
{
    sound.play();
    let Id = element.id;
    exp=exp+Id;
    document.getElementById(Id).style.boxShadow="0px 0px 0px black";
    display();
}
function released(element) 
{
    let Id = element.id;
    document.getElementById(Id).style.boxShadow="3px 3px 5px black";
}
function pressedDel()
{
    sound.play();
    exp=exp.slice(0,-1);
    document.getElementById("del").style.boxShadow="0px 0px 0px black";
    display();
}
function releasedDel()
{
    document.getElementById("del").style.boxShadow="3px 3px 5px black";
}
function pressedClear()
{
    clearAnimation();
    sound.play();
    exp="";
    document.getElementById("clear").style.boxShadow="0px 0px 0px black";
    display();
}
function releasedClear()
{
    document.getElementById("clear").style.boxShadow="3px 3px 5px black";
}


function convertToPostfix(infix) 
{
    var postfix="";
    var stack=[];
    for(var i=0; i<infix.length; i++) 
    {
        var ch = infix.charAt(i);
        if (ch=='+'||ch=='-'||ch=='*'||ch=='/') 
        {
            postfix+="#";
            while (stack.length!=0 && stack[stack.length-1]!='(' && getPrecedence(ch) <= getPrecedence(stack[stack.length-1])) 
            {
                postfix+=stack.pop();
            }
            stack.push(ch);
        }
        else if (ch=='(') 
        {
            stack.push(ch);
        }
        else if (ch==')') 
        {
            while (stack.length!=0 && stack[stack.length - 1]!='(') 
            {
                postfix+=stack.pop();
            }
            stack.pop();
        } 
        else 
        {
            postfix+=ch;
        }
    }
    while (stack.length!=0) 
    {
        postfix+=stack.pop();
    }
    return postfix;
}
function getPrecedence(ch) 
{
    if (ch=='+' || ch=='-') 
    {
        return 1;
    }
    else if (ch=='*' || ch=='/') 
    {
        return 2;
    } 
    else 
    {
        return 0;
    }
}
function evaluatePostfix(postfix)
{
    var result="";
    var stack=[];
    var num="";
    for(var i=0; i < postfix.length; i++) 
    {
        var c=postfix.charAt(i);
        if(['1','2','3','4','5','6','7','8','9','0'].includes(c))
        {
            num=num+c;
        }
        if(['#','+','-','/','*'].includes(c))
        {
            if(num!=="")
                stack.push(num);
            num="";
        }
        if(['+','-','/','*'].includes(c))
        {
            var a=Number(stack.pop());
            var b=Number(stack.pop());
            if(c=='+')
            {
                result=String(a+b);
            }
            if(c=='-')
            {
                result=String(b-a);
            }
            if(c=='*')
            {
                result=String(a*b);
            }
            if(c=='/')
            {
                result=String(b/a);
            }
            stack.push(result);
        }
    }
    return stack.pop();
}

function pressedResult()
{
    sound.play();
    document.getElementById("result").style.boxShadow="0px 0px 0px black";
    var infix="";
    for(var i=0; i<exp.length; i++)
    {
        var ch=exp.charAt(i);
        if(ch=="x")
        {
            infix+="*";
        }
        else
        {
            infix+=ch;
        }
    }
    var postfix=convertToPostfix(infix);
    var result=evaluatePostfix(postfix);
    if((result==undefined)||(result==Infinity)||(isNaN(result)))
    {
        errorSound.play();
        document.getElementById("res").innerHTML="ERROR";
        errorAnimation();
        exp="";
    }
    else
    { 
        resultAnimation();
        document.getElementById("res").innerHTML=result;
        exp=result;
    }
}
function releasedResult()
{
    document.getElementById("result").style.boxShadow="3px 3px 5px black";
}
