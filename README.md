# slang
S programming language 
# How to run
1. Run ```npm i``` in the project directory
2. Run ```npm i -g pkg```
3. Run ```pkg package.json``` in the project directory
4. Run the executable for your system


# Functions: 
```
    print(args) - prints args to the console 
        example: 
            print("hello")
            print(3+5)
            print("answer", " is ", 3 + 5)

    var(name, value) - creates variable, name - string
        example:
            var(ten, 10)
            var(treemulfive, 3 * 5)

    in(string) - writes input to "in" variable
        example:
            in("What is your name?")
            print(in) //returns input

    if(exp, commands) - if statement
        example:
            if("3 > 1", print("Three is bigger than one"))
```
