# editor-tcc
  
This is an online **C-editor** that uses a **server-side C-interpreter**.  
  
![editor-tcc](preview.gif "editor-tcc")

In this project some great API's and modules like *WebSockets* or [monaco-editor](https://microsoft.github.io/monaco-editor/) were used.  
Because it is small and suitable for our requirements, we opted for the [tcc](https://bellard.org/tcc/) compiler/interpreter from *Fabrice Bellard*.  

Feel free to use a different interpreter or programming language. You hardly have to change anything!

## install tcc

At first you need to download [tcc](https://bellard.org/tcc/).  
Use the latest version [0.9.27](http://download.savannah.gnu.org/releases/tinycc/tcc-0.9.27.tar.bz2) and run the following commands.

```
wget http://download.savannah.gnu.org/releases/tinycc/tcc-0.9.27.tar.bz2
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

Now you should test the C-interpreter.

```c
tcc -run -
#include <stdio.h>
void main() {
printf("Hello world!");
}
```

Press Ctrl-D ...

## start nodejs

Install all required dependencies and start nodejs.

```
npm install
npm start
```