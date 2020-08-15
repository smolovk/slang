# slang
S programming language 

functions: 

    print(args) - prints args to the console 
        example: 
            print("hello")
            print(3+5)
            print("answer", " is ", 3 + 5)

    cpp(args) - executes c++ code, args - string
        example:
            cpp("cout << "Hello world << endl")
            cpp("int ten = 10")

    var(name value) - creates variable, name - string
        example:
            var(ten, 10)
            var(treemulfive, 3 * 5)

    in(string) - writes input to "in" variable
        example:
            in("What is your name?")
            print(in) //returns input

    if(exp commands) - if statement
        example:
            if("3 > 1" print("Three is bigger than one"))
