# OCI

`O`nline `C` `I`nterpreter  
  
This is an online **C-editor** that uses a **server side C-interpreter**.  
  
The project was equipped with some useful techniques and plugins such as websockets or the [Monaco-Editor](https://microsoft.github.io/monaco-editor/) from Microsoft.  
We use the [Tiny-C-Compiler](https://bellard.org/tcc/) from Fabrice Bellard because it is best suited for our purposes.  
  
Feel free to use a different interpreter or programming language. You hardly have to change anything!

![alt text](https://github.com/Th3R3alDuk3/oncco/blob/main/public/index.gif "OCI")

## install tcc

At first you need to [download](http://download.savannah.gnu.org/releases/tinycc/) the [Tiny-C-Compiler](https://bellard.org/tcc/) by Fabrice Bellard.  
Use the [latest version 0.9.27](http://download.savannah.gnu.org/releases/tinycc/tcc-0.9.27.tar.bz2) and run the following commands.

```
curl -fSL -O -J http://download.savannah.gnu.org/releases/tinycc/tcc-0.9.27.tar.bz2
tar -xjf tcc-0.9.27.tar.bz2

cd tcc-0.9.27
```

In the corresponding folder there is also a README for the further steps.

```
./configure

make 
make test
make install

tcc -v
```

Now you should test the included C-interpreter.

```
tcc -run -
#include <stdio.h>
void main() {
printf("Hello world!");
}
```

Press Ctrl-D ...

## start nodejs

After installation of the [Tiny-C-Compiler](https://bellard.org/tcc/) install all other dependencies and start nodejs.

```
npm install
npm start
```
