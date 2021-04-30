# oncco

`On`line `C` `Co`mpiler  
  
This is an interactive [c-editor](https://microsoft.github.io/monaco-editor/) that uses **websockets** and compiles the corresponding c-code on the server side.  
We prefer the [Tiny C Compiler](https://bellard.org/tcc/) because it is easier to use.



## install tcc

At first you need to [download](http://download.savannah.gnu.org/releases/tinycc/) the [Tiny C Compiler](https://bellard.org/tcc/) by Fabrice Bellard.  
Use the [latest version 0.9.27](http://download.savannah.gnu.org/releases/tinycc/tcc-0.9.27.tar.bz2) and run the following commands.

```
wget http://download.savannah.gnu.org/releases/tinycc/tcc-0.9.27.tar.bz2
tar xjf tcc-0.9.27.tar.bz2

cd tcc-0.9.27.tar.bz2

./configure
make 
make install

tcc -v
```

## start nodejs

After installation of the [Tiny C Compiler](https://bellard.org/tcc/) install all other dependencies and start nodejs.

```
npm install
npm start
```